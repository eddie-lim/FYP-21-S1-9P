<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Url;
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use frontend\assets\AppAsset;
use common\widgets\Alert;
use yii\web\View;


?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <?php $this->head() ?>
</head>
<body>

<div>
<?php $this->beginBody() ?>

      <?php 
        echo $content;
      ?>

</div>


<?php $this->endBody() ?>

</body>
</html>
<?php $this->endPage() ?>
