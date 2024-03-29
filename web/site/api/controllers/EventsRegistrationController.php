<?php

namespace api\controllers;

use Yii;
use yii\filters\auth\HttpBearerAuth;
use yii\data\ActiveDataFilter;
use yii\data\ActiveDataProvider;
use common\models\EventsRegistration;
use yii\rest\ActiveController;
use api\controllers\RestControllerBase;

use api\components\CustomHttpException;
use common\components\Utility;
use common\components\MyCustomActiveRecord;

class EventsRegistrationController extends RestControllerBase
{
    public $layout = false;
    public $modelClass = EventsRegistration::class;

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
        return $actions;
    }

    public function actionIndex()
    {
        $filter = new ActiveDataFilter([
            'searchModel' => 'common\models\search\EventsRegistrationSearch'
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

        $query = EventsRegistration::find()
        ->where(['created_by'=>Yii::$app->user->id]); // show only user's own data
        if ($filterCondition !== null) {
            $query->andWhere($filterCondition);
        }

        return new ActiveDataProvider([
            // 'pagination' => false,
            'query' => $query,
        ]);
    }
}
