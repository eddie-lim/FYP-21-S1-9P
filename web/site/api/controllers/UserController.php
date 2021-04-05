<?php

namespace api\controllers;

use Yii;
use yii\data\ActiveDataFilter;
use yii\data\ActiveDataProvider;
use yii\filters\auth\HttpBearerAuth;
use common\models\User;
use common\models\form\PasswordResetRequestForm;
use common\models\form\PasswordChangeForm;
use yii\web\ServerErrorHttpException;


class UserController extends \api\controllers\RestControllerBase
{
    public $layout = false;
    public $modelClass = User::class;

    public function behaviors() {
        return array_merge(parent::behaviors(), [
            'authenticator' => [
                'class' => HttpBearerAuth::className(),
                // 'except' => ['index'],
            ],
        ]);
    }
    
    public function actions(){
        $actions = parent::actions();
        unset($actions['index']);
        unset($actions['update']);
        return $actions;
    }
    
    public function actionIndex()
    {
        $filter = new ActiveDataFilter([
            'searchModel' => 'backend\models\search\UserSearch'
        ]);

        $filterCondition = null;

        // You may load filters from any source. For example,
        // if you prefer JSON in request body,
        // use Yii::$app->request->getBodyParams() below:
        if ($filter->load(\Yii::$app->request->get())) { 
            $filterCondition = $filter->build();
            if ($filterCondition === false) {
                // Serializer would get errors out of it
                return $filter;
            }
        }

        $query = User::find()
        ->where(['id'=>Yii::$app->user->id]); // show only user's own data
        if ($filterCondition !== null) {
            $query->andWhere($filterCondition);
        }

        return new ActiveDataProvider([
            'query' => $query,
        ]);
    }
    public function actionUpdate()
    {
        $post_user = Yii::$app->request->post();
        $user = Yii::$app->user->identity;
        if (isset($post_user['email'])) {
            $user->email = $post_user['email'];
        }

        $userProfile = Yii::$app->user->identity->userProfile;
        if (isset($post_user['userProfile'])) {
            $post_user_profile = $post_user['userProfile'];
            for ($i=0; $i < count($post_user_profile); $i++) {
                $key = array_keys($post_user_profile);
                $el = $key[$i];
                $userProfile[$el] = $post_user_profile[$el];
            }
        }

        $transaction = Yii::$app->db->beginTransaction();
        try {
            if($user->save() && $userProfile->save()){
                $transaction->commit();
            } else {
                $transaction->rollback();
            }
        } catch (\Exception $e) {
            $transaction->rollback();
        }

        $res = (object) array(array(
            "id"=> $user->id,
            "email"=> $user->email,
            "userProfile"=>array(
                "firstname"=>$userProfile->firstname,
                "lastname"=>$userProfile->lastname,
                "mobile"=>$userProfile->mobile,
                "highest_qualification"=>$userProfile->highest_qualification,
                "school_id"=>$userProfile->school_id,
                "subscribe_newsletter"=>$userProfile->subscribe_newsletter,
                "country_code"=>$userProfile->country_code,
                "nationality"=>$userProfile->nationality,
                "year_of_graduation"=>$userProfile->year_of_graduation,
                "awarding_institute"=>$userProfile->awarding_institute,
            )
        ));
        Yii::$app->api->sendSuccessResponse($res);

        // print_r(Yii::$app->request->post()); exit();
    }

    public function actionChangePassword(){
        $model = new PasswordChangeForm();
        if($model->load(["PasswordChangeForm"=>Yii::$app->request->post()])){
            // print_r($model->attributes); exit();
            if($model->validate() && $model->changePassword()){
                Yii::$app->api->sendSuccessResponse('success');
            }
        }
        throw new ServerErrorHttpException(json_encode($model->errors));
    }

    public function actionRequestResetPassword(){
        $model = new PasswordResetRequestForm();
        if($model->load(["PasswordResetRequestForm"=>Yii::$app->request->post()])){
            // print_r($model->attributes); exit();
            if($model->validate() && $model->sendEmail()){
                Yii::$app->api->sendSuccessResponse('success');
            }
        }
        throw new ServerErrorHttpException(json_encode($model->errors));
    }

    /*public function actionIndex(){
        $o = (object) array("app"=>Yii::$app->name, "version"=>Yii::$app->params["apiVersion"], "endpoint"=>Yii::$app->controller->id);
        Yii::$app->api->sendSuccessResponse($o);
    }

    public function actionMe() {
        $data = Yii::$app->user->identity->userDetails;
        Yii::$app->api->sendSuccessResponse($data);
    }*/
}

