<?php

namespace common\models;

use Yii;
use common\models\UniversityPartners;
use common\components\MyCustomActiveRecord;

/**
 * This is the model class for table "courses".
 *
 * @property int $id
 * @property int|null $school_id
 * @property string|null $name
 * @property string|null $mode_of_study
 * @property string|null $disciplines
 * @property string|null $sub_disciplines
 * @property string|null $academic_level
 * @property string|null $introduction
 * @property string|null $programme_structure
 * @property string|null $admission_criteria
 * @property string|null $fees
 * @property string|null $exemptions
 * @property string|null $profiles
 * @property string|null $assessments_exams
 * @property string|null $tags
 * @property string|null $notes
 * @property string|null $status
 * @property int|null $created_at
 * @property int|null $created_by
 * @property int|null $updated_at
 * @property int|null $updated_by
 */
class Courses extends MyCustomActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'courses';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['school_id', 'created_at', 'created_by', 'updated_at', 'updated_by'], 'integer'],
            [['mode_of_study', 'introduction', 'programme_structure', 'admission_criteria', 'fees', 'exemptions', 'profiles', 'assessments_exams', 'notes', 'status', 'entry_qualification'], 'string'],
            [['mode_of_study', 'introduction', 'programme_structure', 'admission_criteria', 'fees', 'exemptions', 'profiles', 'assessments_exams', 'entry_qualification', 'disciplines', 'sub_disciplines', 'academic_level'], 'required'],
            [['name'], 'string', 'max' => 512],
            [['disciplines', 'sub_disciplines', 'academic_level'], 'string', 'max' => 128],
            ['status', 'default', 'value'=>MyCustomActiveRecord::STATUS_ENABLED],
            ['tags', 'safe'],

            ['name', 'filter', 'filter' => 'trim'],
            ['name', 'unique', 'targetClass' => SELF::class, 'filter' => function ($query) {
                $query->andWhere(['school_id' => $this->school_id]);
            }],
            
            ['school_id', 'default', 'value'=>Yii::$app->user->identity->userProfile->school_id],
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
            'name' => 'Name',
            'mode_of_study' => 'Mode Of Study',
            'disciplines' => 'Disciplines',
            'sub_disciplines' => 'Sub Disciplines',
            'academic_level' => 'Academic Level',
            'introduction' => 'Introduction',
            'programme_structure' => 'Programme Structure',
            'admission_criteria' => 'Admission Criteria',
            'fees' => 'Fees',
            'entry_qualification' => 'Entry Qualification',
            'exemptions' => 'Exemptions',
            'profiles' => 'Profiles',
            'assessments_exams' => 'Assessments Exams',
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

    public static function getAllModeOfStudy(){
        return [ 
            'part_time' => 'Part time', 
            'full_time' => 'Full time', 
            'part_time_and_full_time' => 'Part time and full time', 
        ];
    }

    public function fields() {
        return [
            'id',
            'name',
            'university' => function ($model) {
                return $model->school->name;
            },
            'mode_of_study',
            'disciplines',
            'sub_disciplines',
            'academic_level',
            'introduction',
            'programme_structure',
            'admission_criteria',
            'entry_qualification',
            'fees',
            'exemptions',
            'profiles',
            'assessments_exams',
        ];
    }
}
