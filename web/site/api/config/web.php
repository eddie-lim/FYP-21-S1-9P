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
                $response->data = [
                    'status' => $response->statusCode,
                    'text' => $response->isSuccessful ? "OK" : $response->data['name'],
                    'data' => $response->isSuccessful ? 
                                (isset($response->data["items"]) && isset($response->data['_meta']) && isset($response->data['_links']) ?
                                    $response->data['items']: $response->data) : 
                                json_decode($response->data['message']),
                    'meta' => isset($response->data["items"]) && isset($response->data['_meta']) && isset($response->data['_links']) ?
                                    $response->data['_meta']: null,
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


