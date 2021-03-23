<?php

use yii\helpers\Html;
use yii\bootstrap4\ActiveForm;

/**
 * @var yii\web\View $this
 * @var common\models\Courses $model
 * @var yii\bootstrap4\ActiveForm $form
 */
?>

<div class="courses-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?php echo $form->field($model, 'id') ?>
    <?php echo $form->field($model, 'school_id') ?>
    <?php echo $form->field($model, 'name') ?>
    <?php echo $form->field($model, 'mode_of_study') ?>
    <?php echo $form->field($model, 'disciplines') ?>
    <?php // echo $form->field($model, 'sub_disciplines') ?>
    <?php // echo $form->field($model, 'academic_level') ?>
    <?php // echo $form->field($model, 'introduction') ?>
    <?php // echo $form->field($model, 'programme_structure') ?>
    <?php // echo $form->field($model, 'admission_criteria') ?>
    <?php // echo $form->field($model, 'fees') ?>
    <?php // echo $form->field($model, 'exemptions') ?>
    <?php // echo $form->field($model, 'profiles') ?>
    <?php // echo $form->field($model, 'assessments_exams') ?>
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
