<?php
namespace common\models\form;

use common\models\User;
use yii\base\InvalidParamException;
use yii\base\Model;
use Yii;
use yii\web\JsExpression;
use common\components\MyCustomBadRequestException;

/**
 * Password change form
 */
class PasswordChangeForm extends Model
{
    /**
     * @var
     */
    public $password;
    public $password_confirm;
    public $current_password;
    public $hash;

    private $currentPasswordModel;

    public function rules()
    {
        return [
            [['current_password','password', 'password_confirm'], 'required'],            
            ['current_password', 'validateCurrentPassword'],
            [['password'], 'string', 'min' => 8, 'max' => 128],
            ['password', 'match', 'pattern' => '/^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])\S*$/', 'message' => 'Password must contain 8 or more characters with at least 1 UPPER case character and 1 lower case character.'],
            ['password_confirm', 'compare', 'compareAttribute' => 'password', 'skipOnEmpty' => false],
            /*
            [
                'password_confirm',
                'required',
                'when' => function($model) {
                    return !empty($model->password);
                },
                'whenClient' => new JsExpression("function (attribute, value) {
                    return $('#caccountform-password').val().length > 0;
                }")
            ],
            */       
        ];
    }
    
    public function validateCurrentPassword() {
        if (empty($this->current_password) || !is_string($this->current_password)) {
            $this->addError('current_password', Yii::t('app', 'Password reset token cannot be blank.'));
            return false;
        }        

        $user_id = Yii::$app->user->id;

        $this->currentPasswordModel = User::find('password_hash')
            ->andWhere(['id'=>$user_id])
            ->one();

        $this->hash = $this->currentPasswordModel->password_hash;

        if (password_verify($this->current_password, $this->hash)) {
            return true;
        } else {
            $this->addError('current_password', Yii::t('app', 'Invalid current password.'));
            return false;
        }        
    }
    
    public function changePassword()
    {
        $user = Yii::$app->user->identity;
        $user->password = $this->password;
        if($user && $user->save()) {
            $user->updateAttributes(['password' => $this->password]);         
        } else {
            $this->addError('current_password', Yii::t('app', 'Invalid password.'));
            return false;
        }               

        return true;
    }

    /**
     * @return array
     */
    public function attributeLabels()
    {
        return [
            'password'=>Yii::t('frontend', 'Password')
        ];
    }
}