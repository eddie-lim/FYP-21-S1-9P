<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $form yii\widgets\ActiveForm */
/* @var $model \frontend\modules\user\models\ResetPasswordForm */

$this->title = Yii::t('frontend', 'Reset password');
if (!isset($msg)) $msg = "";

?>
<div class="site-reset-password">
    <div class="container container-sm">
        <div class="overview w-50">
                <h3 class="menu-title menu-title-tight"><?php echo \yii\helpers\HtmlPurifier::process($this->title) ?></h3>
                <div><?php echo \yii\helpers\HtmlPurifier::process($msg); ?></div>
                <br>


                <?php $form = ActiveForm::begin(['id' => 'reset-password-form']); ?>
                    <?php echo $form->field($model, 'password')->passwordInput() ?>
                    <?php echo $form->field($model, 'password_confirm')->passwordInput() ?>

                    <br>
                    <div class="form-group text-center btn-success rounded">
                        <?php echo Html::submitButton('Save', ['class' => 'w-100 btn submit-btn btn-custom']) ?>
                    </div>
                <?php ActiveForm::end(); ?>



        </div>
    </div>
</div>
