<?php

namespace api\components;

use common\models\User;
use Yii;
use yii\filters\RateLimitInterface;

class ApiUserIdentity extends User implements RateLimitInterface
{
    public $allowance = 1;
    public $rate = 1;

    public function getRateLimit($request, $action) {
        return [$this->allowance, $this->rate];
    }

    public function loadAllowance($request, $action) {
        $a = $this->allowance;

        $allowance = Yii::$app->cache->getOrSet($this->getCacheKey('api_rate_allowance'), function () use ($a) {
            return $a;
        });
        $timestamp = Yii::$app->cache->getOrSet($this->getCacheKey('api_rate_timestamp'), function () {
            return time();
        });

        return [$allowance, $timestamp];
        //return [1, 1552745645];
    }

    public function getCacheKey($key) {
        return implode("_",[__CLASS__, $this->getId(), $key]);
    }

    public function saveAllowance($request, $action, $allowance, $timestamp) {
        Yii::$app->cache->set($this->getCacheKey('api_rate_allowance'), $allowance);
        Yii::$app->cache->set($this->getCacheKey('api_rate_timestamp'), $timestamp);
    }
}
