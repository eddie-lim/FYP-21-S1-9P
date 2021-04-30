<?php

$this->registerMetaTag(['name' => 'description', 'content' => Yii::$app->params['meta_description']['content'] ], 'description');
$this->registerMetaTag(['name' => 'keywords', 'content' => Yii::$app->params['meta_keywords']['content'] ], 'keywords');
$this->registerMetaTag(['name' => 'copyright', 'content' => Yii::$app->params['meta_copyright']['content'] ], 'copyright');
$this->registerMetaTag(['name' => 'author', 'content' => Yii::$app->params['meta_author']['content'] ], 'author');
$this->registerMetaTag(['name' => 'reply-to', 'content' => Yii::$app->params['meta_reply-to']['content'] ], 'reply-to');

$this->registerMetaTag(['property' => 'og:url', 'content' => Yii::$app->params['og_url']['content'] ], "og:url");
$this->registerMetaTag(['property' => 'og:title', 'content' => Yii::$app->params['og_title']['content'] ], "og:title");
$this->registerMetaTag(['property' => 'og:description', 'content' => Yii::$app->params['og_description']['content'] ], "og:description");
$this->registerMetaTag(['property' => 'og:image', 'content' => Yii::$app->params['og_image']['content'] ] , "og:image");
$this->registerMetaTag(['property' => 'og:type', 'content' => Yii::$app->params['og_type']['content'] ] , "og:type");
$this->registerMetaTag(['property' => 'og:locale', 'content' => Yii::$app->language] , "og:locale");

?>
