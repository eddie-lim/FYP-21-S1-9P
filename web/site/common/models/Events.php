<?php

namespace common\models;

use Yii;
use common\models\UniversityPartners;
use common\components\MyCustomActiveRecord;

/**
 * This is the model class for table "events".
 *
 * @property int $id
 * @property int|null $school_id
 * @property string|null $type
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
class Events extends MyCustomActiveRecord
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
            [['school_id', 'created_at', 'created_by', 'updated_at', 'updated_by'], 'integer'],
            [['description', 'session', 'venue', 'type'], 'required'],
            [['description', 'notes', 'status', 'type'], 'string'],
            [['session', 'venue'], 'string', 'max' => 128],
            [['name'], 'string', 'max' => 256],
            ['status', 'default', 'value'=>MyCustomActiveRecord::STATUS_ENABLED],
            ['school_id', 'default', 'value'=>Yii::$app->user->identity->userProfile->school_id],
            [['tags', 'start_at', 'end_at'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'type' => 'Type',
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

    public function getSchool()
    {
        return $this->hasOne(UniversityPartners::class, ['id' => 'school_id']);
    }
    
    public function fields() {
        return [
            'id',
            'name',
            'university' => function ($model) {
                return $model->school->name;
            },
            'session',
            'type',
            'description',
            'venue',
            'start_at',
            'end_at',
        ];
    }
}
