<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "events".
 *
 * @property int $id
 * @property int|null $school_id
 * @property string|null $session
 * @property string|null $name
 * @property string|null $description
 * @property string|null $venue
 * @property int|null $start_at
 * @property int|null $end_at
 * @property string|null $tags
 * @property string|null $notes
 * @property string|null $status
 * @property int|null $created_at
 * @property int|null $created_by
 * @property int|null $updated_at
 * @property int|null $updated_by
 */
class Events extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'events';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['school_id', 'start_at', 'end_at', 'created_at', 'created_by', 'updated_at', 'updated_by'], 'integer'],
            [['description', 'notes', 'status'], 'string'],
            [['session', 'venue'], 'string', 'max' => 128],
            [['name'], 'string', 'max' => 256],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'school_id' => 'University',
            'session' => 'Session',
            'name' => 'Name',
            'description' => 'Description',
            'venue' => 'Venue',
            'start_at' => 'Start At',
            'end_at' => 'End At',
            'tags' => 'Tags',
            'notes' => 'Notes',
            'status' => 'Status',
            'created_at' => 'Created At',
            'created_by' => 'Created By',
            'updated_at' => 'Updated At',
            'updated_by' => 'Updated By',
        ];
    }
}
