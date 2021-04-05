<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;
use common\models\form\PasswordResetRequestForm;

/* @var $this yii\web\View */
/* @var $form yii\widgets\ActiveForm */
/* @var $model \frontend\modules\user\models\PasswordResetRequestForm */

$this->title =  Yii::t('frontend', 'Reset password');
//$this->params['breadcrumbs'][] = $this->title;
//<h4><center><?php print_r($model->getErrors()['token'][0]);</center></h4>
?>
<div class="site-request-password-reset">
    <div class="container container-sm">
        <div class="overview">
                <h1 class="text-danger"><center>Invalid Token</center></h1>
                <p class="text-center">Token is invalid or already expired.</p>
        </div>
    </div>
</div>
