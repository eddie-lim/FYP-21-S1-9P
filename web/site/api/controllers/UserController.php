<?php

namespace api\controllers;

use common\models\User;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\auth\HttpHeaderAuth;
use yii\filters\auth\QueryParamAuth;
use yii\rest\Controller;
use yii\rest\OptionsAction;
use Yii;

/**
 * @author Eugene Terentev <eugene@terentev.net>
 */
class UserController extends Controller
{
    public $layout = false;
    
    public function behaviors() {
        return array_merge(parent::behaviors(), [
            
            'verbs' => [
                'class' => \yii\filters\VerbFilter::className(),
                'actions' => [
                    'index' => ['GET'],
                ],
            ],
            'authenticator' => [
                'class' => HttpBearerAuth::className(),
                'except' => ['index'],
            ],
            'ActiveTimestampBehavior' => [
                'class' => \common\behaviors\ActiveTimestampBehavior::className(),
                'attribute' => 'active_at'
            ],
        ]);
    }

    public function actionIndex(){
        $o = (object) array("app"=>Yii::$app->name, "version"=>Yii::$app->params["apiVersion"], "endpoint"=>Yii::$app->controller->id);
        Yii::$app->api->sendSuccessResponse($o);
    }

    /**
     * @return User|null|\yii\web\IdentityInterface
     */
    public function actionMe(){
        $resource = new User();
        $resource->load(\Yii::$app->user->getIdentity()->attributes, '');
        return  $resource;
    }

}
