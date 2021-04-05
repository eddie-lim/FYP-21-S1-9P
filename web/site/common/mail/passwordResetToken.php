<?php
use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $user common\models\User */
/* @var $token string */

$resetLink = Yii::$app->urlManagerFrontend->createAbsoluteUrl(['/reset-password', 'token' => $token]);
?>
Reset Your Password
<br>
<br>We have received a request to have your password reset for your account. If you did not make this request, please ignore this email. 
<br><br>Please click on the link below to reset your password:
<br><?php echo Html::a(Html::encode($resetLink), $resetLink) ?>
<br>
<br>Regards,
<br>FYP-21-S1-9P Team