<?php

use yii\helpers\Html;
use yii\grid\GridView;
use \common\models\UniversityPartners;

/**
 * @var yii\web\View $this
 * @var common\models\search\UniversityPartnersSearch $searchModel
 * @var yii\data\ActiveDataProvider $dataProvider
 */

$this->title = 'University Partners';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="university-partners-index">
    <div class="card">
        <div class="card-header">
            <?php echo Html::a('Create University Partners', ['create'], ['class' => 'btn btn-success']) ?>
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
                    'name',
                    // 'description:ntext',
                    // 'continent',
                    [
                        'attribute' => 'continent',
                        'filter'=> UniversityPartners::getAllContinents(),
                        'value' => function ($model){
                            return UniversityPartners::getAllContinents()[$model->continent];
                        },
                    ],
                    // 'highlights:ntext',
                    // 'certifications:ntext',
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
