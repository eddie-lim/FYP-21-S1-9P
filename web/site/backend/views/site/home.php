<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/**
 * @var yii\web\View $this
 * @var common\models\UniversityPartners $model
 */

$this->title = $model->name;
$this->params['breadcrumbs'][] = ['label' => 'University Partners', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="university-partners-view">
    <div class="card">
        <div class="card-body">
            <?php echo DetailView::widget([
                'model' => $model,
                'attributes' => [
                    'name',
                    'description:ntext',
                    'continent',
                    'highlights:ntext',
                    'certifications:ntext',
                    // 'tags:ntext',
                    // 'notes:ntext',
                ],
            ]) ?>
        </div>
        <div class="card-footer">
            <?php echo Html::a('Update', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        </div>
    </div>
</div>
