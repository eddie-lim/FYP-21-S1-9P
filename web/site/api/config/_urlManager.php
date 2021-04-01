<?php
return [
   'class' => 'yii\web\UrlManager',
    'enablePrettyUrl' => true,
    'enableStrictParsing' => true,
    'showScriptName' => false,
    'rules' => [
        [
            'class' => 'yii\rest\UrlRule',
            'controller' => ['courses', 'events', 'faq', 'university-partners', 'user', 'enquiries'],
            'pluralize' => false,
            // 'tokens' => [
            //     '{id}' => '<id:\\w+>'
            // ]
        ],
        ['pattern'=>'', 'route'=>'site/index'],
        ['pattern'=>'v1', 'route'=>'site/index'],
        ['pattern'=>'v1/site', 'route'=>'site/index'],
        ['pattern'=>'v1/site/<action>', 'route'=>'site/<action>'],
        // ['pattern'=>'v1/user', 'route'=>'user/index'],
        // ['pattern'=>'v1/user/<action>', 'route'=>'user/<action>'],
        // ['pattern'=>'v1/courses', 'route'=>'courses/index'],
        // ['pattern'=>'v1/courses/<action>', 'route'=>'courses/<action>'],
        
        
    ],
    // 'ignoreLanguageUrlPatterns' => [
        // route pattern => url pattern
    //     '#^api/#' => '#^api/#',
    // ]
];
