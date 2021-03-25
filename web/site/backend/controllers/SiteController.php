<?php

namespace backend\controllers;

use Yii;
use common\models\UniversityPartners;
use yii\web\NotFoundHttpException;

/**
 * Site controller
 */
class SiteController extends \yii\web\Controller
{
    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }

    public function beforeAction($action)
    {
        $this->layout = Yii::$app->user->isGuest || !Yii::$app->user->can('loginToBackend') ? 'base' : 'common';

        return parent::beforeAction($action);
    }

    public function actionHome()
    {
        if (($model = UniversityPartners::findOne(Yii::$app->user->identity->userProfile->school_id ?? 0)) == null) {
            throw new NotFoundHttpException('Not assigned to any university, please contact SIM Admin.');
        }
        return $this->render('home', [
            'model' => $model,
        ]);
    }
}
