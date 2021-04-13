<?php

namespace backend\models;

use common\models\User;
use common\models\UserProfile;
use Yii;
use yii\base\Exception;
use yii\base\Model;
use yii\helpers\ArrayHelper;

/**
 * Create user form
 */
class UserForm extends Model
{
    public $firstname;
    public $lastname;
    public $email;
    public $password;
    public $status;
    public $roles;
    public $school_id;

    private $model;

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            // ['username', 'filter', 'filter' => 'trim'],
            // ['username', 'required'],
            // ['username', 'unique', 'targetClass' => User::class, 'filter' => function ($query) {
            //     if (!$this->getModel()->isNewRecord) {
            //         $query->andWhere(['not', ['id' => $this->getModel()->id]]);
            //     }
            // }],
            // ['username', 'string', 'min' => 2, 'max' => 255],
            [['firstname', 'lastname'], 'required'],
            [['firstname', 'lastname'], 'string', 'min' => 3, 'max' => 30],

            ['email', 'filter', 'filter' => 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'unique', 'targetClass' => User::class, 'filter' => function ($query) {
                if (!$this->getModel()->isNewRecord) {
                    $query->andWhere(['not', ['id' => $this->getModel()->id]]);
                }
            }],

            ['password', 'required', 'on' => 'create'],
            ['password', 'string', 'min' => 6],

            [['school_id'], 'integer'],
            [['roles'], 'each',
                'rule' => ['in', 'range' => ArrayHelper::getColumn(
                    Yii::$app->authManager->getRoles(),
                    'name'
                )]
            ],
        ];
    }

    /**
     * @return User
     */
    public function getModel()
    {
        if (!$this->model) {
            $this->model = new User();
        }
        return $this->model;
    }

    /**
     * @param User $model
     * @return mixed
     */
    public function setModel($model)
    {
        $this->firstname = $model->userProfile->firstname;
        $this->lastname = $model->userProfile->lastname;
        $this->school_id = $model->userProfile->school_id;
        $this->email = $model->email;
        // $this->status = $model->status;
        $this->model = $model;
        $this->roles = ArrayHelper::getColumn(
            Yii::$app->authManager->getRolesByUser($model->getId()),
            'name'
        );
        return $this->model;
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'firstname'=>Yii::t('frontend', 'First Name'),
            'lastname'=>Yii::t('frontend', 'Last Name'),
            'school_id'=>Yii::t('frontend', 'Assign to University Partner'),
            'email' => Yii::t('common', 'Email'),
            'status' => Yii::t('common', 'Status'),
            'password' => Yii::t('common', 'Password'),
            'roles' => Yii::t('common', 'Roles')
        ];
    }

    /**
     * Signs user up.
     * @return User|null the saved model or null if saving fails
     * @throws Exception
     */
    public function save()
    {
        if ($this->validate()) {
            $success = true;
            $transaction = Yii::$app->db->beginTransaction();

            $model = $this->getModel();
            $isNewRecord = $model->getIsNewRecord();

            $model->email = $this->email;
            $model->setPassword($this->password);
            if($model->save()) {
                if ($isNewRecord) {
                    $userProfile = new UserProfile();
                    $userProfile->firstname = utf8_encode($this->firstname);
                    $userProfile->lastname = utf8_encode($this->lastname);
                    $userProfile->user_id = $model->id;
                    $userProfile->school_id = $this->school_id;

                    if (!$userProfile->save()) {
                        $success = false;
                    };
                    
                    $auth = Yii::$app->authManager;
                    $auth->assign($auth->getRole(User::ROLE_USER), $model->id);
                } else {
                    $model->userProfile->firstname = utf8_encode($this->firstname);
                    $model->userProfile->lastname = utf8_encode($this->lastname);
                    $model->userProfile->school_id = $this->school_id;

                    if (!$model->userProfile->save()) {
                        $success = false;
                    };
                    $auth = Yii::$app->authManager;
                    $auth->revokeAll($model->getId());

                    if ($this->roles && is_array($this->roles)) {
                        foreach ($this->roles as $role) {
                            $auth->assign($auth->getRole($role), $model->getId());
                        }
                    }
                }
            } else {
                $success = false;
            }

            if ($success) {
                $transaction->commit();
                // $user->addToTimeline();

                return !$model->hasErrors();
            } else {
                $transaction->rollback();
                return null;
            }
        }
        
        return null;
    }
}
