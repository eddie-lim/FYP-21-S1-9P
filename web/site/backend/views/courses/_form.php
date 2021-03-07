<?php

use yii\helpers\Html;
use yii\bootstrap4\ActiveForm;

/**
 * @var yii\web\View $this
 * @var common\models\Courses $model
 * @var yii\bootstrap4\ActiveForm $form
 */
?>

<div class="courses-form">
    <?php $form = ActiveForm::begin(); ?>
        <div class="card">
            <div class="card-body">
                <?php echo $form->errorSummary($model); ?>

                <?php echo $form->field($model, 'school_id')->textInput() ?>
                <?php echo $form->field($model, 'name')->textInput(['maxlength' => true]) ?>
                <?php echo $form->field($model, 'mode_of_study')->dropDownList([ 'part_time' => 'Part time', 'full_time' => 'Full time', 'part_time_and_full_time' => 'Part time and full time', ], ['prompt' => '']) ?>
                <?php echo $form->field($model, 'disciplines')->textInput(['maxlength' => true]) ?>
                <?php echo $form->field($model, 'sub_disciplines')->textInput(['maxlength' => true]) ?>
                <?php echo $form->field($model, 'academic_level')->textInput(['maxlength' => true]) ?>
                <?php echo $form->field($model, 'introduction')->textarea(['rows' => 6]) ?>
                <?php echo $form->field($model, 'programme_structure')->textarea(['rows' => 6]) ?>
                <?php echo $form->field($model, 'admission_criteria')->textarea(['rows' => 6]) ?>
                <?php echo $form->field($model, 'fees')->textarea(['rows' => 6]) ?>
                <?php echo $form->field($model, 'exemptions')->textarea(['rows' => 6]) ?>
                <?php echo $form->field($model, 'profiles')->textarea(['rows' => 6]) ?>
                <?php echo $form->field($model, 'assessments_exams')->textarea(['rows' => 6]) ?>
                <?php echo $form->field($model, 'notes')->textarea(['rows' => 6]) ?>
                <?php echo $form->field($model, 'status')->dropDownList([ 'enabled' => 'Enabled', 'disabled' => 'Disabled', ], ['prompt' => '']) ?>
                <?php echo $form->field($model, 'created_at')->textInput() ?>
                <?php echo $form->field($model, 'created_by')->textInput() ?>
                <?php echo $form->field($model, 'updated_at')->textInput() ?>
                <?php echo $form->field($model, 'updated_by')->textInput() ?>
                
            </div>
            <div class="card-footer">
                <?php echo Html::submitButton($model->isNewRecord ? 'Create' : 'Update', ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
            </div>
        </div>
    <?php ActiveForm::end(); ?>
</div>
