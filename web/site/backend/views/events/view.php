<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/**
 * @var yii\web\View $this
 * @var common\models\Events $model
 */

$this->title = $model->name;
$this->params['breadcrumbs'][] = ['label' => 'Events', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="events-view">
    <div class="card">
        <div class="card-header">
            <?php echo Html::a('Update', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
            <?php echo Html::a('Delete', ['delete', 'id' => $model->id], [
                'class' => 'btn btn-danger',
                'data' => [
                    'confirm' => 'Are you sure you want to delete this item?',
                    'method' => 'post',
                ],
            ]) ?>
        </div>
        <div class="card-body">
            <?php echo DetailView::widget([
                'model' => $model,
                'attributes' => [
                    'id',
                    'school_id',
                    'name',
                    'description:ntext',
                    'venue',
                    'date_start_at',
                    'date_end_at',
                    'time_start_at:datetime',
                    'time_end_at:datetime',
                    'notes:ntext',
                    'status',
                    'created_at',
                    'created_by',
                    'updated_at',
                    'updated_by',
                    
                ],
            ]) ?>
        </div>
    </div>
</div>