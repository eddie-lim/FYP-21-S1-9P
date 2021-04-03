<?php

namespace api\controllers;

use Yii;
use yii\filters\auth\HttpBearerAuth;
use yii\data\ActiveDataFilter;
use yii\data\ActiveDataProvider;
use yii\helpers\ArrayHelper;
use common\models\Events;

use api\components\CustomHttpException;
use common\components\Utility;
use common\components\MyCustomActiveRecord;

class EventsController extends \api\controllers\RestControllerBase
{
    public $layout = false;
    public $modelClass = Events::class;
    
    public function actions(){
        $actions = parent::actions();
        unset($actions['index']);
        return $actions;
    }
    
    public function actionIndex()
    {
        $filter = new ActiveDataFilter([
            'searchModel' => 'common\models\search\EventsSearch'
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

        $query = Events::find();
        if ($filterCondition !== null) {
            $query->andWhere($filterCondition);
        }

        return new ActiveDataProvider([
            'query' => $query,
        ]);
    }

    public function actionFilterValues(){
        $courses = Events::find()->select(['type', 'school_id', "CONCAT('{\"label\":\"',university_partners.name,'\",','\"value\":\"',school_id,'\"}') AS universityParters"])->where(['events.status'=>MyCustomActiveRecord::STATUS_ENABLED])->joinWith('school')->asArray()->all();
        $o = (object)[];
        $types = array_values(array_unique(ArrayHelper::getColumn($courses, "type")));
        $o->type = count($types) == 1 && empty($types[0]) ? [] : $types; 
        $o->universityParters = array_values(array_unique(ArrayHelper::getColumn($courses, "universityParters")));
        Yii::$app->api->sendSuccessResponse($o);
    }

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
