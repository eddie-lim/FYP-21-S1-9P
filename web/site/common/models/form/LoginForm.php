<?php
namespace common\models\form;

use cheatsheet\Time;
use common\models\User;
use common\models\UserToken;
use common\models\fcm\SysFcmMessage;
use common\models\fcm\PushNotification;
use yii\base\InvalidParamException;
use Yii;
use yii\base\Model;
use yii\web\ForbiddenHttpException;
use common\components\MyCustomBadRequestException;
use api\components\CustomHttpException;
use common\components\MyCustomActiveRecord;
use common\components\Utility;

/**
 * Login form
 */
class LoginForm extends Model
{
    public $email;
    public $password;
    public $rememberMe = true;

    public $token = "100000";
    public $form_step = 0;

    private $user = null;

    public function rules()
    {
        return [
            [['email', 'password'], 'required'],
            ['email', 'email'],
            ['token', 'required', 'on' => 'cms_login'],
            [['token'], 'string', 'min' => 6, 'max' => 6],
            ['form_step', 'integer'],
            ['rememberMe', 'boolean'],
            ['password', 'validatePassword']
        ];
    }

    public function attributeLabels()
    {
        return [
            'email'=>Yii::t('frontend', 'Email'),
            'password'=>Yii::t('frontend', 'Password'),
            'rememberMe'=>Yii::t('frontend', 'Remember Me'),
            'token'=>Yii::t('frontend', 'Token'),
            'form_step'=>'Form Step',
        ];
    }

    public function validateAccount($isApi=false) {
        $user = $this->getUser();
        $msg = null;
        $key = null;
  
        if ($user->status == MyCustomActiveRecord::STATUS_DISABLED) {
            $msg = "Your account is disabled.";
            $this->addError('email', Yii::t('frontend', $msg));
            $key = CustomHttpException::ACCOUNT_DISABLED;
        }
        // if (SysSettings::getValue(SysSettings::SYSTEM_UNDER_MAINTENANCE) == MyCustomActiveRecord::STATUS_ENABLED){
        //     $msg = "System is currently under maintenance.";
        //     $this->addError('email', Yii::t('frontend', $msg));
        //     $key = CustomHttpException::SYSTEM_UNDER_MAINTENANCE;
        // }
        if ($msg != null) {
            $this->addError('email', Yii::t('frontend', $msg));
            if ($isApi) {
                $str = Utility::jsonifyError("email", $msg);
                throw new CustomHttpException($str, CustomHttpException::FORBIDDEN, $key);
            }
            return false;
        }

        return true;
    }

    public function validatePassword() {
        $user = $this->getUser();
                
        if ($user) {
            if ($user->validatePassword($this->password)) {
                return true;
            }
        }
        $this->addError('password', Yii::t('frontend', 'Incorrect email or password.'));
        return false;
    }

    public function login() {
        if ($this->validate() && $this->validatePassword() && $this->validateAccount()) {
            echo "success";
            if (Yii::$app->user->login($this->getUser(), $this->rememberMe ? Time::SECONDS_IN_A_MINUTE : 0)) {
                // if (!Yii::$app->user->can('loginToBackend')) {
                //     Yii::$app->user->logout();
                //     $str = Utility::jsonifyError("email", "");
                //     throw new CustomHttpException($str, CustomHttpException::FORBIDDEN);
                // }
                return true;
            }
        }
        return false;    
    }
    //for otp logic after users has already been validated
    public function loginWithEmail($email) {
        $this->email = $email;
        $user = $this->getUser();
        if (Yii::$app->user->login($user, $this->rememberMe ? Time::SECONDS_IN_A_MINUTE : 0)) {
            return true;
        }
        return false;    
    }
    public function loginApi() {
        if ($this->validate() && $this->validateAccount(true)) {
            Yii::$app->user->login($this->getUser());
            return true;
        }
        return false;
    }

    public function checkRole(){
        if ($this->validate()) {
            $user = $this->getUser();
            Yii::$app->user->setIdentity($user);
            /*
            $session = Yii::$app->session;
            $session->open(); 
            $_SESSION['user_id'] = $user;
            */
            if (Yii::$app->user->can(User::ROLE_ADMINISTRATOR) || Yii::$app->user->can(User::ROLE_MANAGER)) {
                return true;
            } else {
                $this->addError('email', Yii::t('frontend', 'Not authorised to access this page.'));
            }
            //return true;
        }
        return false;
    }

    public function getUser(){
        if ($this->user == null) {
            $this->user = User::find()
                ->active() //need to check if status is not disabled, for mobile login
                ->andWhere(['email'=>$this->email])
                ->one();
        }
        return $this->user;
    }

    public function sendOtp(){
        if (self::isRequested($this->user)){
            //check for any previous record
            $this->addError('token', Yii::t('frontend', 'Please try again in 1 minute for a new OTP.'));
            return;
        }
        
        $rand_num = random_int(100001,999999);
        $isSaved = UserToken::saveOtp($this->user->id, UserToken::TYPE_ONE_TIME_PASSWORD, $rand_num, Time::SECONDS_IN_A_MINUTE);
        if($isSaved){
            $notification = new PushNotification();
            $notification->customSetAttributes(PushNotification::TYPE_INBOX, ["title"=>"One-time PIN", "summary"=>$rand_num . "", "body"=>"Your OTP is: " . $rand_num . "\n\nIt is only valid for 1 minutes\n\nGenerated on: " . date("H:i:s d-m-Y ")]);
            $notification->setRecipient(PushNotification::RECIPIENT_TYPE_DEVICE , $this->user->id);
            if($notification->saveInbox()){
                $notification->send();
            } else {
                Yii::warning("Failed to send OTP to user_id: ". $this->user->id . ". On: " . date("H:i:s d-m-Y "));
            }
        }
        return;
    }

    private function isRequested($model){
        $m = UserToken::find()->orderBy(['created_at'=>SORT_DESC])->andWhere(['user_id'=>$model->id])->andWhere(['type'=>UserToken::TYPE_ONE_TIME_PASSWORD])->one();

        if($m != null){
            if(!self::isTokenExpired($m->created_at)){
                return true;
            } else {
                //delete previous record
                $m->delete();
            }
        }
        return false;
    }

    private function isTokenExpired($previousCreatedAt){   
        $date = date_create();
        $timeDifference = (date_timestamp_get($date) - $previousCreatedAt)/60; //in mins
        
        //echo $timeDifference;   
        if ($timeDifference < 1){
            return false;  
        }
        return true;
    }

    public function validateOtp($email) {
        $user_id = User::find()->andWhere(['email'=>$email])->one()->id;
        $m = UserToken::find()->orderBy(['created_at'=>SORT_DESC])->andWhere(['user_id'=>$user_id])->andWhere(['type'=>UserToken::TYPE_ONE_TIME_PASSWORD])->one();
        if($m == null || $m->token !== $this->token){
            $this->token = "";
            $this->addError('token', Yii::t('backend', 'Invalid token.'));
            return false;
        } else if(self::isTokenExpired($m->created_at)){
            //check within 1 min
            $this->token = "";
            $this->addError('token', Yii::t('frontend', 'Token expired.'));
            return false;
        }
        
        $m->delete();
        return true;
    }

}