<?php
namespace common\models\form;

use cheatsheet\Time;
use common\models\User;
use common\models\UserToken;
use common\models\UserProfile;

use frontend\modules\user\Module;
use yii\base\Exception;
use yii\base\Model;
use Yii;
use yii\helpers\Url;
use yii\web\JsExpression;

/**
 * Signup form
 */
class RegistrationForm extends Model
{
    public $firstname;
    public $lastname;
    public $password;
    public $password_confirm;
    public $email;

    public function rules()
    {
        return [
            [['firstname', 'lastname', 'password', 'password_confirm', 'email'], 'required'],

            ['email', 'filter', 'filter' => 'trim'],
            ['email', 'email'],
            [['email'], 'string', 'min' => 6, 'max' => 100],
            ['email', 'unique',
                'targetClass'=> '\common\models\User',
                'message' => Yii::t('frontend', "This email address has already been registered. Use the 'Forgot Password' link to reset your password.")
            ],
 
            [['firstname', 'lastname'], 'string', 'min' => 3, 'max' => 30],
            [['password'], 'string', 'min' => 8, 'max' => 128],
            ['password', 'match', 'pattern' => '/^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])\S*$/', 'message' => 'Password must contain 8 or more characters with at least 1 UPPER case character and 1 lower case character.'],
            ['password_confirm', 'compare', 'compareAttribute' => 'password', 'skipOnEmpty' => false, 'message' => 'The passwords you entered do not match.'],
            
        ];
    }

    /**
     * @return array
     */
    public function attributeLabels()
    {
        return [
            'firstname'=>Yii::t('frontend', 'First Name'),
            'lastname'=>Yii::t('frontend', 'Last Name'),
            'email'=>Yii::t('frontend', 'E-mail'),
            'password'=>Yii::t('frontend', 'Password'),
            //'password_confirm'=>Yii::t('frontend', 'Confirm Password'),
        ];
    }

    /**
     * Signs user up.
     *
     * @return User|null the saved model or null if saving fails
     */
    public function register()
    {
        if ($this->validate()) {

            $success = true;
            $transaction = Yii::$app->db->beginTransaction();

            $user = new User();
            $user->email = $this->email;
            $user->setPassword($this->password);

            if($user->save()) {               
                $userProfile = new UserProfile();
                $userProfile->firstname = utf8_encode($this->firstname);
                $userProfile->lastname = utf8_encode($this->lastname);
                $userProfile->user_id = $user->id;

                if (!$userProfile->save()) {
                    $success = false;
                };
                
            } else {
                $success = false;
            }           

            if ($success) {
                $transaction->commit();
                $user->addToTimeline();

                return $user;
            } else {
                $transaction->rollback();
                return null;
            }
        }
        return null;
    }

    public function getUserProfile()
    {
        return $this->hasOne(UserProfile::className(), ['user_id' => 'user_id']);
    }

    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
    }
}
