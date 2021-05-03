<?php

use yii\helpers\Html;
use yii\helpers\ArrayHelper;
use yii\bootstrap4\ActiveForm;
use kartik\select2\Select2;
use common\models\Courses;
use common\models\UniversityPartners;
use common\components\MyCustomActiveRecord;
use yii\web\JsExpression;

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
                <div class="row">
                    <?php if(empty(Yii::$app->user->identity->userProfile->school_id)): ?>
                        <div class="col-lg-4 col-xs-12">
                            <?php echo $form->field($model, 'school_id')->widget(Select2::classname(), [
                               'data' => ArrayHelper::map(UniversityPartners::find()->where(['status'=>MyCustomActiveRecord::STATUS_ENABLED])->all(), 'id', 'name'),
                                'options' => ['placeholder' => 'Select University Partner ...'],
                                'pluginOptions' => [
                                    'allowClear' => true ],
                            ]) ?>
                        </div>
                    <?php endif; ?>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'name')->textInput(['maxlength' => true]) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'mode_of_study')->dropDownList(Courses::getAllModeOfStudy(), ['prompt' => '']) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'disciplines')->textInput(['maxlength' => true]) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'sub_disciplines')->textInput(['maxlength' => true]) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'academic_level')->textInput(['maxlength' => true]) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'thumbnail_url')->textInput(['maxlength' => true]) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'introduction')->textarea(['rows' => 3]) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'programme_structure')->textarea(['rows' => 3]) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'admission_criteria')->textarea(['rows' => 3]) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'fees')->textarea(['rows' => 3]) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'exemptions')->textarea(['rows' => 3]) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'profiles')->textarea(['rows' => 3]) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'assessments_exams')->textarea(['rows' => 3]) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'application')->textarea(['rows' => 3]) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'course_start_end_date')->textarea(['rows' => 3]) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'scholarships_award')->textarea(['rows' => 3]) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'overview')->textarea(['rows' => 3]) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'entry_qualification')->widget(Select2::classname(),
                            [
                                // 'theme' => Select2::THEME_MATERIAL,
                                'data' => $model->getCommonAttr('entry_qualification'),
                                'showToggleAll' => false,
                                'options' => [
                                    'placeholder' => 'Select existing entry qualification or add your own ...',
                                    'multiple' => true,
                                ],
                                'pluginOptions' => [
                                    'tags' => true,
                                    'tokenSeparators' => [ ',' ],
                                    'maximumInputLength' => 21,
                                    'allowClear' => true,
                                    'createTag' => new JsExpression("function({ term, data }) {
                                        return { id: term.toLowerCase(), text: term.toLowerCase() };
                                    }")
                                ],
                            ]
                        ); ?>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'notes')->textarea(['rows' => 3]) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'tags')->widget(Select2::classname(),
                            [
                                'theme' => Select2::THEME_MATERIAL,
                                'data' => $model->getCommonAttr('tags'),
                                'showToggleAll' => false,
                                'options' => [
                                    'placeholder' => 'Select common tags or add your own ...',
                                    'multiple' => true,
                                ],
                                'pluginOptions' => [
                                    'tags' => true,
                                    'tokenSeparators' => [ ',', ' ' ],
                                    'maximumInputLength' => 15,
                                    'allowClear' => true,
                                    'createTag' => new JsExpression("function({ term, data }) {
                                        return { id: term.toLowerCase(), text: term.toLowerCase() };
                                    }")
                                ],
                            ]
                        ); ?>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <?php echo Html::submitButton($model->isNewRecord ? 'Create' : 'Update', ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
            </div>
        </div>
    <?php ActiveForm::end(); ?>
</div>
