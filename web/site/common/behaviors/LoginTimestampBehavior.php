<?php

namespace common\behaviors;

use yii\base\Behavior;
use yii\web\User;
use common\models\SystemLoginHistory;

/**
 * @author Eugene Terentev <eugene@terentev.net>
 */
class LoginTimestampBehavior extends Behavior
{
    /**
     * @var string
     */
    public $attribute = 'login_at';


    /**
     * @inheritdoc
     */
    public function events()
    {
        return [
            User::EVENT_AFTER_LOGIN => 'afterLogin'
        ];
    }

    /**
     * @param $event \yii\web\UserEvent
     */
    public function afterLogin($event)
    {
        $user = $event->identity;
        $user->touch($this->attribute);
        $user->save(false);
        
        $loginHistory = SystemLoginHistory::makeModel();
        $loginHistory->save();
    }
}
