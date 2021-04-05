<?php
use yii\helpers\Html;


if (!isset($title)) $title = "";
if (!isset($msg)) $msg = "";

$this->title = $title;

?>


<div class="site-feedback">

    <div class="container container-sm">
        <div class="overview text-center">
            <br><br><br>
            <h3 class="menu-title menu-title-tight text-center"><?php echo Html::encode($title); ?></h3>
            <p class="text-center"><?php echo \yii\helpers\HtmlPurifier::process($msg); ?></p>

        </div>
    </div>
</div>