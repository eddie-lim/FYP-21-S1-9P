<?php

namespace common\models\search;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\Events;

/**
 * EventsSearch represents the model behind the search form about `common\models\Events`.
 */
class EventsSearch extends Events
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'start_at', 'end_at', 'created_at', 'created_by', 'updated_at', 'updated_by'], 'integer'],
            [['session', 'name', 'description', 'venue', 'tags', 'notes', 'status', 'school_id', 'type'], 'safe'],
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
        $query = Events::find();

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
            'start_at' => $this->start_at,
            'end_at' => $this->end_at,
            'created_at' => $this->created_at,
            'created_by' => $this->created_by,
            'updated_at' => $this->updated_at,
            'updated_by' => $this->updated_by,
        ]);

        $query->andFilterWhere(['like', 'session', $this->session])
            ->andFilterWhere(['like', 'name', $this->name])
            ->andFilterWhere(['like', 'description', $this->description])
            ->andFilterWhere(['like', 'venue', $this->venue])
            ->andFilterWhere(['like', 'type', $this->type])
            ->andFilterWhere(['like', 'tags', $this->tags])
            ->andFilterWhere(['like', 'notes', $this->notes])
            ->andFilterWhere(['like', 'status', $this->status]);

        return $dataProvider;
    }
}
