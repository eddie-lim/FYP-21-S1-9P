<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/**
 * @var yii\web\View $this
 * @var common\models\Courses $model
 */

$this->title = $model->name;
$this->params['breadcrumbs'][] = ['label' => 'Courses', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="courses-view">
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
                    // 'school_id',
                    [
                        'attribute' => 'school_id',
                        'format' => 'raw',
                        'value' => function ($model){
                            return \common\models\UniversityPartners::getUniversityBlock($model->school_id);
                        },
                        'headerOptions' => ['width' => '250px'],
                    ],
                    'name',
                    'mode_of_study',
                    'disciplines',
                    'sub_disciplines',
                    'academic_level',
                    'introduction:ntext',
                    'programme_structure:ntext',
                    'admission_criteria:ntext',
                    'fees:ntext',
                    'exemptions:ntext',
                    'profiles:ntext',
                    'assessments_exams:ntext',
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
    </div>
</div>
