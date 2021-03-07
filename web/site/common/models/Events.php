<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "events".
 *
 * @property int $id
 * @property int|null $school_id
 * @property string|null $name
 * @property string|null $description
 * @property string|null $venue
 * @property int|null $date_start_at
 * @property int|null $date_end_at
 * @property int|null $time_start_at
 * @property int|null $time_end_at
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
            [['school_id', 'date_start_at', 'date_end_at', 'time_start_at', 'time_end_at', 'created_at', 'created_by', 'updated_at', 'updated_by'], 'integer'],
            [['description', 'notes', 'status'], 'string'],
            [['name'], 'string', 'max' => 256],
            [['venue'], 'string', 'max' => 128],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'school_id' => 'School ID',
            'name' => 'Name',
            'description' => 'Description',
            'venue' => 'Venue',
            'date_start_at' => 'Date Start At',
            'date_end_at' => 'Date End At',
            'time_start_at' => 'Time Start At',
            'time_end_at' => 'Time End At',
            'notes' => 'Notes',
            'status' => 'Status',
            'created_at' => 'Created At',
            'created_by' => 'Created By',
            'updated_at' => 'Updated At',
            'updated_by' => 'Updated By',
        ];
    }
}
