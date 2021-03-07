<?php

/**
 * @var yii\web\View $this
 * @var common\models\Enquiries $model
 */

$this->title = 'Update Enquiries: ' . ' ' . $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Enquiries', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="enquiries-update">

    <?php echo $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
