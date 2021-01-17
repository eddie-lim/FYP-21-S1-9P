<?php
namespace backend\widgets;

use Yii;
use yii\base\InvalidParamException;
use yii\base\Widget;
use yii\helpers\ArrayHelper;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\web\View;
use rmrevin\yii\fontawesome\FAS;

class MyInfoBox extends Widget
{
    public $bgColor = "bg-warning";
    public $link = "";
    public $value = "";
    public $icon = "";
    public $title = "";
    // public $description = "";

    public function init()
    {
        parent::init();        
    }

    public function run()
    {
        $icon_element = FAS::icon($this->icon);
        $anchor_element = $this->link ? '<a href="'.Url::to($this->link).'" class="small-box-footer">More info'.FAS::icon("arrow-circle-right").'</a>' :'';
        $content = <<<HEREDOC
        <div class="small-box $this->bgColor">
            <div class="inner">
                <h3>
                    $this->value
                </h3>
                <p>
                    $this->title
                </p>
            </div>
            <div class="icon">
                $icon_element
            </div>
            $anchor_element
        </div>
HEREDOC;

        return $content;
    }
}
