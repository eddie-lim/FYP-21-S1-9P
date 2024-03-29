<?php

namespace backend\models\search;

use Yii;
use common\models\User;
use yii\base\Model;
use yii\data\ActiveDataProvider;

/**
 * UserSearch represents the model behind the search form about `common\models\User`.
 */
class UserSearch extends User
{
    private $newsletterSubscriptionsMode = false;
    private $viewSimStaffMode = false;
    private $viewUniPartnerStaffMode = false;
    private $viewStudentMode = false;
    public $item_name;
    public $name;
    public $uni_name;
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'status'], 'integer'],
            [['created_at', 'updated_at', 'login_at', 'item_name', 'name', 'uni_name'], 'default', 'value' => null],
            [['username', 'auth_key', 'password_hash', 'email', 'item_name', 'name', 'uni_name'], 'safe'],
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

    public function setNewsletterSubscriptionsMode(){
        $this->newsletterSubscriptionsMode = true;
    }
    public function setViewSimStaffMode(){
        $this->viewSimStaffMode = true;
    }
    public function setViewUniPartnerStaffMode(){
        $this->viewUniPartnerStaffMode = true;
    }
    public function setViewStudentMode(){
        $this->viewStudentMode = true;
    }

    /**
     * Creates data provider instance with search query applied
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = User::find()
        ->join('LEFT JOIN','rbac_auth_assignment','rbac_auth_assignment.user_id = id')
        ->join('LEFT JOIN','user_profile','user_profile.user_id = id')
        ->join('LEFT JOIN','university_partners','university_partners.id = user_profile.school_id');

        if(!Yii::$app->user->can(User::ROLE_SUPERADMIN)){
            $query->andFilterWhere(['or', ['not', ['rbac_auth_assignment.item_name'=> User::ROLE_SUPERADMIN]]])->orderBy(['rbac_auth_assignment.created_at' => SORT_DESC]);
        }

        if($this->viewSimStaffMode){
            $query->andFilterWhere(['rbac_auth_assignment.item_name'=> User::ROLE_ADMINISTRATOR]);
        }
        
        if($this->viewUniPartnerStaffMode){
            $query->andFilterWhere(['rbac_auth_assignment.item_name'=> User::ROLE_MANAGER]);
        }
        
        if($this->viewStudentMode){
            $query->andFilterWhere(['rbac_auth_assignment.item_name'=> User::ROLE_USER]);
        }

        if($this->newsletterSubscriptionsMode){
            $query->andWhere(['user_profile.subscribe_newsletter' => 1]);
        }

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => [
                'defaultOrder' => [
                    'id' => SORT_ASC,
                ]
            ],
        ]);

        if (!($this->load($params) && $this->validate())) {
            return $dataProvider;
        }

        $query->andFilterWhere([
            'id' => $this->id,
            'status' => $this->status,
        ]);

        if ($this->created_at !== null) {
            $query->andFilterWhere(['between', 'created_at', strtotime($this->created_at), strtotime($this->created_at) + 3600 * 24]);
        }

        if ($this->updated_at !== null) {
            $query->andFilterWhere(['between', 'updated_at', strtotime($this->updated_at), strtotime($this->updated_at) + 3600 * 24]);
        }

        if ($this->login_at !== null) {
            $query->andFilterWhere(['between', 'login_at', strtotime($this->login_at), strtotime($this->login_at) + 3600 * 24]);
        }

        $query->andFilterWhere(['like', 'username', $this->username])
            ->andFilterWhere(['like', 'auth_key', $this->auth_key])
            ->andFilterWhere(['like', 'password_hash', $this->password_hash])
            ->andFilterWhere(['like', 'email', $this->email])
            ->andFilterWhere(['like', 'university_partners.name', $this->uni_name])
            ->andFilterWhere(['like', 'rbac_auth_assignment.item_name', $this->item_name])
            ->andFilterWhere(['or', ['like', 'user_profile.firstname', $this->name], ['like', 'user_profile.lastname', $this->name]]);

        return $dataProvider;
    }
}
