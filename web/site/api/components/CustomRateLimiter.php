<?php
namespace api\components;

use common\components\Utility;
use yii\filters\RateLimiter;
use yii\web\TooManyRequestsHttpException;
use api\components\CustomHttpException;

class CustomRateLimiter extends RateLimiter
{
    public function checkRateLimit($user, $request, $response, $action)
    {
        list($limit, $window) = $user->getRateLimit($request, $action);
        list($allowance, $timestamp) = $user->loadAllowance($request, $action);

        $current = time();

        $allowance += (int) (($current - $timestamp) * $limit / $window);
        if ($allowance > $limit) {
            $allowance = $limit;
        }

        if ($allowance < 1) {
            $user->saveAllowance($request, $action, 0, $current);
            $this->addRateLimitHeaders($response, $limit, 0, $window);
            /*Edited by Eddie for new API error response*/
            throw new CustomHttpException(Utility::jsonifyError("rate_limiter", $this->errorMessage), CustomHttpException::TOO_MANY_REQUEST, CustomHttpException::TOO_MANY_REQUEST_KEY);
        }

        $user->saveAllowance($request, $action, $allowance - 1, $current);
        $this->addRateLimitHeaders($response, $limit, $allowance - 1, (int) (($limit - $allowance + 1) * $window / $limit));
    }
}