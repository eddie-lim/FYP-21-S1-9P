<?php

namespace common\models;

use Yii;
use common\models\User;

/**
 * This is the model class for table "sys_audit_trail".
 *
 * @property int $id
 * @property int $row_id
 * @property string $model
 * @property string $controller
 * @property string $action
 * @property string $value
 * @property int $created_by
 * @property int $created_at
 */
class SystemAuditTrail extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'system_audit_trail';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['row_id', 'model', 'controller', 'action', 'created_at'], 'required'],
            [['row_id', 'created_by', 'created_at'], 'integer'],
            [['value'], 'string'],
            [['model', 'controller', 'action'], 'string', 'max' => 256],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'row_id' => 'Row ID',
            'model' => 'Model',
            'controller' => 'Controller',
            'action' => 'Action',
            'value' => 'Value',
            'created_by' => 'Created By',
            'created_at' => 'Created At',
        ];
    }

    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'created_by']);
    }

    public static function leaveTrail($row_id, $model) {
        //loynote::passing in $row_id since form models does not have id
        $m = new SystemAuditTrail();
        $m->row_id = $row_id;
        $m->model = $model->className();
        $m->controller = Yii::$app->controller->id;
        $m->action = Yii::$app->controller->action->id;
        $m->value = json_encode($model->attributes);
        $m->created_at = time();

        $user = Yii::$app->get('user', false);
        $m->created_by = $user && !$user->isGuest ? $user->id : null;

        return $m->save(false);
    }

}
