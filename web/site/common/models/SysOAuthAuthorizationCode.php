<?php

namespace common\models;

use Yii;
use common\components\Utility;

/**
 * This is the model class for table "authorization_codes".
 *
 * @property int $id
 * @property string $code
 * @property int $expires_at
 * @property int $user_id
 * @property string $app_id
 * @property int $created_at
 * @property int $updated_at
 */
class SysOAuthAuthorizationCode extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'sys_oauth_authorization_code';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['code', 'expires_at', 'user_id', 'created_at', 'updated_at'], 'required'],
            [['expires_at', 'user_id', 'created_at', 'updated_at'], 'integer'],
            [['code'], 'string', 'max' => 150],
            [['app_id'], 'string', 'max' => 200],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'code' => 'Code',
            'expires_at' => 'Expires At',
            'user_id' => 'User ID',
            'app_id' => 'App ID',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    public function generateNewCode($user_id) {
        //$this->code = md5(uniqid());
        $this->code = Utility::randomToken();
        $this->expires_at = time() + (60 * 5);
        $this->user_id = $user_id;
        $this->app_id = null;
        $this->created_at = time();
        $this->updated_at = time();
    }



    public static function isValid($code)
    {
        $model=static::findOne(['code' => $code]);

        if(!$model||$model->expires_at<time())
        {
            //Yii::$app->api->sendFailedResponse("Authcode Expired");
            return(false);
        }
        else
            return($model);
    }
}
