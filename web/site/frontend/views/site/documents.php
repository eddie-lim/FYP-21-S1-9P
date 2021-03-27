<?php
/**
 * @var yii\web\View $this
 */
use yii\helpers\Html;
$this->title = Yii::$app->name;
?>
<div class="site-index w-100">
    <div class="">
    	<?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/project_requirement_document.pdf'], ['class' => 'btn btn-sm btn-success mt-3 mr-1', 'target'=>"_blank"]) ?> Project Requirement Document
    </div>
    <div class="">
    	<?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/user_requirement_document.pdf'], ['class' => 'btn btn-sm btn-success mt-3 mr-1', 'target'=>"_blank"]) ?> User Requirement Document
    </div>
    <div class="">
    	<?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/technical_design_manual.pdf'], ['class' => 'btn btn-sm btn-success mt-3 mr-1', 'target'=>"_blank"]) ?> Technical Design Manual
    </div>
    <div class="">
    	<?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/preliminary_user_manual.pdf'], ['class' => 'btn btn-sm btn-success mt-3 mr-1', 'target'=>"_blank"]) ?> Preliminary User Manual
    </div>
    <div class="">
    	<?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/project_prototype_slides.pdf'], ['class' => 'btn btn-sm btn-success mt-3 mr-1', 'target'=>"_blank"]) ?> Project Prototype Slides
    </div>
    <div class="">
    	<?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/project_progress_report.pdf'], ['class' => 'btn btn-sm btn-success mt-3 mr-1', 'target'=>"_blank"]) ?> Project Progress Report
    </div>
</div>
