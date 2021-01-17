<?php

use tests\backend\_pages\LoginPage;
use tests\backend\AcceptanceTester as AT;

/* @var $scenario Codeception\Scenario */
class LoginCest {
    public $loginPage;
    public $I;

    public function _before(AT $I) {
        $this->loginPage = new LoginPage();
    }

    public function _after() {
    }

    public function testLoginWithInvalidCredentials(AT $I)
    {
        $I->login('John Hendrix', 'wrongpass');
        $I->see('Incorrect username or password.');
    }

    public function testLoginWithValidCredentials(AT $I)
    {
        $I->login('John Hendrix', 'password');
        $I->see('yii2 starter kit', '//span[@class="brand-text font-weight-bold"]');
    }

    public function testLogout(AT $I)
    {
        $I->logout();
    }
}
