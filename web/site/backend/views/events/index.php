<?php

use yii\helpers\Html;
use yii\grid\GridView;
use common\models\Events;

/**
 * @var yii\web\View $this
 * @var common\models\search\EventsSearch $searchModel
 * @var yii\data\ActiveDataProvider $dataProvider
 */

$this->title = 'Events';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="events-index">
    <div class="card">
        <div class="card-header">
            <?php echo Html::a('Create Events', ['create'], ['class' => 'btn btn-success']) ?>
        </div>

        <div class="card-body p-0">
            <?php // echo $this->render('_search', ['model' => $searchModel]); ?>
    
            <?php echo GridView::widget([
                'layout' => "{items}\n{pager}",
                'options' => [
                    'class' => ['gridview', 'table-responsive'],
                ],
                'tableOptions' => [
                    'class' => ['table', 'text-wrap', 'table-striped', 'table-bordered', 'mb-0'],
                ],
                'dataProvider' => $dataProvider,
                'filterModel' => $searchModel,
                'columns' => [
                    [
                        'class' => \yii\grid\SerialColumn::class, 
                        'headerOptions' => ['width' => '20px']
                    ],

                    // 'id',
                    [
                        'attribute' => 'school_id',
                        'format' => 'raw',
                        'value' => function ($model){
                            return \common\models\UniversityPartners::getUniversityBlock($model->school_id);
                        },
                        'headerOptions' => ['width' => '250px'],
                        'visible'=>Yii::$app->user->can(\common\models\User::ROLE_SUPERADMIN),
                    ],
                    // 'session',
                    [
                        'attribute' => 'session',
                        'filter'=> Events::getCommonAttr('session'),
                    ],
                    'name',
                    // 'type',
                    [
                        'attribute' => 'type',
                        'filter'=> Events::getCommonAttr('type'),
                    ],
                    // 'description:ntext',
                    // 'venue',
                    [
                        'attribute' => 'venue',
                        'filter'=> Events::getCommonAttr('venue'),
                    ],
                    // 'start_at:datetime',
                    // 'end_at:datetime',
                    // 'tags:ntext',
                    // 'notes:ntext',
                    // 'status',
                    // 'created_at',
                    // 'created_by',
                    // 'updated_at',
                    // 'updated_by',
                    
                    [
                        'class' => \common\widgets\ActionColumn::class, 
                        'headerOptions' => ['width' => '20px']
                    ],
                ],
            ]); ?>
    
        </div>
        <div class="card-footer">
            <?php echo getDataProviderSummary($dataProvider) ?>
        </div>
    </div>

</div>
