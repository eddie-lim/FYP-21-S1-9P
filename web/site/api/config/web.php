<?php
$config = [
    'homeUrl' => Yii::getAlias('@apiUrl'),
    'controllerNamespace' => 'api\controllers',
    'defaultRoute' => 'site/index',
    'bootstrap' => ['maintenance'],
    'modules' => [
        'v1' => \api\modules\v1\Module::class
    ],
    'components' => [
        'errorHandler' => [
            'errorAction' => 'site/error'
        ],
        'maintenance' => [
            'class' => common\components\maintenance\Maintenance::class,
            'enabled' => function ($app) {
                if (env('APP_MAINTENANCE') === '1') {
                    return true;
                }
                return $app->keyStorage->get('frontend.maintenance') === 'enabled';
            }
        ],
        'request' => [
            'enableCookieValidation' => false,
        ],
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => false,
            'loginUrl' => null,
            'enableSession' => false,
        ],
        'api' => [
            'class' => 'api\components\Api',
        ],
    ]
];

return $config;
