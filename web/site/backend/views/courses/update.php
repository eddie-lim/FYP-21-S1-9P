<?php

/**
 * @var yii\web\View $this
 * @var common\models\Courses $model
 */

$this->title = 'Update Courses: ' . ' ' . $model->name;
$this->params['breadcrumbs'][] = ['label' => 'Courses', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->name, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="courses-update">

    <?php echo $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
