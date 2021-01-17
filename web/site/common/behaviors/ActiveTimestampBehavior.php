<?php

namespace common\behaviors;

use Yii;
use yii\base\Behavior;
use yii\web\User;
use yii\web\Controller;

/**
 * @author loy
 * Set last active timestamp
 */
class ActiveTimestampBehavior extends Behavior
{
    /**
     * @var string
     */
    public $attribute = 'active_at';

    public function events()
    {
        return [
            Controller::EVENT_BEFORE_ACTION => 'beforeAction'
        ];
    }


    public function beforeAction($event)
    {
        //print_r(Yii::$app->user->identity);
        //exit();

        $user = Yii::$app->user->identity;;
        if ($user != null) {
            $user->touch($this->attribute);
            $user->save(false);
        }

    }

}
