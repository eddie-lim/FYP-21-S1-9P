<?php

namespace common\models;

use Yii;
use common\components\MyCustomActiveRecord;

/**
 * This is the model class for table "enquiries".
 *
 * @property int $id
 * @property int|null $user_id
 * @property int|null $school_id
 * @property string|null $enquiry
 * @property string|null $notes
 * @property string|null $status
 * @property int|null $created_at
 * @property int|null $created_by
 * @property int|null $updated_at
 * @property int|null $updated_by
 */
class Enquiries extends MyCustomActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'enquiries';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'school_id', 'created_at', 'created_by', 'updated_at', 'updated_by'], 'integer'],
            [['enquiry', 'notes', 'status'], 'string'],
            ['status', 'default', 'value'=>MyCustomActiveRecord::STATUS_ENABLED],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User',
            'school_id' => 'University',
            'enquiry' => 'Enquiry',
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
            'university' => function ($model) {
                return $model->school ? $model->school->name : "";
            },
            'enquiry',
        ];
    }
}
