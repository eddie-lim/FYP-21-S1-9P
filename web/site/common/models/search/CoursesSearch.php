<?php

namespace common\models\search;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\Courses;

/**
 * CoursesSearch represents the model behind the search form about `common\models\Courses`.
 */
class CoursesSearch extends Courses
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'created_at', 'created_by', 'updated_at', 'updated_by'], 'integer'],
            [['name', 'mode_of_study', 'disciplines', 'sub_disciplines', 'academic_level', 'introduction', 'programme_structure', 'admission_criteria', 'fees', 'exemptions', 'profiles', 'assessments_exams', 'tags', 'notes', 'status', 'school_id'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Courses::find();

        if(!Yii::$app->user->can(Yii::$app->user->identity::ROLE_SUPERADMIN)){
            $query->where(['school_id'=>Yii::$app->user->identity->userProfile->school_id]);
        }

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        if (!($this->load($params) && $this->validate())) {
            return $dataProvider;
        }

        $query->andFilterWhere([
            'id' => $this->id,
            'school_id' => $this->school_id,
            'created_at' => $this->created_at,
            'created_by' => $this->created_by,
            'updated_at' => $this->updated_at,
            'updated_by' => $this->updated_by,
        ]);

        $query->andFilterWhere(['like', 'name', $this->name])
            ->andFilterWhere(['like', 'mode_of_study', $this->mode_of_study])
            ->andFilterWhere(['like', 'disciplines', $this->disciplines])
            ->andFilterWhere(['like', 'sub_disciplines', $this->sub_disciplines])
            ->andFilterWhere(['like', 'academic_level', $this->academic_level])
            ->andFilterWhere(['like', 'introduction', $this->introduction])
            ->andFilterWhere(['like', 'programme_structure', $this->programme_structure])
            ->andFilterWhere(['like', 'admission_criteria', $this->admission_criteria])
            ->andFilterWhere(['like', 'fees', $this->fees])
            ->andFilterWhere(['like', 'exemptions', $this->exemptions])
            ->andFilterWhere(['like', 'profiles', $this->profiles])
            ->andFilterWhere(['like', 'assessments_exams', $this->assessments_exams])
            ->andFilterWhere(['like', 'tags', $this->tags])
            ->andFilterWhere(['like', 'notes', $this->notes])
            ->andFilterWhere(['like', 'status', $this->status]);

        return $dataProvider;
    }
}
