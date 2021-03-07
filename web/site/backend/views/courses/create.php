<?php

/**
 * @var yii\web\View $this
 * @var common\models\Courses $model
 */

$this->title = 'Create Courses';
$this->params['breadcrumbs'][] = ['label' => 'Courses', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="courses-create">

    <?php echo $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
