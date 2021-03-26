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

class SiteController extends \api\controllers\RestControllerBase
{
    const MAX_ROW_PER_PAGE = 20;
    public $layout = false;

    public function behaviors() {
        return array_merge(parent::behaviors(), [
            
            'verbs' => [
                'class' => \yii\filters\VerbFilter::className(),
                'actions' => [
                    'index' => ['GET'],
                ],
            ],
            // 'authenticator' => [
            //     'class' => HttpBearerAuth::className(),
            //     'except' => ['index'],
            // ],
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

    public function actionListCourses($page = 0, $pageSize = self::MAX_ROW_PER_PAGE) {
        $limit = ($pageSize > self::MAX_ROW_PER_PAGE) ? self::MAX_ROW_PER_PAGE : $pageSize;
        $offset = $page * $limit;
        $models = Courses::find()->orderBy([
        'created_at' => SORT_DESC])->limit($limit)->offset($offset)->all();
        Yii::$app->api->sendSuccessResponse(MyCustomActiveRecord::toObjectArray($models));
    }

    public function actionGetCourse($id){
        $model = Courses::find()->where(['id'=>$id])->asArray()->one();
        if($model){
            Yii::$app->api->sendSuccessResponse($model->toObject());
        } else {
            $str = Utility::jsonifyError("id", "Invalid ID.");
            throw new CustomHttpException($str, CustomHttpException::UNPROCESSABLE_ENTITY);
        }
    }

    public function actionListEvents($page = 0, $pageSize = self::MAX_ROW_PER_PAGE) {
        $limit = ($pageSize > self::MAX_ROW_PER_PAGE) ? self::MAX_ROW_PER_PAGE : $pageSize;
        $offset = $page * $limit;
        $models = Events::find()->orderBy([
        'created_at' => SORT_DESC])->limit($limit)->offset($offset)->all();
        Yii::$app->api->sendSuccessResponse(MyCustomActiveRecord::toObjectArray($models));
    }

    public function actionGetEvent($id){
        $model = Events::find()->where(['id'=>$id])->asArray()->one();
        if($model){
            Yii::$app->api->sendSuccessResponse($model->toObject());
        } else {
            $str = Utility::jsonifyError("id", "Invalid ID.");
            throw new CustomHttpException($str, CustomHttpException::UNPROCESSABLE_ENTITY);
        }
    }

    public function actionListFaq($page = 0, $pageSize = self::MAX_ROW_PER_PAGE) {
        $limit = ($pageSize > self::MAX_ROW_PER_PAGE) ? self::MAX_ROW_PER_PAGE : $pageSize;
        $offset = $page * $limit;
        $models = Faq::find()->orderBy([
        'created_at' => SORT_DESC])->limit($limit)->offset($offset)->all();
        Yii::$app->api->sendSuccessResponse($models);
    }

    public function actionGetFaq($id){
        $model = Faq::find()->where(['id'=>$id])->asArray()->one();
        if($model){
            Yii::$app->api->sendSuccessResponse($model);
        } else {
            $str = Utility::jsonifyError("id", "Invalid ID.");
            throw new CustomHttpException($str, CustomHttpException::UNPROCESSABLE_ENTITY);
        }
    }

    public function actionListUniversityPartners($page = 0, $pageSize = self::MAX_ROW_PER_PAGE) {
        $limit = ($pageSize > self::MAX_ROW_PER_PAGE) ? self::MAX_ROW_PER_PAGE : $pageSize;
        $offset = $page * $limit;
        $models = UniversityPartners::find()->orderBy([
        'created_at' => SORT_DESC])->limit($limit)->offset($offset)->all();
        Yii::$app->api->sendSuccessResponse(MyCustomActiveRecord::toObjectArray($models));
    }

    public function actionGetUniversityPartner($id){
        $model = UniversityPartners::find()->where(['id'=>$id])->asArray()->one();
        if($model){
            Yii::$app->api->sendSuccessResponse($model->toObject());
        } else {
            $str = Utility::jsonifyError("id", "Invalid ID.");
            throw new CustomHttpException($str, CustomHttpException::UNPROCESSABLE_ENTITY);
        }
    }

}
