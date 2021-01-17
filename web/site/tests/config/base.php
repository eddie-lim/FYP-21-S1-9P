<?php

/**
 * Application configuration shared by all test types
 !!! remember to chg db configuration for testing
 */
return [
    'id' => 'test',
    'basePath' => dirname(__DIR__),
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'language' => 'en',
    'components' => [
        'db' => [
            'class' => yii\db\Connection::class,
            'dsn' => env('TEST_DB_DSN'),
            'username' => env('TEST_DB_USERNAME'), //use test db for testing (TEST_DB_USERNAME, TEST_DB_PASSWORD, TEST_DB_DSN)
            'password' => env('TEST_DB_PASSWORD'),
            'tablePrefix' => env('TEST_DB_TABLE_PREFIX'),
            'charset' => env('TEST_DB_CHARSET', 'utf8')
        ],
        'mailer' => [
            'useFileTransport' => true,
        ],
        'urlManager' => [
            'showScriptName' => true,
        ],
        'user' => [
            'identityClass' => 'common\models\User',
        ],
        'request' => [
            'cookieValidationKey' => 'test',
            'enableCsrfValidation' => false,
            // but if you absolutely need it set cookie domain to localhost
            /*
            'csrfCookie' => [
                'domain' => 'localhost',
            ],
            */
        ],
        'urlManager' => [
            'showScriptName' => false,
        ],
    ],
    'params' => [
        'adminEmail' => 'admin@bts.site',
        'adminEmailName' => 'bts Admin',
        'robotEmail' => 'robot@bts.site',
        'robotEmailName' => 'bts System'
    ],
];
