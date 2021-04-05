<?php
namespace common\models\form;

use common\models\User;
use common\models\UserToken;
use yii\base\InvalidParamException;
use yii\base\Model;
use Yii;
use yii\web\JsExpression;

/**
 * Password reset form
 */
class PasswordResetForm extends Model
{
    public $password;
    public $password_confirm;
    public $token;

    /**
     * @var \common\models\UserToken
     */
    private $tokenModel;

    public function rules()
    {
        return [
            [['token', 'password', 'password_confirm'], 'required'],
            ['token', 'validateToken'],
            [['password'], 'string', 'min' => 8, 'max' => 128],
            ['password', 'match', 'pattern' => '/^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])\S*$/', 'message' => 'Password must contain 8 or more characters with at least 1 UPPER case character and 1 lower case character.'],
            ['password_confirm', 'compare', 'compareAttribute' => 'password', 'skipOnEmpty' => false],
        ];
    }

    public function validateToken() {
        if (empty($this->token) || !is_string($this->token)) {
            $this->addError('token', Yii::t('app', 'Password reset token cannot be blank.'));
            return false;
        }
        
        $this->tokenModel = UserToken::find()
            //->notExpired()
            ->byType(UserToken::TYPE_PASSWORD_RESET)
            ->byToken($this->token)
            ->one();
        
        if (!$this->tokenModel) {
            $this->addError('token', Yii::t('app', 'Invalid password reset token.'));
            return false;
        } else {
            if($this->isTokenExpired()){
                $this->addError('token', Yii::t('app', 'Reset token has expired.'));
                $this->tokenModel->delete();
                return false;
            }    
        }        
        return true;
    }

    private function isTokenExpired() {
        $expiredAt = $this->tokenModel->expire_at;
        $date = date_create();
        $timeDifference = (date_timestamp_get($date) - $expiredAt); 
        //print_r($timeDifference);
        //exit();

        if ($timeDifference > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function resetPassword() {
        $user = $this->tokenModel->user;
        $user->password = $this->password;
        if($user && $user->save()) {
            $user->updateAttributes(['password' => $this->password]);
            $this->tokenModel->delete();
        } else {
            $this->addError('password', Yii::t('app', 'User does not exist.'));
            return false;
        }

        return true;
    }

    public function getEmail() {
        return $this->tokenModel->user->email;
    }




    /**
     * @return array
     */
    public function attributeLabels()
    {
        return [
            'password'=>Yii::t('frontend', 'Password'),
            'password_confirm'=>Yii::t('frontend', 'Confirm Password')
        ];
    }
}
