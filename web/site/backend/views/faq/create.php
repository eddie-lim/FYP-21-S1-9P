<?php

/**
 * @var yii\web\View $this
 * @var common\models\Faq $model
 */

$this->title = 'Create Faq';
$this->params['breadcrumbs'][] = ['label' => 'Faqs', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="faq-create">

    <?php echo $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
