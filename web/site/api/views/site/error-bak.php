<?php


$code = property_exists($exception, 'statusCode') ? $exception->statusCode : 500;
echo json_encode(array('status' => 0, 'error_code' => $code, 'errors' => $message, "kkn"=>"ccb"), JSON_PRETTY_PRINT);

?>

<h3>
mother sucker!
</h3>

<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $name string */
/* @var $message string */
/* @var $exception Exception */
//$this->context->layout = '@app/views/layouts/default';
$this->title = $name;

?>
<div class="site-error">
    <div class="container container-sm">
        <h1 class="error-alert"><?php echo Html::encode($this->title) ?></h1>
        <i class="error-alert">
            <?php echo nl2br(Html::encode($message)) ?>
        </i>
        <br><br>
        <p><?php echo Yii::t('frontend', 'The above error occurred while the web server was processing your request.'); ?>
        <br>
        <?php echo Yii::t('frontend', 'Please contact us if you think this is a server error. Thank you.'); ?>
        </p>
    </div>

</div>
