<?php

use Sitemaped\Sitemap;

return [
    'class' => 'yii\web\UrlManager',
    'enablePrettyUrl' => true,
    'showScriptName' => false,
    'rules' => [
        ['pattern'=>'', 'route'=>'site/index'],
        ['pattern'=>'<controller>', 'route'=>'site/index'],
        ['pattern'=>'<controller>/<action>', 'route'=>'site/index'],
    ]
];
