<?php

namespace api\controllers;

use Yii;
use yii\filters\auth\HttpBearerAuth;

use api\components\CustomHttpException;

use common\models\User;
use common\models\Courses;
use common\models\Events;
use common\models\Faq;
use common\models\UniversityPartners;
use common\components\Utility;
use common\components\MyCustomActiveRecord;

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

    /*public function actionIndex(){
        $o = (object) array("app"=>Yii::$app->name, "version"=>Yii::$app->params["apiVersion"], "endpoint"=>Yii::$app->controller->id);
        Yii::$app->api->sendSuccessResponse($o);
    }

    public function actionMe() {
        $data = Yii::$app->user->identity->userDetails;
        Yii::$app->api->sendSuccessResponse($data);
    }*/

    public function extraFields()
    {
        return ['userProfile'];
    }
}

