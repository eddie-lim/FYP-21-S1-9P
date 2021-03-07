<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "newsletter_subscriptions".
 *
 * @property int $id
 * @property int|null $created_at
 * @property int|null $created_by
 */
class NewsletterSubscriptions extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'newsletter_subscriptions';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['created_at', 'created_by'], 'integer'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'created_at' => 'Created At',
            'created_by' => 'Created By',
        ];
    }
}
