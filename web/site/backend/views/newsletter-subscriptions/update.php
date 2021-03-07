<?php

/**
 * @var yii\web\View $this
 * @var common\models\NewsletterSubscriptions $model
 */

$this->title = 'Update Newsletter Subscriptions: ' . ' ' . $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Newsletter Subscriptions', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="newsletter-subscriptions-update">

    <?php echo $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
