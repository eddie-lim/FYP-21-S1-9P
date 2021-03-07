<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "university_partners".
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $description
 * @property string|null $continent
 * @property string|null $highlights
 * @property string|null $certifications
 * @property string|null $status
 * @property string|null $notes
 * @property int|null $created_at
 * @property int|null $created_by
 * @property int|null $updated_at
 * @property int|null $updated_by
 */
class UniversityPartners extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'university_partners';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['description', 'highlights', 'certifications', 'status', 'notes'], 'string'],
            [['created_at', 'created_by', 'updated_at', 'updated_by'], 'integer'],
            [['name'], 'string', 'max' => 128],
            [['continent'], 'string', 'max' => 32],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'description' => 'Description',
            'continent' => 'Continent',
            'highlights' => 'Highlights',
            'certifications' => 'Certifications',
            'status' => 'Status',
            'notes' => 'Notes',
            'created_at' => 'Created At',
            'created_by' => 'Created By',
            'updated_at' => 'Updated At',
            'updated_by' => 'Updated By',
        ];
    }
}
