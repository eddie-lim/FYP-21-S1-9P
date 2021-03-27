<?php
/**
 * @var yii\web\View $this
 */
use yii\helpers\Html;
$this->title = Yii::$app->name;
?>
<div class="site-index">
    <div class="card-body p-0 mt-3">
        <div class="tab-pane fade show active" id="minutes" role="tabpanel" aria-labelledby="minutes-tab">
			<ul class="nav nav-pills flex-column col-2 d-inline-block" style="vertical-align:top;" id="myTab" role="tablist">
				<!-- <li class="nav-item">
					<a class="nav-link active" id="meeting11-tab" data-toggle="tab" href="#meeting11" role="tab" aria-controls="meeting11" aria-selected="false">Meeting 11</a>
				</li> -->
				<li class="nav-item">
					<a class="nav-link active" id="meeting10-tab" data-toggle="tab" href="#meeting10" role="tab" aria-controls="meeting10" aria-selected="false">Meeting 10</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="meeting9-tab" data-toggle="tab" href="#meeting9" role="tab" aria-controls="meeting9" aria-selected="false">Meeting 9</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="meeting8-tab" data-toggle="tab" href="#meeting8" role="tab" aria-controls="meeting8" aria-selected="false">Meeting 8</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="meeting7-tab" data-toggle="tab" href="#meeting7" role="tab" aria-controls="meeting7" aria-selected="false">Meeting 7</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="meeting6-tab" data-toggle="tab" href="#meeting6" role="tab" aria-controls="meeting6" aria-selected="false">Meeting 6</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="meeting5-tab" data-toggle="tab" href="#meeting5" role="tab" aria-controls="meeting5" aria-selected="false">Meeting 5</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="meeting4-tab" data-toggle="tab" href="#meeting4" role="tab" aria-controls="meeting4" aria-selected="false">Meeting 4</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="meeting3-tab" data-toggle="tab" href="#meeting3" role="tab" aria-controls="meeting3" aria-selected="false">Meeting 3</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="meeting2-tab" data-toggle="tab" href="#meeting2" role="tab" aria-controls="meeting2" aria-selected="false">Meeting 2</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="meeting1-tab" data-toggle="tab" href="#meeting1" role="tab" aria-controls="meeting1" aria-selected="true">Meeting 1</a>
				</li>
			</ul>
			<div class="tab-content col-9 d-inline-block" id="myTabContent">
				<!-- <div class="tab-pane fade show active" id="meeting11" role="tabpanel" aria-labelledby="meeting11-tab">
					<?php // include_once("./meetings/meeting11.php") ?>
				</div> -->
				<div class="tab-pane fade show active" id="meeting10" role="tabpanel" aria-labelledby="meeting10-tab">
				    <?php echo $this->render('meetings/meeting10.php') ?>
				</div>
				<div class="tab-pane fade" id="meeting9" role="tabpanel" aria-labelledby="meeting9-tab">
				    <?php echo $this->render('meetings/meeting9.php') ?>
				</div>
				<div class="tab-pane fade" id="meeting8" role="tabpanel" aria-labelledby="meeting8-tab">
				    <?php echo $this->render('meetings/meeting8.php') ?>
				</div>
				<div class="tab-pane fade" id="meeting7" role="tabpanel" aria-labelledby="meeting7-tab">
				    <?php echo $this->render('meetings/meeting7.php') ?>
				</div>
				<div class="tab-pane fade" id="meeting6" role="tabpanel" aria-labelledby="meeting6-tab">
				    <?php echo $this->render('meetings/meeting6.php') ?>
				</div>
				<div class="tab-pane fade" id="meeting5" role="tabpanel" aria-labelledby="meeting5-tab">
				    <?php echo $this->render('meetings/meeting5.php') ?>
				</div>
				<div class="tab-pane fade" id="meeting4" role="tabpanel" aria-labelledby="meeting4-tab">
				    <?php echo $this->render('meetings/meeting4.php') ?>
				</div>
				<div class="tab-pane fade" id="meeting3" role="tabpanel" aria-labelledby="meeting3-tab">
				    <?php echo $this->render('meetings/meeting3.php') ?>
				</div>
				<div class="tab-pane fade" id="meeting2" role="tabpanel" aria-labelledby="meeting2-tab">
				    <?php echo $this->render('meetings/meeting2.php') ?>
				</div>
				<div class="tab-pane fade" id="meeting1" role="tabpanel" aria-labelledby="meeting1-tab">
				    <?php echo $this->render('meetings/meeting1.php') ?>
				</div>
			</div>
		</div>
    </div>
</div>
