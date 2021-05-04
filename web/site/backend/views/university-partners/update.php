<?php

/**
 * @var yii\web\View $this
 * @var common\models\UniversityPartners $model
 */

$this->title = 'Update ' . ' ' . $model->name;
$this->params['breadcrumbs'][] = ['label' => 'University Partners', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->name, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="university-partners-update">

    <?php echo $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
