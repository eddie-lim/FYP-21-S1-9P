<?php

/**
 * @var yii\web\View $this
 * @var common\models\Events $model
 */

$this->title = 'Update Events: ' . ' ' . $model->name;
$this->params['breadcrumbs'][] = ['label' => 'Events', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->name, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="events-update">

    <?php echo $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
