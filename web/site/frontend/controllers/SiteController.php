<?php

namespace frontend\controllers;

use cheatsheet\Time;
use common\sitemap\UrlsIterator;
use frontend\models\ContactForm;
use Sitemaped\Element\Urlset\Urlset;
use Sitemaped\Sitemap;
use Yii;
use yii\filters\PageCache;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\web\Response;
use common\models\form\PasswordResetForm;

/**
 * Site controller
 */
class SiteController extends Controller
{
    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction'
            ],
        ];
    }

    /**
     * @return string
     */
    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionApp()
    {
        return $this->render('app');
    }

    public function actionMeetingMinutes()
    {
        return $this->render('meeting-minutes');
    }

    public function actionDownloadDocuments()
    {
        return $this->render('documents');
    }

    public function actionResetPassword($token)
    {
        $model = new PasswordResetForm();
        $model->token = $token;
        $msg = "";
        if ($model->validateToken()) {
            $msg = "Please enter a new password for <b>" . $model->email . "</b>.";
        } else {   
            return $this->render('invalidToken', ['model' => $model]);
        }        

        if ($model->load(Yii::$app->request->post()) && $model->validate() && $model->resetPassword()) {

            return $this->render("result", [
                "title" => "Password Reset Successful",
                "msg" => "The password for <b>" . $model->email . "</b>. has been successfully reset."
            ]);
        } 

        return $this->render('reset-password', [
            'msg' => $msg,
            'model' => $model,
        ]);
    }
}
