<?php

/**
 * @var yii\web\View $this
 * @var common\models\NewsletterSubscriptions $model
 */

$this->title = 'Create Newsletter Subscriptions';
$this->params['breadcrumbs'][] = ['label' => 'Newsletter Subscriptions', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="newsletter-subscriptions-create">

    <?php echo $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
