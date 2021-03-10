<?php
namespace common\models\form;

use cheatsheet\Time;
use common\models\UserToken;
use Yii;
use common\models\User;
use yii\base\Model;
use common\jobs\EmailQueueJob;

/**
 * Password reset request form
 */
class PasswordResetRequestForm extends Model
{
    /**
     * @var user email
     */
    public $email;

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['email', 'filter', 'filter' => 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'validateRole'],
            /*
            //LOYNOTE:: dun check for if exist
            ['email', 'exist',
                'targetClass' => '\common\models\User',
                'filter' => ['status' => ['or', User::STATUS_VERIFIED, User::STATUS_NOT_VERIFIED]],
                'message' => 'There is no user with such email.'
            ],
            */
        ];
    }

    public function validateRole(){
        $user = User::findOne([
            'email' => $this->email,
        ]);

        if($user && ($user->isSuspended())){
            $this->addError('email', Yii::t('frontend', 'This account has been suspended. For more info, please contact: ' . env('CONTACT_EMAIL')));
            return false;
        }
        return true;
    }

    /**
     * Sends an email with a link, for resetting the password.
     *
     * @return boolean whether the email was send
     */
    public function sendEmail()
    {
        $user = User::findOne([
            'email' => $this->email,
        ]);

        if ($user) {

            UserToken::deleteAll(['user_id'=>$user->id, 'type'=>UserToken::TYPE_PASSWORD_RESET]);

            $token = UserToken::create($user->id, UserToken::TYPE_PASSWORD_RESET, 20*60); //20mins
	    //TODO:: WHERE is email queue job got this?

            Yii::$app->queue->delay(0)->push(new EmailQueueJob([
                'to' => $this->email,
                'subject' => Yii::t('frontend', '{app-name} | Password Reset', ['app-name'=>Yii::$app->name]),
                'view' => 'passwordResetToken',
                'params' => [
                    'user' => $user,
                    'token' => $token->token
                ]
            ]));
            return true;

        } else {
            $this->addError('email', Yii::t('frontend', 'User does not exist.'));
            return false;
        }

        
    }

    /**
     * @return array
     */
    public function attributeLabels()
    {
        return [
            'email'=>Yii::t('frontend', 'E-mail')
        ];
    }
}
