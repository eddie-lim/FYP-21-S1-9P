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

class EventsController extends \api\controllers\RestControllerBase
{
    public $layout = false;
    public $modelClass = Events::class;

    /*public function actionIndex(){
        $o = (object) array("app"=>Yii::$app->name, "version"=>Yii::$app->params["apiVersion"], "endpoint"=>Yii::$app->controller->id);
        Yii::$app->api->sendSuccessResponse($o);
    }

    public function actionListEvents($page = 0, $pageSize = self::MAX_ROW_PER_PAGE) {
        $limit = ($pageSize > self::MAX_ROW_PER_PAGE) ? self::MAX_ROW_PER_PAGE : $pageSize;
        $offset = $page * $limit;
        $models = Events::find()->orderBy(['created_at' => SORT_DESC])->limit($limit)->offset($offset)->all();
        Yii::$app->api->sendSuccessResponse(MyCustomActiveRecord::toObjectArray($models));
    }

    public function actionGetEvent($id){
        $model = Events::find()->where(['id'=>$id])->one();
        if($model){
            Yii::$app->api->sendSuccessResponse($model->toObject());
        } else {
            $str = Utility::jsonifyError("id", "Invalid ID.");
            throw new CustomHttpException($str, CustomHttpException::UNPROCESSABLE_ENTITY);
        }
    }*/
}
