<!DOCTYPE html>
<html>
<?php include_once("__include_head.php") ?>
<body>
	<div class="header-container">
		<h1 class="">FYP-21-S1-9P</h1>
	</div>
	<div class="body-contanier">
		<div class="tab-container row">	
			<ul class="nav nav-pills flex-column col-2" id="myTab" role="tablist">
				<li class="nav-item">
					<a class="nav-link active" id="minutes-tab" data-toggle="tab" href="#minutes" role="tab" aria-controls="minutes" aria-selected="true">Meeting Minutes</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
				</li>
			</ul>
			<div class="tab-content col-10" id="myTabContent">
				<div class="tab-pane fade show active" id="minutes" role="tabpanel" aria-labelledby="minutes-tab">
					<ul class="nav nav-tabs" id="myTab" role="tablist">
						<!-- <li class="nav-item">
							<a class="nav-link" id="meeting3-tab" data-toggle="tab" href="#meeting3" role="tab" aria-controls="meeting3" aria-selected="false">Meeting 3</a>
						</li> -->
						<li class="nav-item">
							<a class="nav-link active" id="meeting2-tab" data-toggle="tab" href="#meeting2" role="tab" aria-controls="meeting2" aria-selected="false">Meeting 2</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" id="meeting1-tab" data-toggle="tab" href="#meeting1" role="tab" aria-controls="meeting1" aria-selected="true">Meeting 1</a>
						</li>
					</ul>
					<div class="tab-content" id="myTabContent">
						<!-- <div class="tab-pane fade" id="meeting3" role="tabpanel" aria-labelledby="meeting3-tab">.
							<?php include_once("meeting3.php") ?>
						</div> -->
						<div class="tab-pane fade show active" id="meeting2" role="tabpanel" aria-labelledby="meeting2-tab">
							<?php include_once("meeting2.php") ?>
						</div>
						<div class="tab-pane fade" id="meeting1" role="tabpanel" aria-labelledby="meeting1-tab">
							<?php include_once("meeting1.php") ?>
						</div>
					</div>
				</div>
				<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
					<?php include_once("_profile.php") ?>
				</div>
			</div>
		</div>
	</div>
	<?php include_once("__include_bottom.php") ?>
</body>
</html>
