<?php
/**
 * @var yii\web\View $this
 */
use yii\helpers\Html;
$this->title = Yii::$app->name;
?>
<div class="site-index w-100 pt-3">
    <h2>Phase 2 - Final Documents</h2>
    <div class="mt-3">
        <?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/final_documentation.pdf'], ['class' => 'btn btn-sm btn-success mr-1', 'target'=>"_blank"]) ?>&nbsp;<i class="fas fa-file-word"></i>&nbsp;Final Documentation
    </div>
    <div class="mt-3">
        <?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/final_presentation.pdf'], ['class' => 'btn btn-sm btn-success mr-1', 'target'=>"_blank"]) ?>&nbsp;<i class="far fa-file-powerpoint"></i>&nbsp;Final Presentation Slides
    </div>
    <div class="mt-3">
        <?php echo Html::a('<span class="fas fa-download fa-sm"></span>', 'https://drive.google.com/file/d/1MUrRG-nLreNMGnFk2mUIm2PEZbE8Afcf/view?usp=sharing', ['class' => 'btn btn-sm btn-success mr-1', 'target'=>"_blank"]) ?>&nbsp;<i class="fas fa-video"></i>&nbsp;Project Video
    </div>
    <hr/>
    <h2>Phase 1</h2>
    <div class="mt-3">
    	<?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/project_requirement_document.pdf'], ['class' => 'btn btn-sm btn-success mr-1', 'target'=>"_blank"]) ?>&nbsp;<i class="fas fa-question-circle"></i>&nbsp;Project Requirement Document
    </div>
    <div class="mt-3">
    	<?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/user_requirement_document.pdf'], ['class' => 'btn btn-sm btn-success mr-1', 'target'=>"_blank"]) ?>&nbsp;<i class="fas fa-users"></i>&nbsp;User Requirement Document
    </div>
    <div class="mt-3">
    	<?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/technical_design_manual.pdf'], ['class' => 'btn btn-sm btn-success mr-1', 'target'=>"_blank"]) ?>&nbsp;<i class="fas fa-cloud"></i>&nbsp;Technical Design Manual
    </div>
    <div class="mt-3">
    	<?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/user_manual.pdf'], ['class' => 'btn btn-sm btn-success mr-1', 'target'=>"_blank"]) ?>&nbsp;<i class="fas fa-book"></i>&nbsp;User Manual
    </div>
    <div class="mt-3">
    	<?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/project_prototype_slides.pdf'], ['class' => 'btn btn-sm btn-success mr-1', 'target'=>"_blank"]) ?>&nbsp;<i class="fas fa-file-powerpoint"></i>&nbsp;Project Prototype Slides
    </div>
    <div class="mt-3">
        <?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/project_progress_report.pdf'], ['class' => 'btn btn-sm btn-success mr-1', 'target'=>"_blank"]) ?>&nbsp;<i class="fas fa-tasks"></i>&nbsp;Project Progress Report
    </div>
    <div class="mt-3">
        <?php echo Html::a('<span class="fas fa-download fa-sm"></span>', ['/doc/test_summary_and_plan.pdf'], ['class' => 'btn btn-sm btn-success mr-1', 'target'=>"_blank"]) ?>&nbsp;<i class="fas fa-check-double"></i>&nbsp;Test Summary & Plan
    </div>
</div>
