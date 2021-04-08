<?php

use yii\helpers\Html;
use yii\grid\GridView;

/**
 * @var yii\web\View $this
 * @var common\models\search\EnquiriesSearch $searchModel
 * @var yii\data\ActiveDataProvider $dataProvider
 */

$this->title = 'Enquiries';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="enquiries-index">
    <div class="card">

        <div class="card-body p-0">
    
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
                    // 'user_id',
                    [
                        'attribute' => 'user_id',
                        'format' => 'raw',
                        'value' => function ($model){
                            return \common\models\User::getUserBlock($model->user_id);
                        },
                        'headerOptions' => ['width' => '250px'],
                    ],
                    // 'school_id',
                    'enquiry:ntext',
                    // 'notes:ntext',
                    // 'status',
                    'created_at:datetime',
                    // 'created_by',
                    // 'updated_at',
                    // 'updated_by',
                    
                    // [
                    //     'class' => \common\widgets\ActionColumn::class, 
                    //     'headerOptions' => ['width' => '20px']
                    // ],
                ],
            ]); ?>
    
        </div>
        <div class="card-footer">
            <?php echo getDataProviderSummary($dataProvider) ?>
        </div>
    </div>

</div>
