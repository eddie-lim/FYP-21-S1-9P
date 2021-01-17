<?php
require(__DIR__ . '/../../common/env.php');
require_once(__DIR__ . '/../bootstrap.php');
// print_r(__DIR__);
// exit();

// Prepare Yii
require_once(YII_APP_BASE_PATH . '/vendor/yiisoft/yii2/Yii.php');
require_once(YII_APP_BASE_PATH . '/common/config/bootstrap.php');

Yii::setAlias('@tests', dirname(__DIR__));

