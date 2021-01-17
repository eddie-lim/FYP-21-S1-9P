<?php
return yii\helpers\ArrayHelper::merge(
    require(YII_APP_BASE_PATH . '/common/config/base.php'),
    require(dirname(__DIR__) . '/base.php'),
    [
        'id' => 'app-common',
        'basePath' => YII_APP_BASE_PATH,
        'components' => [
            'db' => [
                'class' => yii\db\Connection::class,
                'dsn' => env('DB_DSN'),
                'username' => env('DB_USERNAME'),
                'password' => env('DB_PASSWORD'),
                'tablePrefix' => env('DB_TABLE_PREFIX'),
                'charset' => env('DB_CHARSET', 'utf8')
                /*
                'dsn' => env('DB_DSN'),
                'username' => env('DB_USERNAME'), //use test db for testing (TEST_DB_USERNAME, TEST_DB_PASSWORD, TEST_DB_DSN)
                'password' => env('DB_PASSWORD'),
                'tablePrefix' => env('DB_TABLE_PREFIX'),
                'charset' => env('DB_CHARSET', 'utf8')
                 */
            ],
        ]
    ]
);
