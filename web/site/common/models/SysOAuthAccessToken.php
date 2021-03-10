<?php

namespace common\models;

use Yii;
use common\components\Utility;

/**
 * This is the model class for table "access_tokens".
 *
 * @property int $id
 * @property string $token
 * @property int $expires_at
 * @property string $auth_code
 * @property int $user_id
 * @property string $app_id
 * @property int $created_at
 * @property int $updated_at
 */
class SysOAuthAccessToken extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'sys_oauth_access_token';
    }

    public function init() {

    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['token', 'expires_at', 'auth_code', 'user_id', 'created_at', 'updated_at'], 'required'],
            [['expires_at', 'user_id', 'created_at', 'updated_at'], 'integer'],
            [['token'], 'string', 'max' => 300],
            [['auth_code', 'app_id'], 'string', 'max' => 200],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'token' => 'Token',
            'expires_at' => 'Expires At',
            'auth_code' => 'Auth Code',
            'user_id' => 'User ID',
            'app_id' => 'App ID',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    public function generateNewToken($user_id, $auth_code) {
        //$this->token = md5(uniqid());
        $this->token = Utility::randomToken();         
        $this->auth_code = $auth_code;
        $this->expires_at = time() + (60 * 60 * 24 * 60); // 60 days
        // $model->expires_at=time()+(60 * 2);// 2 minutes
        $this->user_id = $user_id;
        $this->created_at = time();
        $this->updated_at = time();
    }
}
