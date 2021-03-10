<?php

$errorData = [];
$errorData["code"] = 500;
$errorData["name"] = "Internal Server Error";

if (YII_DEBUG) {
    $name = $handler->getExceptionName($exception);
    $message = $handler->htmlEncode($exception->getMessage());
    $trace = $handler->renderCallStack($exception);
    //$errorData["message"] = $name . ' ' . $message . ' ' .$trace;
    $errorData["message"] = $name . ' ' . $message;
    //echo '<h3>' . $name . '</h3><h4>' . $message . '</h4> ' .$trace;
} else {
    $errorData["message"] = 'An internal server error occurred.';
}

Yii::$app->api->sendFailedResponseData($errorData, 500);


?>
