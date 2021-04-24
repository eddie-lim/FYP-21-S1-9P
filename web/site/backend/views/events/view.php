<?php

use yii\helpers\Html;
use yii\grid\GridView;
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
                    'type',
                    [
                        'attribute' => 'school_id',
                        'format' => 'raw',
                        'value' => function ($model){
                            return \common\models\UniversityPartners::getUniversityBlock($model->school_id);
                        },
                        'headerOptions' => ['width' => '250px'],
                    ],
                    'session',
                    'name',
                    'description:ntext',
                    'venue',
                    'thumbnail_url',
                    'start_at:datetime',
                    'end_at:datetime',
                    'tags:ntext',
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
        <div class="card-header border-top" style="border-bottom:none; ">
            <h2>Users Registered</h2>
        </div>
        <div class="card-body">
            <?php echo GridView::widget([
                'layout' => "{items}\n{pager}",
                'options' => [
                    'class' => ['gridview', 'table-responsive'],
                ],
                'tableOptions' => [
                    'class' => ['table', 'text-wrap', 'table-striped', 'table-bordered', 'mb-0'],
                ],
                'dataProvider' => $dataProvider,
                // 'filterModel' => $searchModel,
                'columns' => [
                    [
                        'class' => \yii\grid\SerialColumn::class, 
                        'headerOptions' => ['width' => '20px']
                    ],
                    [
                        'attribute' => 'created_by',
                        'label'=>"User",
                        'format' => 'raw',
                        'value' => function ($model){
                            return \common\models\User::getUserBlock($model->created_by);
                        },
                        'headerOptions' => ['width' => '250px'],
                    ],
                    [
                        'attribute' => 'created_at',
                        'label'=>"Registered At",
                        'format' => 'datetime',
                        'headerOptions' => ['width' => '250px'],
                    ],
                ],
            ]); ?>
        </div>
        <div class="card-footer">
            <?php echo getDataProviderSummary($dataProvider) ?>
        </div>
    </div>
</div>
