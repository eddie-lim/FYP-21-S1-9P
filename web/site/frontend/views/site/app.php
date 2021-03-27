<?php
/**
 * @var yii\web\View $this
 */
use yii\helpers\Html;
$this->title = Yii::$app->name;
?>
<div class="site-index">
    
    <div class="login-box">
        <div class="login-logo">
            <?php echo Html::encode($this->title) ?>
        </div>
        <div class="card-body w-25 p-0">
            <?php echo Html::a('Download' . ' <span class="fas fa-download fa-sm"></span>', ['/apk/openhouse.apk'], ['class' => 'btn btn-success']) ?>
        </div>
    </div>
</div>
