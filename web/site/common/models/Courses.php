<?php

namespace common\models;

use Yii;

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
class Courses extends \yii\db\ActiveRecord
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
            [['mode_of_study', 'introduction', 'programme_structure', 'admission_criteria', 'fees', 'exemptions', 'profiles', 'assessments_exams', 'notes', 'status'], 'string'],
            [['name'], 'string', 'max' => 512],
            [['disciplines', 'sub_disciplines', 'academic_level'], 'string', 'max' => 128],
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
            'mode_of_study' => 'Mode Of Study',
            'disciplines' => 'Disciplines',
            'sub_disciplines' => 'Sub Disciplines',
            'academic_level' => 'Academic Level',
            'introduction' => 'Introduction',
            'programme_structure' => 'Programme Structure',
            'admission_criteria' => 'Admission Criteria',
            'fees' => 'Fees',
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
}
