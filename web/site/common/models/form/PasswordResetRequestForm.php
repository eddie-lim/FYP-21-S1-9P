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
        ];
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
