<?php
namespace api\components;

use yii\filters\auth\HttpHeaderAuth;
use api\components\CustomHttpException;
use common\components\Utility;

class HttpBearerAuth extends HttpHeaderAuth
{
    public $header = 'Authorization';
    public $pattern = '/^Bearer\s+(.*?)$/';
    public $realm = 'api';

    public function challenge($response) {
        $response->getHeaders()->set('WWW-Authenticate', "Bearer realm=\"{$this->realm}\"");
    }

    public function handleFailure($response) {
        $str = Utility::jsonifyError("credentials", "Your request was made with invalid credentials.", CustomHttpException::KEY_INVALID_CREDENTIALS);
        throw new CustomHttpException($str, CustomHttpException::UNAUTHORIZED);
    }
}