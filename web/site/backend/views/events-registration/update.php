<?php

/**
 * @var yii\web\View $this
 * @var common\models\EventsRegistration $model
 */

$this->title = 'Update Events Registration: ' . ' ' . $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Events Registrations', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="events-registration-update">

    <?php echo $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
