<?php

namespace common\models\search;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\EventsRegistration;

/**
 * EventsRegistrationSearch represents the model behind the search form about `common\models\EventsRegistration`.
 */
class EventsRegistrationSearch extends EventsRegistration
{
    /**
     * @inheritdoc
     */
    private $event_id_filter;
    public function rules()
    {
        return [
            [['id', 'event_id', 'created_at', 'created_by', 'updated_at', 'updated_by'], 'integer'],
            [['notes', 'status'], 'safe'],
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

    public function setEventId($id) {
        $this->event_id_filter = $id;
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
        $query = EventsRegistration::find();

        if($this->event_id_filter) {
            $query->andWhere(['event_id' => $this->event_id_filter]);
        }

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        if (!($this->load($params) && $this->validate())) {
            return $dataProvider;
        }

        $query->andFilterWhere([
            'id' => $this->id,
            'event_id' => $this->event_id,
            'created_at' => $this->created_at,
            'created_by' => $this->created_by,
            'updated_at' => $this->updated_at,
            'updated_by' => $this->updated_by,
        ]);

        $query->andFilterWhere(['like', 'notes', $this->notes])
            ->andFilterWhere(['like', 'status', $this->status]);

        return $dataProvider;
    }
}
