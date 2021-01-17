<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "sys_login_history".
 *
 * @property int $id
 * @property int $user_id
 * @property string $application
 * @property int $login_at
 */
class SystemLoginHistory extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'system_login_history';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'application'], 'required'],
            [['user_id', 'login_at'], 'integer'],
            [['application'], 'string', 'max' => 45],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('backend', 'ID'),
            'user_id' => Yii::t('backend', 'User ID'),
            'application' => Yii::t('backend', 'application'),
            'login_at' => Yii::t('backend', 'Login At'),
        ];
    }

    public static function makeModel(){
        $m = new SELF;
        $m->user_id = Yii::$app->user->id;
        $m->application = Yii::$app->id;
        $m->login_at = time();
        return $m;
    }
}
