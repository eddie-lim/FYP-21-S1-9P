<?php

namespace api\controllers;

use Yii;
use yii\filters\auth\HttpBearerAuth;
use yii\data\ActiveDataFilter;
use yii\data\ActiveDataProvider;
use common\models\Faq;

use api\components\CustomHttpException;
use common\components\Utility;
use common\components\MyCustomActiveRecord;

class FaqController extends \api\controllers\RestControllerBase
{
    public $layout = false;
    public $modelClass = Faq::class;
    
    public function actions(){
        $actions = parent::actions();
        unset($actions['index']);
        return $actions;
    }
    
    public function actionIndex()
    {
        $filter = new ActiveDataFilter([
            'searchModel' => 'common\models\search\FaqSearch'
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

        $query = Faq::find();
        if ($filterCondition !== null) {
            $query->andWhere($filterCondition);
        }

        return new ActiveDataProvider([
            'query' => $query,
        ]);
    }

    /*public function actionIndex(){
        $o = (object) array("app"=>Yii::$app->name, "version"=>Yii::$app->params["apiVersion"], "endpoint"=>Yii::$app->controller->id);
        Yii::$app->api->sendSuccessResponse($o);
    }

    public function actionListFaq($page = 0, $pageSize = self::MAX_ROW_PER_PAGE) {
        $limit = ($pageSize > self::MAX_ROW_PER_PAGE) ? self::MAX_ROW_PER_PAGE : $pageSize;
        $offset = $page * $limit;
        $models = Faq::find()->orderBy(['created_at' => SORT_DESC])->limit($limit)->offset($offset)->asArray()->all();
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
    }*/
}
