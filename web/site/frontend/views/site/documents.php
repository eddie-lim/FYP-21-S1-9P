<?php
/**
 * @var yii\web\View $this
 */
use yii\helpers\Html;
$this->title = Yii::$app->name;
?>
<div class="site-index w-100">
    <div class="">
    	<?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/project_requirement_document.pdf'], ['class' => 'btn btn-sm btn-success mt-3 mr-1', 'target'=>"_blank"]) ?>&nbsp;<i class="fas fa-question-circle"></i>&nbsp;Project Requirement Document
    </div>
    <div class="">
    	<?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/user_requirement_document.pdf'], ['class' => 'btn btn-sm btn-success mt-3 mr-1', 'target'=>"_blank"]) ?>&nbsp;<i class="fas fa-users"></i>&nbsp;User Requirement Document
    </div>
    <div class="">
    	<?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/technical_design_manual.pdf'], ['class' => 'btn btn-sm btn-success mt-3 mr-1', 'target'=>"_blank"]) ?>&nbsp;<i class="fas fa-cloud"></i>&nbsp;Technical Design Manual
    </div>
    <div class="">
    	<?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/user_manual.pdf'], ['class' => 'btn btn-sm btn-success mt-3 mr-1', 'target'=>"_blank"]) ?>&nbsp;<i class="fas fa-book"></i>&nbsp;User Manual
    </div>
    <div class="">
    	<?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/project_prototype_slides.pdf'], ['class' => 'btn btn-sm btn-success mt-3 mr-1', 'target'=>"_blank"]) ?>&nbsp;<i class="fas fa-file-powerpoint"></i>&nbsp;Project Prototype Slides
    </div>
    <div class="">
        <?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/project_progress_report.pdf'], ['class' => 'btn btn-sm btn-success mt-3 mr-1', 'target'=>"_blank"]) ?>&nbsp;<i class="fas fa-tasks"></i>&nbsp;Project Progress Report
    </div>
    <div class="">
        <?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/test_summary_and_plan.pdf'], ['class' => 'btn btn-sm btn-success mt-3 mr-1', 'target'=>"_blank"]) ?>&nbsp;<i class="fas fa-check-double"></i>&nbsp;Test Summary & Plan
    </div>
</div>
