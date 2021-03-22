<?php
namespace common\models;

// use common\models\ApiRateLimiter;
use common\models\SysOAuthAuthorizationCode;
use common\models\SysOAuthAccessToken;
use common\models\UserProfile;
use common\commands\AddToTimelineCommand;
use common\models\query\UserQuery;
use common\models\NparksRewardPool;
use common\jobs\EmailQueueJob;
use Yii;
use yii\behaviors\AttributeBehavior;
use yii\behaviors\TimestampBehavior;
use common\behaviors\MyAuditTrailBehavior;
use yii\db\ActiveRecord;
use yii\helpers\ArrayHelper;
use yii\web\IdentityInterface;
// use yii\filters\RateLimitInterface;
use yii\web\UnauthorizedHttpException;
use yii\web\BadRequestHttpException;
use yii\helpers\Url;
use cheatsheet\Time;
use api\components\CustomHttpException;
use common\components\Utility;


class User extends ActiveRecord implements IdentityInterface
{
    const EMAIL_STATUS_NOT_VERIFIED = "not_verified";
    const EMAIL_STATUS_VERIFIED = "verified";   

    const ACCOUNT_STATUS_SUSPENDED = "suspended";
    const ACCOUNT_STATUS_NORMAL = "normal";
    const ACCOUNT_STATUS_EXCEED_MAX_LOGIN_ATTEMPT = "exceed_max_login_attempt";

    const ROLE_USER = 'user';
    const ROLE_MANAGER = 'manager'; // university partners staff
    const ROLE_ADMINISTRATOR = 'administrator'; // SIM staff
    const ROLE_SUPERADMIN = 'superadmin'; // developer
    const PERMISSION_LOGIN_TO_BACKEND = "loginToBackend";

    const EVENT_AFTER_SIGNUP = 'afterSignup';
    const EVENT_AFTER_LOGIN = 'afterLogin';

    const MAX_LOGIN_ATTEMPTS = 6;

    static $api_access_token;

    public function init() {
        if(!method_exists($this,'search')) {
            $this->login_at = -1;
        }
        parent::init();        
    }

    public static function tableName(){
        return '{{%user}}';
    }

    public static function find(){
        return new UserQuery(get_called_class());
    }

    public function behaviors(){
        return [
            "timestamp" => TimestampBehavior::className(),
            /*
            "auditTrail" =>
            [
                'class' => MyAuditTrailBehavior::className(),
            ]
            */
        ];
    }

    public function rules(){
        return [
            //[['username', 'email'], 'unique'],
            [['email'], 'unique'],
            ['email', 'email'],
            [['status', 'notes'], 'string'],
            [['notes'], 'string', 'max' => 2048],
            //[['username'], 'filter', 'filter' => '\yii\helpers\Html::encode']
        ];
    }

    public function attributeLabels(){
        return [
            'email' => Yii::t('common', 'E-mail'),
            'status' => Yii::t('common', 'Status'),
            'notes' => Yii::t('common', 'Notes'),
            'created_at' => Yii::t('common', 'Created at'),
            'updated_at' => Yii::t('common', 'Updated at'),
            'login_at' => Yii::t('common', 'Last Active'), //more like last active behaviour
        ];
    }

    public function getUserProfile(){
        return $this->hasOne(UserProfile::className(), ['user_id' => 'id']);
    }

    public function getUserActionHistory(){
        return $this->hasOne(UserActionHistory::className(), ['user_id' => 'id']);
    }

    public static function findIdentity($id){
        return static::find()
            ->active()
            ->andWhere(['id' => $id])
            ->one();
    }
    
    public static function findByLogin($login){
        return static::find()
            ->active()
            ->andWhere(['email' => $login])
            ->one();
    }

    public function getId(){
        return $this->getPrimaryKey();
    }

    public function validatePassword($password){
        return Yii::$app->getSecurity()->validatePassword($password, $this->password_hash);
    }

    public function setPassword($password){
        $this->password_hash = Yii::$app->getSecurity()->generatePasswordHash($password);
    }

    public function getPublicIdentity(){
        return $this->userProfile->fullName ?? $this->email;
    }

    public function getUserDetails(){
        $o = (object)[];
        $o->email = $this->email;
        $o->public_identity = $this->publicIdentity;

        return $o;
    }

    //TODO::commandbus shat
    public function addToTimeline(){
        Yii::$app->commandBus->handle(new AddToTimelineCommand([
            'category' => 'user',
            'event' => 'registration',
            'data' => [
                'public_identity' => $this->getPublicIdentity(),
                'user_id' => $this->getId(),
                'created_at' => $this->created_at
            ]
        ]));
    }

    //#####################
    //identity interface (for cookie)
    //#####################
    public function getAuthKey() {
        return $this->auth_key;
    }

    public function validateAuthKey($authKey) {
        return $this->getAuthKey() === $authKey;
    }
   
    public static function findIdentityByAccessToken($token, $type = null){
        $access_token = SysOAuthAccessToken::find()->andWhere(['token' => $token])->one();
        if ($access_token) {
            if ($access_token->expires_at < time()) {
                $access_token->delete();
                $str = Utility::jsonifyError("access token", "Your request was made with invalid access token.");
                throw new CustomHttpException($str, CustomHttpException::UNAUTHORIZED);
            }
            self::$api_access_token = $access_token;

            return static::find()->andWhere(['id' => $access_token->user_id])->one();
            //return static::find()->cache(7200)->andWhere(['id' => $access_token->user_id])->one();
        } else {
            return false;
        }
    }
    //TODO:: revokeApiAccessToken()
    public static function revokeAccessToken($user_id) {
        $model = SysOAuthAccessToken::find()->Where(['token' => self::$api_access_token])->andWhere(['user_id'=>$user_id])->one();
        
        if ($model != null && $model->delete()) {
            return true;
        } 
        return false;
    }
    
    public static function isUserLoggedIn($user_id){
        $model = SysOAuthAccessToken::find()->Where(['user_id'=>$user_id])->one();
        if ($model == null){
            // no access token means not logged in
            return false;
        } else {
            // have access token
            return true;
        }
    }

    //#####################
    //ratelimiter interface
    //#####################
    //RestControllerBase
    /*public function getRateLimit($request, $action) {
        //return [$this->rateLimit,1];
        //1 time per 2 secs
        return [1,2];
    }

    public function loadAllowance($request, $action){
        $endpoint = $action->controller->id ."/" . $action->id;
        //$endpoint = "all";
        $rate = ApiRateLimiter::findEntry($this->id, $endpoint);
        
        if ($rate) {        
            return [$rate->allowance, $rate->allowance_updated_at];
        } else {
            $rate = new ApiRateLimiter();
            $rate->user_id = $this->id;
            $rate->endpoint = $endpoint;
            $rate->allowance = 0;
            $rate->allowance_updated_at = time();
            $rate->save();
        }
    }

    public function saveAllowance($request, $action, $allowance, $timestamp){
        $endpoint = $action->controller->id ."/" . $action->id;
        //$endpoint = "all";
        $rate = ApiRateLimiter::findEntry($this->id, $endpoint);
        if ($rate) {        
            $rate->allowance = $allowance;
            $rate->allowance_updated_at = $timestamp;
            $rate->save(false);
        }        
    }*/
}