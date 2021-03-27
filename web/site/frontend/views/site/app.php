<?php
/**
 * @var yii\web\View $this
 */
use yii\helpers\Html;
$this->title = Yii::$app->name;
?>
<div class="site-index container">
    
    <h2 class="text-center m-5">
        <?php echo Html::encode($this->title) ?> Android APK
    </h2>
    <div class="w-100 p-0 justify-content-center d-flex" style="">
        <?php echo Html::a('Download' . ' <span class="fas fa-download fa-sm"></span>', ['/apk/openhouse.apk'], ['class' => 'btn btn-success']) ?>
    </div>
</div>
