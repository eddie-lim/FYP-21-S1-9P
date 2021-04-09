<?php
return [
    'id' => 'api',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'api\controllers',
    'components' => [
        'urlManager' => require(__DIR__.'/_urlManager.php'),
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => false,
            'loginUrl' => null,
            'enableSession' => false,
        ],
        'request' => [
            'enableCookieValidation' => false,
            'enableCsrfValidation' => false,
            // 'cookieValidationKey' => 'xxxxxxx',
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ],
        ],
        'api' => [
            'class' => 'api\components\Api',
        ],
        'response' => [
            'class' => 'yii\web\Response',
            'format' => \yii\web\Response::FORMAT_JSON,
            'on beforeSend' => function ($event) {
                $response = $event->sender;
                $data = "";
                if($response->isSuccessful){
                    if(is_array($response->data)){
                        if(isset($response->data["items"]) && isset($response->data['_meta']) && isset($response->data['_links'])){
                            $data = $response->data['items'];
                        } else {
                            $data = $response->data;
                        }
                    } else {
                        $data = $response->data;
                    }
                } else {
                    if(is_array($response->data)){
                            $data = $response->data[0];
                    } else {
                        $data = json_decode($response->data['message']);
                    }
                }

                $meta = "";
                if(is_array($response->data)){
                    if(isset($response->data["items"]) && isset($response->data['_meta']) && isset($response->data['_links'])){
                        $meta = $response->data['_meta'];
                    } else {
                        $meta = null;
                    }
                }
                $response->data = [
                    'status' => $response->statusCode,
                    'text' => $response->isSuccessful ? "OK" : $response->data['name'],
                    'data' => $data,
                    'meta' => $meta,
                    // 'debug'=> ($event->sender->data),
                ];
                return $response;
            },
        ],  
    /*
        'response' => [
            'format' => \yii\web\Response::FORMAT_JSON
        ],
    */
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        
    ],
    'params' => [
        'apiVersion' => 'v1', //show the lastest version available
    ],

];


