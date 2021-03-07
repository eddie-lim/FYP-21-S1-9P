<?php

/**
 * @var yii\web\View $this
 * @var common\models\Enquiries $model
 */

$this->title = 'Create Enquiries';
$this->params['breadcrumbs'][] = ['label' => 'Enquiries', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="enquiries-create">

    <?php echo $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
