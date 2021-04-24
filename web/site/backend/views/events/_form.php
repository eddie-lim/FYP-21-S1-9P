<?php

use yii\helpers\Html;
use yii\helpers\ArrayHelper;
use yii\bootstrap4\ActiveForm;
use kartik\select2\Select2;
use common\models\UniversityPartners;
use common\components\MyCustomActiveRecord;
use kartik\widgets\DateTimePicker;
use yii\web\JsExpression;

/**
 * @var yii\web\View $this
 * @var common\models\Events $model
 * @var yii\bootstrap4\ActiveForm $form
 */
?>

<div class="events-form">
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
                        <?php echo $form->field($model, 'type')->widget(Select2::classname(),
                            [
                                // 'theme' => Select2::THEME_MATERIAL,
                                // 'data' => $model->getCommonTags(),
                                'showToggleAll' => false,
                                'options' => [
                                    'placeholder' => 'Select existing event type or add your own ...',
                                    // 'multiple' => true,
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
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'session')->textInput(['maxlength' => true]) ?>
                    </div>
                    <div class="col-lg-4 col-xs-12">
                        <?php echo $form->field($model, 'thumbnail_url')->textInput(['maxlength' => true]) ?>
                    </div>
                    <div class="col-lg-6 col-xs-12">
                        <?php echo $form->field($model, 'name')->textInput(['maxlength' => true]) ?>
                    </div>
                    <div class="col-lg-6 col-xs-12">
                        <?php echo $form->field($model, 'venue')->textInput(['maxlength' => true]) ?>
                    </div>
                    <div class="col-lg-6 col-xs-12">
                        <?php echo $form->field($model, 'start_at')->widget(DateTimePicker::class, [
                            'type' => DateTimePicker::TYPE_COMPONENT_PREPEND,
                            'pluginOptions' => [
                                'autoclose'=>true,
                                'format' => 'dd-M-yyyy hh:ii'
                            ]
                        ]); ?>
                    </div>
                    <div class="col-lg-6 col-xs-12">
                        <?php echo $form->field($model, 'end_at')->widget(DateTimePicker::class, [
                            'type' => DateTimePicker::TYPE_COMPONENT_PREPEND,
                            'pluginOptions' => [
                                'autoclose'=>true,
                                'format' => 'dd-M-yyyy hh:ii'
                            ]
                        ]); ?>
                    </div>
                    <div class="col-lg-12 col-xs-12">
                        <?php echo $form->field($model, 'description')->textarea(['rows' => 3]) ?>
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
                                // 'data' => $model->getCommonTags(),
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
