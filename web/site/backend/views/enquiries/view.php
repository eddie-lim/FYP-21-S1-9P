<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/**
 * @var yii\web\View $this
 * @var common\models\Enquiries $model
 */

$this->title = $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Enquiries', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="enquiries-view">
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
                    // 'user_id',
                    [
                        'attribute' => 'user_id',
                        'format' => 'raw',
                        'value' => function ($model){
                            return \common\models\User::getUserBlock($model->user_id);
                        },
                    ],
                    // 'school_id',
                    [
                        'attribute' => 'school_id',
                        'format' => 'raw',
                        'value' => function ($model){
                            return \common\models\UniversityPartners::getUniversityBlock($model->school_id);
                        },
                        'headerOptions' => ['width' => '250px'],
                    ],
                    'enquiry:ntext',
                    'notes:ntext',
                    'status',
                    'created_at:datetime',
                    // 'created_by',
                    [
                        'attribute' => 'created_by',
                        'format' => 'raw',
                        'value' => function ($model){
                            return \common\models\User::getUserBlock($model->created_by);
                        },
                    ],
                    'updated_at:datetime',
                    // 'updated_by',
                    [
                        'attribute' => 'updated_by',
                        'format' => 'raw',
                        'value' => function ($model){
                            return \common\models\User::getUserBlock($model->updated_by);
                        },
                    ],
                    
                ],
            ]) ?>
        </div>
    </div>
</div>
