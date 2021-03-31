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


