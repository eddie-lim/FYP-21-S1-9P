<?php

namespace tests\backend\_pages;

use tests\backend\AcceptanceTester;
use yii\helpers\Url;

/**
 * Represents login page
 */
class LoginPage
{
    
    public function login($actor, $username, $password)
    {
        $actor->fillField('#loginform-username',$username);
        $actor->fillField('#loginform-password',$password);
        $actor->click('login-button');
    }
}
