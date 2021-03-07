<?php

/**
 * @var yii\web\View $this
 * @var common\models\Events $model
 */

$this->title = 'Create Events';
$this->params['breadcrumbs'][] = ['label' => 'Events', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="events-create">

    <?php echo $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
