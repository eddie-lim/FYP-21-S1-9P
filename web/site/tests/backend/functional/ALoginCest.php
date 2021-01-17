<?php

use tests\backend\_pages\LoginPage;
use tests\backend\_pages\OtpPage;
use tests\backend\FunctionalTester as AT;

/* @var $scenario Codeception\Scenario */
class ALoginCest {

	public $loginPage;
	public $otpPage;

	public function _before(AT $I) {
		// sleep(5);
		//$this->loginPage = new LoginPage();
		//$this->otpPage = new OtpPage();
    }

    public function _after(AT $I) {

    }

 	/* public function login(AT $I) {
     *     $I->wantTo('try to login with invalid mobile number');
     *     $I->amOnPage('/login');
	   $this->loginPage->login($I, '65', 'webmaster1234');
	   if (method_exists($I, 'wait')) {
	   $I->wait(3); // only for selenium
	   }
	   $I->see('Mobile Number is invalid.');
     *     $I->seeInDatabase('user', ['mobile_number' => '97479576']);
     * } */

  //   public function login2(AT $I) {
  //       $I->wantTo('try to login with empty mobile number');
  //       $I->amOnPage('/login');
		// $this->loginPage->login($I, '65', '');
		// if (method_exists($I, 'wait')) {
		//     $I->wait(3); // only for selenium
		// }
		// $I->see('Mobile Number cannot be blank.');
  //   }

 	// public function login3(AT $I) {
  //       $I->amOnPage('/login');
  //       $I->wantTo('try to login with not existing user');
		// $this->loginPage->login($I, '65', '93732062');
		// if (method_exists($I, 'wait')) {
		//     $I->wait(3); // only for selenium
		// }
		// $I->see('No such user.');

  //       // $I->waitForElement(Product::$pageLogo);
  //       // $I->seeElement(Product::$pageLogo.' img');
  //   }

 	// public function login4(AT $I) {
  //       $I->wantTo('Login');
  //       $I->amOnPage('/login');
  //       $this->loginPage->login($I, '65', '93732061');

  //       if (method_exists($I, 'wait')) {
		//     $I->wait(3); // only for selenium
		// }
		// $I->see('One-Time Pin');
  //       // $I->waitForElement(Product::$pageLogo);
  //       // $I->seeElement(Product::$pageLogo.' img');
  //   }

  //   public function otp(AT $I) {
  //       $I->wantTo('try to login with empty otp');
  //       $I->amOnPage('/otp');
  //       $this->otpPage->login($I, '');

  //       if (method_exists($I, 'wait')) {
		//     $I->wait(3); // only for selenium
		// }
		// $I->see('token cannot be blank.');
  //       // $I->seeElement(Product::$pageLogo.' img');
  //   }

  //   public function otp2(AT $I) {
  //       $I->wantTo('try to login with wrong otp');
  //       $I->amOnPage('/otp');
  //       $this->otpPage->login($I, '111112');

  //       if (method_exists($I, 'wait')) {
		//     $I->wait(3); // only for selenium
		// }
		// $I->see('invalid token.');
		// // $I->see('DASHBOARD.');
  //       // $I->seeElement(Product::$pageLogo.' img');
  //   }

  //   public function otp3(AT $I) {
  //       $I->wantTo('enter valid otp');
  //       $I->amOnPage('/otp');
  //       $this->otpPage->login($I, '111111');

  //       if (method_exists($I, 'wait')) {
		//     $I->wait(3); // only for selenium
		// }
		// // $I->see('DASHBOARD.');
  //       // $I->seeElement(Product::$pageLogo.' img');
  //   }
}



// $I->amGoingTo('try to login with empty otp');
// $otpPage->login('');
// if (method_exists($I, 'wait')) {
//     $I->wait(3); // only for selenium
// }
// $I->see('token cannot be blank.');


// $I->amGoingTo('try to login with invalid otp');
// $otpPage->login('111112');
// if (method_exists($I, 'wait')) {
//     $I->wait(3); // only for selenium
// }
// $I->see('invalid token.');


// $I->amGoingTo('try to login with string value');
// $otpPage->login('aaaaaa');
// if (method_exists($I, 'wait')) {
//     $I->wait(3); // only for selenium
// }
// $I->see('invalid token.');
