<?php
namespace backend\widgets;

use yii\base\Widget;
use yii\helpers\ArrayHelper;
use yii\helpers\Html;
use yii\helpers\Url;

/**
 * Class Menu
 * @package backend\components\widget
 */
class TabMenuUserWidget extends Widget
{
    public $page = "all";

    public function init()
    {
        parent::init();        
    }

    public function run()
    {
        $active1 = $active2 = $active3 = $active4 = "";
        if ($this->page == "all") {
            $active1 = "active";
        } else if ($this->page == "sim-staff") {
            $active2 = "active";
        } else if ($this->page == "university-partners") {
            $active3 = "active";
        } else if ($this->page == "student") {
            $active4 = "active";
        }
        
        $link1 =  Url::to(["user/index"]);
        $link2 =  Url::to(["user/sim-staff"]);        
        $link3 =  Url::to(["user/university-partners"]);  
        $link4 =  Url::to(["user/student"]);  
        
        $content = <<<HEREDOC
<ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link $active1" href="$link1">All</a>
  </li>
  <li class="nav-item">
    <a class="nav-link $active2" href="$link2">SIM Staff</a>
  </li>
  <li class="nav-item">
    <a class="nav-link $active3" href="$link3">University Partner Staff</a>
  </li>
  <li class="nav-item">
    <a class="nav-link $active4" href="$link4">Student</a>
  </li>
</ul>
HEREDOC;

//

        //$this->registerClientScript();
        return $content;
    }
}
