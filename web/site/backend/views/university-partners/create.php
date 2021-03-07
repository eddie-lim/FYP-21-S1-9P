<?php

/**
 * @var yii\web\View $this
 * @var common\models\UniversityPartners $model
 */

$this->title = 'Create University Partners';
$this->params['breadcrumbs'][] = ['label' => 'University Partners', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="university-partners-create">

    <?php echo $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
