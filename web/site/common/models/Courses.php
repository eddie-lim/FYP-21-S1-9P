<?php

namespace common\models;

use Yii;
use common\models\UniversityPartners;

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
class Courses extends \common\components\MyCustomActiveRecord
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

    public function toObject() {
        $m = $this;
        $o = (object) [];
        $o->name = $m->name;
        $o->university = $m->school->name;
        $o->mode_of_study = $m->mode_of_study;
        $o->disciplines = $m->disciplines;
        $o->sub_disciplines = $m->sub_disciplines;
        $o->academic_level = $m->academic_level;
        $o->introduction = $m->introduction;
        $o->programme_structure = $m->programme_structure;
        $o->admission_criteria = $m->admission_criteria;
        $o->fees = $m->fees;
        $o->exemptions = $m->exemptions;
        $o->profiles = $m->profiles;
        $o->assessments_exams = $m->assessments_exams;
        return $o;
    }
}
