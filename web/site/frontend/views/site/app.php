<?php
/**
 * @var yii\web\View $this
 */
use yii\helpers\Html;
$this->title = Yii::$app->name;
?>
<div class="site-activate">
    
    <div class="container">

	    <div class="instruction">
	        <h1 class="title"><?php echo Html::encode($this->title) ?> Android APK</h1>
	        <div>
	        	<?php echo Html::a('Download' . ' <span class="fas fa-download fa-sm"></span>', ['/apk/openhouse.apk'], ['class' => 'btn btn-success']) ?>
	    	</div>
	    	<hr>

	    	<div><b>Step 1:</b> 
	    	Tap on “Download” button.</div>
	    	<div class="screen-holder">
	    		<img class="screen" src="/img/app_1.jpg"> &nbsp;
            </div><br>


	    	<div><b>Step 2:</b> 
	    	A popup will appear to ask you if you want to download “openhouse.apk”. Tap on “Download”.</div>
	    	<div class="screen-holder">
	    		<img class="screen" src="/img/app_2.jpg"> &nbsp; 
	    	</div><br>


	    	<div><b>Step 3:</b> 
	    	Once downloaded, tap on “open”.</div>
			<div class="screen-holder">
	    		<img class="screen" src="/img/app_3.jpg"> &nbsp; 
	    	</div><br>


	    	<div><b>Step 4:</b> 
	    	A popup will appear and ask you if you want to install the open house app. Tap “install”.</div>
			<div class="screen-holder">
	    		<img class="screen" src="/img/app_4.jpg"> &nbsp; 
	    	</div><br>


	    	<div><b>Step 5:</b> 
	    	The popup will show installing, wait for it to install finish.</div>
			<div class="screen-holder">
	    		<img class="screen" src="/img/app_5.jpg"> &nbsp; 
	    	</div><br>


	    	<div><b>Step 6:</b> 
	    	Once installed successfully, tap on “open” to open the app. The app icon will also appear in your app menu/home screen.</div>
			<div class="screen-holder">
	    		<img class="screen" src="/img/app_6.jpg"> &nbsp; 
	    	</div><br>


	    	<div><b>Step 7:</b> 
	    	Once opened. You should see the app’s landing page.</div>
			<div class="screen-holder">
	    		<img class="screen" src="/img/app_7.jpg"> &nbsp; 
	    	</div><br>


		</div>

    </div>
</div>

