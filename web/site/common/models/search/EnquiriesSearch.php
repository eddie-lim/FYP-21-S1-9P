<?php

namespace common\models\search;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\Enquiries;

/**
 * EnquiriesSearch represents the model behind the search form about `common\models\Enquiries`.
 */
class EnquiriesSearch extends Enquiries
{
    public $user_name;
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'user_id', 'school_id', 'created_at', 'created_by', 'updated_at', 'updated_by'], 'integer'],
            [['user_name'], 'default', 'value' => null],
            [['enquiry', 'notes', 'status', 'user_name'], 'safe'],
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
        $query = Enquiries::find()
        ->join('LEFT JOIN','user_profile','user_profile.user_id = enquiries.user_id');

        if(!Yii::$app->user->can(Yii::$app->user->identity::ROLE_SUPERADMIN)){
            $query->where(['or', ['enquiries.school_id'=>Yii::$app->user->identity->userProfile->school_id], ['is','enquiries.school_id', null], ['enquiries.school_id'=> '']]);
        }
        
        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        if (!($this->load($params) && $this->validate())) {
            return $dataProvider;
        }

        $query->andFilterWhere([
            'id' => $this->id,
            'enquiries.user_id' => $this->user_id,
            'enquiries.school_id' => $this->school_id,
            'created_at' => $this->created_at,
            'created_by' => $this->created_by,
            'updated_at' => $this->updated_at,
            'updated_by' => $this->updated_by,
        ]);

        $query->andFilterWhere(['like', 'enquiry', $this->enquiry])
            ->andFilterWhere(['like', 'notes', $this->notes])
            ->andFilterWhere(['like', 'status', $this->status])
            ->andFilterWhere(['or', ['like', 'user_profile.firstname', $this->user_name], ['like', 'user_profile.lastname', $this->user_name]]);

        return $dataProvider;
    }
}
