<?php
use common\components\MyCustomBadRequestException;



/* @var $exception \yii\web\HttpException|\Exception */
/* @var $handler \yii\web\ErrorHandler */
if ($exception instanceof \yii\web\HttpException) {
    $code = $exception->statusCode;
} else {
    $code = $exception->getCode();
}
$name = $handler->getExceptionName($exception);
if ($name === null) {
    $name = 'Error';
}
if ($code) {
    $name .= " (#$code)";
}

if ($exception instanceof \yii\base\UserException) {
	$message = $exception->getMessage();
} else {
    $message = 'An internal server error occurred.';
}

$errorData = [];
$errorData["code"] = $code;
$errorData["name"] = $name;

$errorData["message"] = $message;

Yii::$app->api->sendFailedResponseData($errorData, $code);

/*
$data = [];
$data['status'] = 0;
$data['data'] = $errorData;
echo json_encode($data, JSON_PRETTY_PRINT);
*/

?>
