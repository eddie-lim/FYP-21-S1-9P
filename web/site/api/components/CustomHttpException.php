<?php

namespace api\components;

use yii\web\HttpException;
use yii\web\ForbiddenHttpException;
use yii\web\UnauthorizedHttpException;
use common\components\Utility;

class CustomHttpException extends HttpException
{
    public $message = "msg";

    //error code
    const BAD_REQUEST = 400;
    const UNAUTHORIZED = 401;
    const FORBIDDEN = 403;
    const UNPROCESSABLE_ENTITY = 422;
    const TOO_MANY_REQUEST = 429;
    const SERVER_ERROR = 500;

    //message_key
    //const KEY_TOO_MANY_REQUEST = "too_many_request";
    //wrong password
    const KEY_INVALID_CREDENTIALS = "invalid_credentials";
    const KEY_INVALID_OR_EXPIRED_TOKEN = "invalid_or_expired_token";
    const KEY_ACCOUNT_DISABLED = "account_disabled";
    const KEY_ACCOUNT_OVER_MAX_LOGIN_ATTEMPT = "account_over_max_login_attempt";
    const KEY_ACCOUNT_SUSPENDED = "account_suspended";
    const KEY_EMAIL_ALREADY_VERIFIED = "email_already_verified";
    const KEY_EMAIL_NOT_REGISTERED = "email_not_registered";
    const KEY_EMAIL_NOT_VERIFIED = "email_not_verified";

    //const KEY_LOGIN_LIMIT_ACCOUNT_SUSPENDED = "login_limit_account_suspended";
    //under cooldown for resend email or token
    const KEY_WAIT_FOR_COOLDOWN = "wait_for_cooldown";
    const KEY_SYSTEM_UNDER_MAINTENANCE = "system_under_maintenance";
    //Cannot save to DB for whatever reason
    const KEY_UNEXPECTED_ERROR = "unexpected_error";


    //$message is string!!!
    public function __construct($message=null, $status=self::BAD_REQUEST, $code=0, \Exception $previous = null)
    {
        $msg = json_decode($message);
        $arr = $msg;
        if(!is_array($msg)){ // if not unprocessable entity (422)            
            $temp = json_decode(json_encode($arr), true); // to change from stdclass to array
            //$temp['message_key'] = $key;
            $message = json_encode($temp);
        }
        
        parent::__construct($status, $message, $code, $previous);
    }

    public static function internalServerError($msg) {
        $data = Utility::jsonifyError("", $msg, SELF::KEY_UNEXPECTED_ERROR);
        return new SELF($data, SELF::SERVER_ERROR);
    }


    public static function validationError($model) {
        $str = SELF::getSerialisedValidationError($model);
        return new CustomHttpException($str, SELF::UNPROCESSABLE_ENTITY);
    }


    private static function getSerialisedValidationError($model) {
        $result = [];

        if ( is_subclass_of($model, MyCustomActiveRecord::class) ) {
            foreach ($model->getFirstErrors() as $name => $error) {
                $temp = [
                    'field' => $name,
                    'message' => $error['message'],
                ];
                array_push($result, $temp);
            }
        } else {
            foreach ($model->getFirstErrors() as $name => $message) {
                //getErrorKey method only exist in MyCustomModel
                //$key = $model->getErrorkey($name);
                $key = method_exists($model, 'getErrorkey') ? $model->getErrorkey($name) : "";                
                $temp = [
                    'field' => $name,
                    'message' => $message,
                    'message_key' => $key,
                ];
                array_push($result, $temp);
            }
        }

        $e = json_encode($result);
        $e = preg_replace("/\n/", "", $e);
        //$e = preg_replace("\\", '', $e);
        //$e = str_replace("\\","",$e);
        return $e;        
    }




}






