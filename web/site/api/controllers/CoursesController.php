<?php

namespace api\controllers;

use Yii;
use yii\filters\auth\HttpBearerAuth;
use yii\data\ActiveDataFilter;
use yii\data\ActiveDataProvider;
use yii\helpers\ArrayHelper;
use common\models\Courses;

use api\components\CustomHttpException;
use common\components\Utility;
use common\components\MyCustomActiveRecord;

class CoursesController extends \api\controllers\RestControllerBase
{
    public $layout = false;
    public $modelClass = Courses::class;
    
    public function actions(){
        $actions = parent::actions();
        unset($actions['index']);
        return $actions;
    }
    
    public function actionIndex()
    {
        $filter = new ActiveDataFilter([
            'searchModel' => 'common\models\search\CoursesSearch'
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

        $query = Courses::find();
        if ($filterCondition !== null) {
            $query->andWhere($filterCondition);
        }

        return new ActiveDataProvider([
            'query' => $query,
        ]);
    }

    public function actionFilterValues(){
        $courses = Courses::find()->select(['mode_of_study', 'disciplines', 'school_id', 'academic_level', 'admission_criteria', 'sub_disciplines', "CONCAT('{\"label\":\"',university_partners.name,'\",','\"value\":\"',school_id,'\"}') AS universityParters"])->where(['courses.status'=>MyCustomActiveRecord::STATUS_ENABLED])->joinWith('school')->asArray()->all();
        $o = (object)[];
        $o->mode_of_study = array_values(array_unique(ArrayHelper::getColumn($courses, "mode_of_study")));
        $o->disciplines = array_values(array_unique(ArrayHelper::getColumn($courses, "disciplines")));
        $o->academic_level = array_values(array_unique(ArrayHelper::getColumn($courses, "academic_level")));
        // $o->admission_criteria = array_values(array_unique(ArrayHelper::getColumn($courses, "admission_criteria")));
        $o->sub_disciplines = array_values(array_unique(ArrayHelper::getColumn($courses, "sub_disciplines")));
        $o->universityParters = array_values(array_unique(ArrayHelper::getColumn($courses, "universityParters")));
        Yii::$app->api->sendSuccessResponse($o);
    }
    /*public function actionIndex(){
        $o = (object) array("app"=>Yii::$app->name, "version"=>Yii::$app->params["apiVersion"], "endpoint"=>Yii::$app->controller->id);
        Yii::$app->api->sendSuccessResponse($o);
    }

    public function actionListCourses($page = 0, $pageSize = self::MAX_ROW_PER_PAGE) {
        $limit = ($pageSize > self::MAX_ROW_PER_PAGE) ? self::MAX_ROW_PER_PAGE : $pageSize;
        $offset = $page * $limit;
        $models = Courses::find()->orderBy(['created_at' => SORT_DESC])->limit($limit)->offset($offset)->all();
        Yii::$app->api->sendSuccessResponse(MyCustomActiveRecord::toObjectArray($models));
    }

    public function actionGetCourse($id){
        $model = Courses::find()->where(['id'=>$id])->one();
        if($model){
            Yii::$app->api->sendSuccessResponse($model->toObject());
        } else {
            $str = Utility::jsonifyError("id", "Invalid ID.");
            throw new CustomHttpException($str, CustomHttpException::UNPROCESSABLE_ENTITY);
        }
    }*/
}
