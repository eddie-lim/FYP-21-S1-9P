<?php

use kartik\select2\Select2;
use yii\helpers\Html;
use yii\helpers\ArrayHelper;
use yii\bootstrap4\ActiveForm;
use common\models\User;
use common\models\UniversityPartners;
use common\components\MyCustomActiveRecord;

/* @var $this yii\web\View */
/* @var $model backend\models\UserForm */
/* @var $form yii\bootstrap4\ActiveForm */
/* @var $roles yii\rbac\Role[] */
/* @var $permissions yii\rbac\Permission[] */
?>

<div class="user-form">
    <?php $form = ActiveForm::begin() ?>
        <div class="card">
            <div class="card-body row">
                <div class="col-lg-6 col-xs-12">
                    <?php echo $form->field($model, 'firstname') ?>
                </div>
                <div class="col-lg-6 col-xs-12">
                    <?php echo $form->field($model, 'lastname') ?>
                </div>
                <div class="col-lg-6 col-xs-12">
                    <?php echo $form->field($model, 'email') ?>
                </div>
                <div class="col-lg-6 col-xs-12">
                    <?php echo $form->field($model, 'password')->passwordInput() ?>
                </div>
                <div class="col-lg-6 col-xs-12">
                    <?php echo $form->field($model, 'school_id')->widget(Select2::classname(), [
                       'data' => ArrayHelper::map(UniversityPartners::find()->where(['status'=>MyCustomActiveRecord::STATUS_ENABLED])->all(), 'id', 'name'),
                        'options' => ['placeholder' => 'Select University Partner ...'],
                        'pluginOptions' => [
                            'allowClear' => true ],
                    ]) ?>
                </div>
                <div class="col-lg-6 col-xs-12">
                    <?php echo $form->field($model, 'roles')->checkboxList($roles) ?>
                </div>
            </div>
            <div class="card-footer">
                <?php echo Html::submitButton(Yii::t('backend', 'Save'), ['class' => 'btn btn-primary', 'name' => 'signup-button']) ?>
            </div>
        </div>
    <?php ActiveForm::end() ?>
</div>
