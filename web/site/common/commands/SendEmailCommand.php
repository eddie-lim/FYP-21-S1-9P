<?php

namespace common\commands;

use yii\base\BaseObject;
use yii\swiftmailer\Message;
use trntv\bus\interfaces\SelfHandlingCommand;
use yii\web\ServerErrorHttpException;
use Yii;

/**
 * @author Eugene Terentev <eugene@terentev.net>
 */
class SendEmailCommand extends BaseObject implements SelfHandlingCommand
{
    /**
     * @var mixed
     */
    public $from;
    /**
     * @var mixed
     */
    public $to;
    /**
     * @var string
     */
    public $subject;
    /**
     * @var string
     */
    public $view;
    /**
     * @var array
     */
    public $params;
    /**
     * @var string
     */
    public $body;
    /**
     * @var bool
     */
    public $html = true;

    /**
     * Command init
     */
    public function init()
    {
        $this->from = $this->from ?: [\Yii::$app->params['robotEmail'] => \Yii::$app->params['emailName']];
        //->setFrom(['john@doe.com' => 'John Doe'])
    }

    /**
     * @return bool
     */
    public function isHtml()
    {
        return (bool) $this->html;
    }

    /**
     * @param \common\commands\SendEmailCommand $command
     * @return bool
     */
    public function handle($command)
    {
        //echo "executing email queue";
        if (!$command->body) {
            $message = \Yii::$app->mailer->compose($command->view, $command->params);
        } else {
            $message = new Message();
            if ($command->isHtml()) {
                $message->setHtmlBody($command->body);
            } else {
                $message->setTextBody($command->body);
            }
        }
        $message->setFrom($command->from);
        $message->setTo($command->to ?: \Yii::$app->params['robotEmail']);
        $message->setSubject($command->subject);
        $result = $message->send();
        \Yii::info(json_encode($result));
        if($result != 1){
            return false;
        } else {
            //echo "...success\n";
            return true;
        }
    }
}