<?php

namespace tests\backend\_pages;

use tests\backend\AcceptanceTester;
use yii\helpers\Url;

/**
 * Represents login page
 */
class UserPage
{
    /** @var string */
    public $route = '/user/index';
    /** @var AcceptanceTester */
    protected $actor;

    /**
     * LoginPage constructor.
     * @param $actor
     */
    public function __construct($actor)
    {
        $this->actor = $actor;
        $this->actor->amOnPage(Url::to($this->route));
    }

    /**
     * @param $actor
     * @return LoginPage
     */
    public static function openBy($actor)
    {
        return new self($actor);
    }

}
