<?php

namespace common\models\query;

use common\models\User;
use yii\db\ActiveQuery;
use common\components\MyCustomActiveRecord;

/**
 * Class UserQuery
 * @package common\models\query
 * @author Eugene Terentev <eugene@terentev.net>
 */
class UserQuery extends ActiveQuery
{
    /**
     * @return $this
     */
    public function notDeleted()
    {
        $this->andWhere(['!=', 'status', MyCustomActiveRecord::STATUS_DISABLED]);
        return $this;
    }

    /**
     * @return $this
     */
    public function active()
    {
        $this->andWhere(['status' => MyCustomActiveRecord::STATUS_ENABLED]);
        return $this;
    }
}