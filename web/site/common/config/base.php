<?php
$config = [
    'name' => 'SIM Open House',
    'vendorPath' => __DIR__ . '/../../vendor',
    'extensions' => require(__DIR__ . '/../../vendor/yiisoft/extensions.php'),
    'sourceLanguage' => 'en-US',
    'language' => 'en-US',
    'bootstrap' => ['log', 'queue'],
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm' => '@vendor/npm-asset',
    ],
    'components' => [
        'authManager' => [
            'class' => yii\rbac\DbManager::class,
            'itemTable' => '{{%rbac_auth_item}}',
            'itemChildTable' => '{{%rbac_auth_item_child}}',
            'assignmentTable' => '{{%rbac_auth_assignment}}',
            'ruleTable' => '{{%rbac_auth_rule}}'
        ],

        'cache' => [
            'class' => yii\caching\FileCache::class,
            'cachePath' => '@common/runtime/cache'
        ],

        'commandBus' => [
            'class' => trntv\bus\CommandBus::class,
            'middlewares' => [
                [
                    'class' => trntv\bus\middlewares\BackgroundCommandMiddleware::class,
                    'backgroundHandlerPath' => '@console/yii',
                    'backgroundHandlerRoute' => 'command-bus/handle',
                ]
            ]
        ],

        'formatter' => [
            'class' => yii\i18n\Formatter::class,
            // 'defaultTimeZone' => 'UTC',
            // 'defaultTimeZone' => 'Asia/Singapore',
            //'timeZone' => 'UTC',
            // 'timeZone' => 'Asia/Singapore',
            'dateFormat' => 'php:d M Y',
            'datetimeFormat' => 'php:d M Y h:i A',
            'timeFormat' => 'php:h:i A',
            'thousandSeparator' => ',',
            'decimalSeparator' => '.',
            //'currencyCode' => 'USD',
            /*
            'numberFormatterSymbols' => [
                NumberFormatter::CURRENCY_SYMBOL => '$',
                ],
            'numberFormatterOptions' =>
                [
                NumberFormatter::MIN_FRACTION_DIGITS => 0,
                NumberFormatter::MAX_FRACTION_DIGITS => 0,
                ],
            */
        ],

        'glide' => [
            'class' => trntv\glide\components\Glide::class,
            'sourcePath' => '@storage/web/source',
            'cachePath' => '@storage/cache',
            'urlManager' => 'urlManagerStorage',
            'maxImageSize' => env('GLIDE_MAX_IMAGE_SIZE'),
            'signKey' => env('GLIDE_SIGN_KEY')
        ],

        'mailer' => [
            'class' => yii\swiftmailer\Mailer::class,
            'viewPath' => '@common/mail',
            'useFileTransport' => false,
            'transport' => [
                'class' => 'Swift_SmtpTransport',
                
                'host' =>  env('SMTP_HOST'),
                'username' => env('SMTP_USERNAME'),
                'password' => env('SMTP_PASSWORD'),
                'port' => env('SMTP_PORT'),
                'encryption' => 'tls',
                
                'streamOptions' => [ //for localhost testing
                    'ssl' => [
                        'verify_peer' => false,
                        'allow_self_signed' => true
                    ],
                ],
            ],
            'messageConfig' => [
                'charset' => 'UTF-8',
                'from' => env('ROBOT_EMAIL')
            ]
        ],

        'db' => [
            'class' => yii\db\Connection::class,
            'dsn' => env('DB_DSN'),
            'username' => env('DB_USERNAME'),
            'password' => env('DB_PASSWORD'),
            'tablePrefix' => env('DB_TABLE_PREFIX'),
            'charset' => env('DB_CHARSET', 'utf8'),
            'enableSchemaCache' => YII_ENV_PROD,
        ],

        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                'db' => [
                    'class' => 'yii\log\DbTarget',
                    'levels' => ['error', 'warning'],
                    'except' => ['yii\web\HttpException:*', 'yii\i18n\I18N\*'],
                    'prefix' => function () {
                        $url = !Yii::$app->request->isConsoleRequest ? Yii::$app->request->getUrl() : null;
                        return sprintf('[%s][%s]', Yii::$app->id, $url);
                    },
                    'logVars' => [],
                    'logTable' => '{{%system_log}}'
                ]
            ],
        ],

        'i18n' => [
            'translations' => [
                '*' => [
                    'class' => yii\i18n\PhpMessageSource::class,
                    'basePath' => '@common/messages',
                    'fileMap' => [
                        'common' => 'common.php',
                        'backend' => 'backend.php',
                        'frontend' => 'frontend.php',
                    ],
                    'on missingTranslation' => [common\models\Translation::class, 'missingTranslation']
                ],
                /* Uncomment this code to use DbMessageSource
                '*'=> [
                    'class' => yii\i18n\DbMessageSource::class,
                    'sourceMessageTable'=>'{{%i18n_source_message}}',
                    'messageTable'=>'{{%i18n_message}}',
                    'enableCaching' => YII_ENV_DEV,
                    'cachingDuration' => 3600,
                    'on missingTranslation' => [common\models\Translation::class, 'missingTranslation']
                ],
                */
            ],
        ],

        'fileStorage' => [
            'class' => trntv\filekit\Storage::class,
            'baseUrl' => '@storageUrl/source',
            'filesystem' => [
                'class' => common\components\filesystem\LocalFlysystemBuilder::class,
                'path' => '@storage/web/source'
            ],
            'as log' => [
                'class' => common\behaviors\FileStorageLogBehavior::class,
                'component' => 'fileStorage'
            ]
        ],
        /*'fileStorage' => [ //for aws
            // 'class' => 'trntv\filekit\Storage',
            'class' => common\components\MyStorage::class,
            'baseUrl' => env("STORAGE_URL"),

            'filesystem'=> [
                'class' => 'common\components\filesystem\AwsS3v3FlysystemBuilder',
                'key' => env("AWS_KEY"),
                'secret' => env("AWS_SECRET"),
                'bucket' => env("AWS_S3_BUCKET"),
                'region' => env("AWS_S3_REGION"),
                
            ],
            'as log' => [
                'class' => 'common\behaviors\FileStorageLogBehavior',
                'component' => 'fileStorage'
            ]
        ],*/

        'keyStorage' => [
            'class' => common\components\keyStorage\KeyStorage::class
        ],


        'urlManagerApi' => \yii\helpers\ArrayHelper::merge(
            [
                'hostInfo' => Yii::getAlias('@apiUrl'),
                'baseUrl' => Yii::getAlias('@apiUrl'),
            ],
            require(Yii::getAlias('@api/config/_urlManager.php'))
        ),

        'urlManagerFrontend' => \yii\helpers\ArrayHelper::merge(
            [
                'hostInfo' => Yii::getAlias('@frontendUrl'),
                'baseUrl' => Yii::getAlias('@frontendUrl'),
            ],
            require(Yii::getAlias('@frontend/config/_urlManager.php'))
        ),
        'urlManagerBackend' => \yii\helpers\ArrayHelper::merge(
            [
                'hostInfo' => Yii::getAlias('@backendUrl'),
                'baseUrl' => Yii::getAlias('@backendUrl'),

            ],
            require(Yii::getAlias('@backend/config/_urlManager.php'))
        ),

        'queue' => [
            'class' => \yii\queue\db\Queue::class,
            'db' => 'db', // DB connection component or its config 
            'tableName' => '{{%sys_queue}}', // Table name
            'channel' => 'default', // Queue channel key
            'mutex' => \yii\mutex\MysqlMutex::class, // Mutex used to sync queries
            'as log' => \yii\queue\LogBehavior::class,
            'ttr' => 10, // Time To Retry next attempt (in seconds) 
            'attempts' => 5, // Max number of attempts
        ],
    ],
    'params' => [
        'adminEmail' => env('ADMIN_EMAIL'),
        'robotEmail' => env('ROBOT_EMAIL'),
        'emailName' => "FYP-21-S1-9P - SIM Open House",
        'availableLocales' => [
            'en-US' => 'English (US)',
            'ru-RU' => 'Русский (РФ)',
            'uk-UA' => 'Українська (Україна)',
            'es' => 'Español',
            'fr' => 'Français',
            'vi' => 'Tiếng Việt',
            'zh-CN' => '简体中文',
            'pl-PL' => 'Polski (PL)',
            'id-ID' => 'Indonesian (Bahasa)',
            'hu-HU' => 'Magyar',
        ],
        'bsVersion' => '4.x', // bootstrap version


        'meta_copyright' => ['property' => 'copyright', 'content'=>'FYP-21-S1-9P - SIM Open House'],
        'meta_author' => ['property' => 'author', 'content'=>'admin, '.env('ADMIN_EMAIL')],
        'meta_reply-to' => ['property' => 'reply-to', 'content'=>env('ADMIN_EMAIL')],
        'meta_description' => ['property' => 'description', 'content' => 'We are a group of final year students working on our final year project which is to develop a SIM open house mobile application.'],
        'meta_keywords' => ['property' => 'keyword', 'content' => 'FYP-21-S1-9P - SIM Open House'],
        'og_url' => ['property' => 'og:url', 'content' => 'https://protect.instaprotection.com/'],
        'og_title' => ['property' => 'og:title', 'content' => 'FYP-21-S1-9P - SIM Open House'],
        'og_description' => ['property' => 'og:description', 'content' => 'We are a group of final year students working on our final year project which is to develop a SIM open house mobile application.'],
        'og_image' => ['property' => 'og:image', 'content' => 'https://fyp21s19p.link/favicon.png'],
        'og_type' => ['property' => 'og:type', 'content' => 'website'],
        'og_locale' => ['property' => 'og:image', 'content' => 'en_US'],
    ],
];

if (YII_ENV_PROD) {
    $config['components']['log']['targets']['email'] = [
        'class' => yii\log\EmailTarget::class,
        'except' => ['yii\web\HttpException:*'],
        'levels' => ['error', 'warning'],
        'message' => ['from' => env('ROBOT_EMAIL'), 'to' => env('ADMIN_EMAIL')]
    ];
}

if (YII_ENV_DEV) {
    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => yii\gii\Module::class
    ];

    $config['components']['cache'] = [
        'class' => yii\caching\DummyCache::class
    ];
    // $config['components']['mailer']['transport'] = [
    //     'class' => 'Swift_SmtpTransport',
    //     'host' => env('SMTP_HOST'),
    //     'port' => env('SMTP_PORT'),
    // ];
}

return $config;
