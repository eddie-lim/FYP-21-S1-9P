<?php

use yii\helpers\Html;
use yii\grid\GridView;
use \common\models\Courses;

/**
 * @var yii\web\View $this
 * @var common\models\search\CoursesSearch $searchModel
 * @var yii\data\ActiveDataProvider $dataProvider
 */

$this->title = 'Courses';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="courses-index">
    <div class="card">
        <div class="card-header">
            <?php echo Html::a('Create Courses', ['create'], ['class' => 'btn btn-success']) ?>
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
                    // 'school_id',
                    [
                        'attribute' => 'school_id',
                        'format' => 'raw',
                        'value' => function ($model){
                            return \common\models\UniversityPartners::getUniversityBlock($model->school_id);
                        },
                        'headerOptions' => ['width' => '250px'],
                        'visible'=>Yii::$app->user->can(\common\models\User::ROLE_SUPERADMIN),
                    ],
                    'name',
                    // 'mode_of_study',
                    [
                        'attribute' => 'mode_of_study',
                        'filter'=> Courses::getAllModeOfStudy(),
                        'value' => function ($model){
                            return Courses::getAllModeOfStudy()[$model->mode_of_study];
                        },
                    ],
                    [
                        'attribute' => 'disciplines',
                        'filter'=> Courses::getCommonAttr('disciplines'),
                    ],
                    [
                        'attribute' => 'sub_disciplines',
                        'filter'=> Courses::getCommonAttr('sub_disciplines'),
                    ],
                    [
                        'attribute' => 'academic_level',
                        'filter'=> Courses::getCommonAttr('academic_level'),
                    ],
                    // 'disciplines',
                    // 'sub_disciplines',
                    // 'academic_level',
                    // 'introduction:ntext',
                    // 'programme_structure:ntext',
                    // 'admission_criteria:ntext',
                    // 'fees:ntext',
                    // 'exemptions:ntext',
                    // 'profiles:ntext',
                    // 'assessments_exams:ntext',
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
