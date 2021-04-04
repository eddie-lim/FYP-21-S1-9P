<?php

namespace api\controllers;

use Yii;
use yii\web\BadRequestHttpException;
use yii\helpers\ArrayHelper;
use common\components\MyCustomActiveRecord;
use yii\web\Response;
use yii\rest\Controller;
use yii\rest\ActiveController;

class RestControllerBase extends ActiveController
{
    //used for api rate limiting
    public $endpoint; //name of endpoint
    public $request;
    public $enableCsrfValidation = false;
    public $headers;

    // public $serializer = [
    //     'class' => 'yii\rest\Serializer',
    //     'collectionEnvelope' => 'items',
    // ];
    
    public static function allowedDomains() {
        return [
            //Need to allow * for iOS webview to work!!
            '*',
        ];
    }

    public function behaviors() {
        return array_merge(parent::behaviors(), [
            'corsFilter' => [
                'class' => \yii\filters\Cors::className(),
                'cors' => [
                    'Origin:' => static::allowedDomains(),
                    // 'Access-Control-Allow-Origin:' => static::allowedDomains(),
                    'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
                    'Access-Control-Request-Headers' => ['*'],
                    'Access-Control-Allow-Credentials' => true,
                ],
            ],
            [
                'class' => 'yii\filters\ContentNegotiator',
                //'only' => ['view', 'index'], 
                'formats' => [
                    'application/octet-stream' => Response::FORMAT_JSON,
                    'text/html' => Response::FORMAT_JSON,
                    'application/json' => Response::FORMAT_JSON,
                    'application/xml' => Response::FORMAT_XML
                ],
            ],
            'ActiveTimestampBehavior' => [
                'class' => \common\behaviors\ActiveTimestampBehavior::className(),
                'attribute' => 'active_at'
            ],
        ]);
    }

    public function init() {
        $this->request = json_decode(file_get_contents('php://input'), true);
        if($this->request&&!is_array($this->request)) {
            //Yii::$app->api->sendFailedResponse(['Invalid Json']);
            //TODO:: this is not catching, fix it bitch
            throw new BadRequestHttpException(Utility::jsonifyError("server", "Invalid Json."));
        }
    }

    public function beforeSend($event) {

        print_r("expression"); exit();
        $response = $event->sender;
        if ($response->data !== null && Yii::$app->request->get('suppress_response_code')) {
            $response->data = [
                'success' => $response->isSuccessful,
                'data' => $response->data,
            ];
            $response->statusCode = 200;
        }
        return parent::beforeSend($action);
    }

    public function beforeAction($action) {
        //Note:: When used with HttpBearerAuth, auth error is throw first, need to catch in beforeAction
        $exception = Yii::$app->errorHandler->exception;
        //if ($exception instanceof NotFoundHttpException) {
        if ($exception !== null) {
            return $this->render('error', ['exception' => $exception, 'handler' => Yii::$app->errorHandler]);
        } 

        return parent::beforeAction($action);
    }

    public function actions() {
        return array_merge(parent::actions(), [
            'error' => ['class' => 'yii\web\ErrorAction'],
        ]);
    }

    function prettyPrintModelError($model) {
        $e = print_r( $model->getErrors(), true );
        $e = preg_replace("/\n/", '', $e);
        return $e;
    }
    
    function getSerialisedValidationError($model) {
        $result = [];

        if ( is_subclass_of($model, MyCustomActiveRecord::class) ) {
            foreach ($model->getFirstErrors() as $name => $error) {
                $temp = [
                    'field' => $name,
                    'message' => $error['message'],
                ];
                array_push($result, $temp);
            }
        } else {
            foreach ($model->getFirstErrors() as $name => $message) {
                $temp = [
                    'field' => $name,
                    'message' => $message,
                ];
                array_push($result, $temp);
            }
        }

        $e = json_encode($result);
        $e = preg_replace("/\n/", "", $e);
        //$e = preg_replace("\\", '', $e);
        //$e = str_replace("\\","",$e);
        return $e;        
    }

}