<?php
/**
 * @var yii\web\View $this
 * @var string $content
 */

use yii\bootstrap4\Nav;
use yii\bootstrap4\NavBar;

$this->beginContent('@frontend/views/layouts/_clear.php');
$this->render('_meta-tag');
?>
<header>
    <?php NavBar::begin([
        'brandLabel' => "FYP-21-S1-9P",
        'brandUrl' => Yii::$app->homeUrl,
        'options' => [
            'class' => ['navbar-dark', 'bg-dark', 'navbar-expand-md', 'font-weight-bold', 'shadow-lg'],
        ],
    ]); ?>
    <?php echo Nav::widget([
        'options' => ['class' => ['navbar-nav', 'justify-content-end', 'ml-auto', 'font-weight-bold']],
        'items' => [
            ['label' => 'Home', 'url' => ['/site/index']],
            ['label' => 'Meeting Minutes', 'url' => ['/site/meeting-minutes']],
            ['label' => 'Documents', 'url' => ['/site/download-documents']],
            ['label' => 'App', 'url' => ['/site/app']],
            [
                'label' => 'GitHub Repository', 
                'url' => 'https://github.com/eddie-lim/FYP-21-S1-9P',
                'linkOptions' => [
                    'target' => '_blank'
                ]
            ],
        ]
    ]); ?>
    <?php NavBar::end(); ?>
</header>

<main class="flex-shrink-0" style="min-height: 80vh;" role="main">
    <?php echo $content ?>
</main>

<footer class="footer mt-auto py-3">
    <div class="container">
        <div class="d-flex flex-row justify-content-between">
            <strong>&copy; <?php echo "FYP-21-S1-9P" . " " . date('Y') ?></strong>
        </div>
    </div>
</footer>
<?php $this->endContent() ?>