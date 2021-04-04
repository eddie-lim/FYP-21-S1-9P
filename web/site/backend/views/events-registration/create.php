<?php

/**
 * @var yii\web\View $this
 * @var common\models\EventsRegistration $model
 */

$this->title = 'Create Events Registration';
$this->params['breadcrumbs'][] = ['label' => 'Events Registrations', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="events-registration-create">

    <?php echo $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
