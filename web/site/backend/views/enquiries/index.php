<?php

use yii\helpers\Html;
use yii\grid\GridView;
use kartik\date\DatePicker;

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
                    // [
                    //     'attribute' => 'user_id',
                    //     'format' => 'raw',
                    //     'value' => function ($model){
                    //         return \common\models\User::getUserBlock($model->user_id);
                    //     },
                    //     'headerOptions' => ['width' => '250px'],
                    // ],
                    [
                        'label' => 'Name',
                        'format' => 'raw',
                        'attribute' => 'user_name',
                        'value' => function ($model) {
                            return \common\models\User::getUserBlock($model->user_id);
                        },
                        'headerOptions' => ['width' => '200px'],
                    ],
                    // 'school_id',
                    'enquiry:ntext',
                    // 'notes:ntext',
                    // 'status',
                    // 'created_at:datetime',
                    [
                        'attribute' => 'created_at',
                        'format' => 'datetime',
                        'filter' => DatePicker::widget([
                            'model' => $searchModel,
                            'attribute' => 'created_at',
                            'type' => DatePicker::TYPE_COMPONENT_APPEND,
                            'pluginOptions' => [
                                'format' => 'dd-mm-yyyy',
                                'showMeridian' => true,
                                'todayBtn' => true,
                                'endDate' => '0d',
                            ]
                        ]),
                        'headerOptions' => ['width' => '250px'],
                    ],
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
