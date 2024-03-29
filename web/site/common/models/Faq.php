<?php

namespace common\models;

use Yii;
use common\models\UniversityPartners;
use common\components\MyCustomActiveRecord;

/**
 * This is the model class for table "faq".
 *
 * @property int $id
 * @property int|null $school_id
 * @property string|null $question
 * @property string|null $answer
 * @property string|null $tags
 * @property string|null $notes
 * @property string|null $status
 * @property int|null $created_at
 * @property int|null $created_by
 * @property int|null $updated_at
 * @property int|null $updated_by
 */
class Faq extends MyCustomActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'faq';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['school_id', 'created_at', 'created_by', 'updated_at', 'updated_by'], 'integer'],
            [['question', 'answer', 'notes', 'status'], 'string'],
            [['question', 'answer'], 'required'],
            ['status', 'default', 'value'=>MyCustomActiveRecord::STATUS_ENABLED],
            ['school_id', 'default', 'value'=>Yii::$app->user->identity->userProfile->school_id],
            ['tags', 'safe'],
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
            'question' => 'Question',
            'answer' => 'Answer',
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
            'university' => function ($model) {
                return $model->school ? $model->school->name : "";
            },
            'question',
            'answer',
            'tags',
        ];
    }
}
