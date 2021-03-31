<?php
namespace api\components;

use Yii;
use yii\base\Component;
use yii\base\InvalidConfigException;
use yii\helpers\Json;
use common\models\User;
use common\models\SysOAuthAuthorizationCode;
use common\models\SysOAuthAccessToken;
use common\components\Utility;

/**
 * Class for common API functions
 */
class Api extends Component
{

    public function sendFailedResponseData($data, $error_code = 400) {
        //echo $data["message"];
        //exit;

        $this->setHeader($error_code);

        $r = [];
        $r['status'] = $error_code;
        $r['text'] = SELF::_getStatusCodeMessage($error_code);
        //$r['time'] =  date('Y-m-d H:i:s', time());
        //$r['data'] = json_decode($data["message"]);
        $r['data'] = json_decode($data["message"]);

        //echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        $response = Yii::$app->response;
        $response->format = \yii\web\Response::FORMAT_JSON;
        $response->data = $r;

        Yii::$app->end();
    }

    public function sendSuccessResponse($data = false) {
        $this->setHeader(200);

        // $r = [];
        // $r['status'] = 200;
        // $r['text'] = 'OK';
        // //$r['time'] =  date('Y-m-d H:i:s', time());
        // $r['data'] = $data;

        // //echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        $response = Yii::$app->response;
        $response->format = \yii\web\Response::FORMAT_JSON;
        // $response->data = $r;
        $response->data = $data;

        Yii::$app->end();
    }

    public function sendSuccessEncryptResponse($data = false) {
        $this->setHeader(200);

        $r = [];
        $r['status'] = 200;
        $r['text'] = 'OK';
        //$r['time'] =  date('Y-m-d H:i:s', time());
        $r['data'] = $data;

        $d = json_encode($r, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        $e = Utility::encrypt($d);

        $response = Yii::$app->response;
        $response->format = \yii\web\Response::FORMAT_RAW;
        $response->data = $e;

        Yii::$app->end();
    }   

    protected function setHeader($status)
    {
        $text = $this->_getStatusCodeMessage($status);

        Yii::$app->response->setStatusCode($status, $text);

        $status_header = 'HTTP/1.1 ' . $status . ' ' . $text;
        $content_type = "application/json; charset=utf-8";

        header($status_header);
        header('Content-type: ' . $content_type);
        //header('X-Powered-By: ' . "NParks <www.nparks.gov.sg>");
        header('Access-Control-Allow-Origin:*');
    }

    protected function _getStatusCodeMessage($status)
    {
        // these could be stored in a .ini file and loaded
        // via parse_ini_file()... however, this will suffice
        // for an example
        $codes = Array(
            200 => 'OK',
            400 => 'Bad Request',
            401 => 'Unauthorized',
            402 => 'Payment Required',
            403 => 'Forbidden',
            404 => 'Not Found',
            422 => 'Unprocessable entity',
            429 => 'Too many request',
            500 => 'Internal Server Error',
            501 => 'Not Implemented',
        );
        return (isset($codes[$status])) ? $codes[$status] : '';
    }
    
    public function deleteAllUserAccesstokens(){
        SysOAuthAccessToken::deleteAll();
    }

    public function deleteUserAuthorizationCodes($user_id) {
        SysOAuthAuthorizationCode::deleteAll('user_id = '.$user_id);
    }

    public function createAuthorizationCode($user_id)
    {
        $model = new SysOAuthAuthorizationCode;
        $model->generateNewCode($user_id);
        $model->save();

        return ($model);
    }

    public function getUserIdFromAuthorizationCode($authorization_code) {
        $auth_code = SysOAuthAuthorizationCode::findOne(['code' => $authorization_code]);
        return $auth_code->user_id;
    }

    public function deleteUserAccesstokens($user_id) {
        SysOAuthAccessToken::deleteAll('user_id = '.$user_id);
    }

    public function createAccesstoken($authorization_code, $user_id)
    {
        //$auth_code = SysOAuthAuthorizationCode::findOne(['code' => $authorization_code]);
        $model = new SysOAuthAccessToken();
        $model->generateNewToken($user_id, $authorization_code);
        $model->save();

        return ($model);
    }
}