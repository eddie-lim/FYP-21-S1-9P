<?php

namespace common\models;

use Yii;
use yii\helpers\Url;

/**
 * This is the model class for table "university_partners".
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $description
 * @property string|null $continent
 * @property string|null $highlights
 * @property string|null $certifications
 * @property string|null $tags
 * @property string|null $notes
 * @property string|null $status
 * @property int|null $created_at
 * @property int|null $created_by
 * @property int|null $updated_at
 * @property int|null $updated_by
 */
class UniversityPartners extends \common\components\MyCustomActiveRecord
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
            [['description', 'highlights', 'certifications', 'tags', 'notes', 'status'], 'string'],
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
            'tags' => 'Tags',
            'notes' => 'Notes',
            'status' => 'Status',
            'created_at' => 'Created At',
            'created_by' => 'Created By',
            'updated_at' => 'Updated At',
            'updated_by' => 'Updated By',
        ];
    }

    public static function getUniversityBlock($id){
        $model = static::findOne($id);
        $url = Url::to(['university-partners/view', 'id'=>$id]);

        $html = "";
        $html .= '<a href="'.$url.'">';
        $html .= '<div>';
        $html .= $model->name;
        $html .= '<div>';
        $html .= '</a>';

        return $html;
    }

    public function toObject() {
        $m = $this;
        $o = (object) [];
        $o->name = $m->name;
        $o->description = $m->description;
        $o->continent = $m->continent;
        $o->highlights = $m->highlights;
        $o->certifications = $m->certifications;
        return $o;
    }
}
