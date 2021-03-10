<?php
return [
   'class' => 'yii\web\UrlManager',
    'enablePrettyUrl' => true,
    'enableStrictParsing' => true,
    'showScriptName' => false,
    'rules' => [
        ['pattern'=>'', 'route'=>'site/index'],
        ['pattern'=>'v1', 'route'=>'site/index'],
        ['pattern'=>'v1/site', 'route'=>'site/index'],
        ['pattern'=>'v1/site/<action>', 'route'=>'site/<action>'],
        ['pattern'=>'v1/user', 'route'=>'user/index'],
        ['pattern'=>'v1/user/<action>', 'route'=>'user/<action>'],
        
        
    ],
    // 'ignoreLanguageUrlPatterns' => [
        // route pattern => url pattern
    //     '#^api/#' => '#^api/#',
    // ]
];
