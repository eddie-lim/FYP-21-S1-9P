<?php

namespace common\components;

use common\components\MyCustomActiveRecord;
/**
 * Class UserTokenQuery
 * @package common\models\query
 * @author Loy
 */
class MyCustomActiveRecordQuery extends \yii\db\ActiveQuery
{
    public function active()
    {
        $this->andWhere(['delete_status' => MyCustomActiveRecord::DELETE_STATUS_ENABLED]);
        return $this;
    }

    public function today()
    {
        $this->andWhere(['>=', 'created_at', strtotime('today midnight')]);
        $this->andWhere(['<', 'created_at', strtotime('tomorrow midnight')]);
        return $this;
    }
}