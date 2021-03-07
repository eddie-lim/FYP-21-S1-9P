<?php

/**
 * @var yii\web\View $this
 * @var common\models\Faq $model
 */

$this->title = 'Update Faq: ' . ' ' . $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Faqs', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="faq-update">

    <?php echo $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
