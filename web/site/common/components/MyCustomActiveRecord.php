<?php
namespace common\components;

use Yii;
use \yii\db\Expression;
use trntv\filekit\behaviors\UploadBehavior;
use yii\behaviors\TimestampBehavior;
use yii\behaviors\BlameableBehavior;
use common\behaviors\MyAuditTrailBehavior;
use yii\helpers\ArrayHelper;


class MyCustomActiveRecord extends \yii\db\ActiveRecord {
    const STATUS_ENABLED = "enabled";
    const STATUS_DISABLED = "disabled";

    public $upload_file;

    public function init() {
        if (!isset(Yii::$app->controller) || is_null(Yii::$app->controller)){
            // $this->detachBehavior('timestamp');
            // $this->detachBehavior('blame');
            $this->detachBehavior('auditTrail');
        }
        if(property_exists($this,'status') && !method_exists($this,'search')) {
            $this->status = SELF::STATUS_ENABLED;
        }
        parent::init();

    }
    
    public function behaviors()
    {
        return array_merge(parent::behaviors(), [
            "timestamp" => TimestampBehavior::className(),
            "blame" => BlameableBehavior::className(),
            "upload" =>
            [
                'class' => UploadBehavior::className(),
                'attribute' => 'upload_file',
                'pathAttribute' => 'path',
                'baseUrlAttribute' => 'base_url'
            ],
            "auditTrail" => MyAuditTrailBehavior::className(),  
        ]);
    }
    public function rules()
    {
        return array_merge(parent::rules(), [
            [['upload_file'], 'safe'] //important for upload!!
        ]);
    }

    public static function deleteStatuses()
    {
        return [
            self::STATUS_ENABLED => 'Enabled',
            self::STATUS_DISABLED => 'Disabled'
        ];
    }

    static public function getStatusHtml($model) {
        $m = $model;
        if ($m->delete_status == SELF::STATUS_DISABLED) {
            $html = "<i class='text-danger fas fa-circle'></i>";
        } else if ($m->delete_status == SELF::STATUS_ENABLED) {
            $html = "<i class='text-success fas fa-circle'></i>";
        } 
        return $html;
    }
    
    static public function toObjectArray($models) {
        $d = [];
        foreach ($models as $m) {
            $o = $m->toObject();
            $d[] = $o;
        }
        return $d;
    }

    private function myfunction(&$value,$key){
        $value=1;
    }

    public static function getCommonAttr($attr){
        // var_dump(static::find()->select([$attr])->asArray()->all()); exit();
        $all_tags = ArrayHelper::map(static::find()->select([$attr])->asArray()->all(), $attr, $attr);
        $new = [];
        foreach ($all_tags as $value) {
            $val = json_decode(trim($value));
            if(is_array($val)){
                foreach ($val as $v) {
                    if(!empty($v) && isset($v)){
                        $new[] = $v;
                    }
                }
            } else if(!empty($value) && isset($value) && $value !== '""'){
                $new[] = $value;
            }
        }
        $unique = array_unique($new);
        sort($unique);
        // var_dump($new); exit();

        return $unique;
    }


}
