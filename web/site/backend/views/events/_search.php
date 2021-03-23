<?php

use yii\helpers\Html;
use yii\bootstrap4\ActiveForm;

/**
 * @var yii\web\View $this
 * @var common\models\Events $model
 * @var yii\bootstrap4\ActiveForm $form
 */
?>

<div class="events-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?php echo $form->field($model, 'id') ?>
    <?php echo $form->field($model, 'school_id') ?>
    <?php echo $form->field($model, 'session') ?>
    <?php echo $form->field($model, 'name') ?>
    <?php echo $form->field($model, 'description') ?>
    <?php // echo $form->field($model, 'venue') ?>
    <?php // echo $form->field($model, 'start_at') ?>
    <?php // echo $form->field($model, 'end_at') ?>
    <?php // echo $form->field($model, 'tags') ?>
    <?php // echo $form->field($model, 'notes') ?>
    <?php // echo $form->field($model, 'status') ?>
    <?php // echo $form->field($model, 'created_at') ?>
    <?php // echo $form->field($model, 'created_by') ?>
    <?php // echo $form->field($model, 'updated_at') ?>
    <?php // echo $form->field($model, 'updated_by') ?>

    <div class="form-group">
        <?php echo Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?php echo Html::resetButton('Reset', ['class' => 'btn btn-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
