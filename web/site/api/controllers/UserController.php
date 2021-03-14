<?php

namespace api\controllers;

use Yii;

use api\components\CustomHttpException;

use common\models\User;
use common\models\form\LoginForm;
use common\models\form\RegistrationForm;
use common\models\SysOAuthAuthorizationCode;
use common\components\Utility;

class UserController extends \api\controllers\RestControllerBase
{
    public $layout = false;

    public function behaviors() {
        return array_merge(parent::behaviors(), [
            
            'verbs' => [
                'class' => \yii\filters\VerbFilter::className(),
                'actions' => [
                    'index' => ['GET'],
                    'register' => ['POST'],
                    'authorize' => ['POST'],
                    'access-token' => ['POST'],
                    'me' => ['GET'],
                ],
            ],
            'authenticator' => [
                'class' => \yii\filters\auth\HttpBearerAuth::className(),
                'except' => ['index', 'authorize', 'access-token', 'register', 'verify'],
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

    public function actionRegister() {
        $model = new RegistrationForm();
        $model->attributes = $this->request;

        if ($model->register()) {
            $data['message'] = "Success";

            Yii::$app->api->sendSuccessResponse($data);
        } else {
            $str = $this->getSerialisedValidationError($model);
            throw new CustomHttpException($str, CustomHttpException::UNPROCESSABLE_ENTITY);
        }
    }

    public function actionAuthorize() {
        $model = new LoginForm();
        $model->attributes = $this->request;
        
        if ($model->loginApi()) {
            $user_id = Yii::$app->user->identity->id;
            Yii::$app->api->deleteUserAuthorizationCodes($user_id);
            $auth_code = Yii::$app->api->createAuthorizationCode($user_id);

            $data = [];
            $data['authorization_code'] = $auth_code->code;
            $data['expires_at'] = $auth_code->expires_at;

            Yii::$app->api->sendSuccessResponse($data);
        } else {
            $str = $this->getSerialisedValidationError($model);
            throw new CustomHttpException($str, CustomHttpException::UNPROCESSABLE_ENTITY);
        }
    }

    public function actionAccessToken() {
        if (!isset($this->request["authorization_code"])) {
            $str =  Utility::jsonifyError("authorization_code", "Missing Authorization Code.");
            throw new CustomHttpException($str, CustomHttpException::UNPROCESSABLE_ENTITY);
        }
        $authorization_code = $this->request["authorization_code"];
        $auth_code = SysOAuthAuthorizationCode::isValid($authorization_code);
        if (!$auth_code) {
            $str =  Utility::jsonifyError("authorization_code", "Authorization Code is invalid or has expired.");
            throw new CustomHttpException($str, CustomHttpException::UNAUTHORIZED, CustomHttpException::INVALID_OR_EXPIRED_TOKEN);
        }

        $user_id = Yii::$app->api->getUserIdFromAuthorizationCode($authorization_code);
        Yii::$app->api->deleteUserAuthorizationCodes($user_id);
        Yii::$app->api->deleteUserAccesstokens($user_id);
        $accesstoken = Yii::$app->api->createAccesstoken($authorization_code, $user_id);

        $data = [];
        $data['access_token'] = $accesstoken->token;
        $data['expires_at'] = $accesstoken->expires_at;
        Yii::$app->api->sendSuccessResponse($data);
    }

    public function actionMe() {
        $data = Yii::$app->user->identity->userDetails;
        Yii::$app->api->sendSuccessResponse($data);
    }

}
