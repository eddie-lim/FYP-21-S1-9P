<?php

use common\grid\EnumColumn;
use common\components\MyCustomActiveRecord;
use common\models\User;
use common\models\UniversityPartners;
use kartik\date\DatePicker;
use yii\helpers\Html;
use yii\grid\GridView;
use rmrevin\yii\fontawesome\FAS;
use backend\widgets\TabMenuUserWidget;

/**
 * @var yii\web\View $this
 * @var backend\models\search\UserSearch $searchModel
 * @var yii\data\ActiveDataProvider $dataProvider
 */
$this->title = Yii::t('backend', 'Users');
$this->params['breadcrumbs'][] = $this->title;
?>

<div class="card">
    <?php
        echo TabMenuUserWidget::widget(['page'=>$page]);
    ?>
    <div class="card-header">
        <?php echo Html::a(FAS::icon('user-plus').' '.Yii::t('backend', 'Add New {modelClass}', [
            'modelClass' => 'User',
        ]), ['create'], ['class' => 'btn btn-success']) ?>
    </div>

    <div class="card-body p-0">
        <?php echo GridView::widget([
            'dataProvider' => $dataProvider,
            'filterModel' => $searchModel,
            'layout' => "{items}\n{pager}",
            'options' => [
                'class' => ['gridview', 'table-responsive'],
            ],
            'tableOptions' => [
                'class' => ['table', 'text-wrap', 'table-striped', 'table-bordered', 'mb-0'],
            ],
            'columns' => [
                [
                    'attribute' => 'id',
                    'options' => ['style' => 'width: 5%'],
                ],
                // 'username',
                [
                    'label' => 'Name',
                    'format' => 'raw',
                    'attribute' => 'name',
                    'value' => function ($model) {
                        return User::getUserBlock($model->id);
                    },
                    'headerOptions' => ['width' => '150px'],
                ],
                [
                    'format' => 'email',
                    'attribute' => 'email',
                    'headerOptions' => ['width' => '150px'],
                ],
                [
                    'label' => 'Role',
                    'format' => 'raw',
                    'filter'=> User::getAllocatableRoles(),
                    'attribute' => 'item_name',
                    'value' => function ($model) {
                        $html = User::getUserRole($model->id);
                        return $html;
                    },
                    'headerOptions' => ['width' => '100px'],
                ],
                [
                    'label' => 'Assigned to',
                    'format' => 'raw',
                    'filter'=> UniversityPartners::getCommonAttr("name"),
                    'attribute' => 'uni_name',
                    'value' => function ($model) {
                        if(isset($model->userProfile->school_id)){
                            return UniversityPartners::getUniversityBlock($model->userProfile->school_id);
                        } else {
                            return "-";
                        }
                    },
                    'headerOptions' => ['width' => '200px'],
                ],
                // [
                //     'class' => EnumColumn::class,
                //     'attribute' => 'status',
                //     'enum' => MyCustomActiveRecord::deleteStatuses(),
                //     'filter' => MyCustomActiveRecord::deleteStatuses()
                // ],
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
                    'headerOptions' => ['width' => '200px'],
                ],
                [
                    'attribute' => 'login_at',
                    'format' => 'raw',
                    'value' => function ($model) {
                        $html = $model->login_at > 1500000 ? Yii::$app->formatter->asDateTime($model->login_at) : "<i class='text-muted'>No login record</i>";
                        return $html;
                    },
                    'filter' => DatePicker::widget([
                        'model' => $searchModel,
                        'attribute' => 'login_at',
                        'type' => DatePicker::TYPE_COMPONENT_APPEND,
                        'pluginOptions' => [
                            'format' => 'dd-mm-yyyy',
                            'showMeridian' => true,
                            'todayBtn' => true,
                            'endDate' => '0d',
                        ]
                    ]),
                    'headerOptions' => ['width' => '200px'],
                ],
                // 'updated_at',

                [
                    'class' => \common\widgets\ActionColumn::class,
                    'template' => '{view} {update} {delete}',
                    // 'template' => '{login} {view} {update} {delete}',
                    'headerOptions' => ['width' => '20px'],
                    // 'buttons' => [
                    //     'login' => function ($url) {
                    //         return Html::a(
                    //             FAS::icon('sign-in-alt', ['aria' => ['hidden' => true], 'class' => ['fa-fw']]),
                    //             $url,
                    //             [
                    //                 'title' => Yii::t('backend', 'Login'),
                    //                 'class' => ['btn', 'btn-xs', 'btn-secondary']
                    //             ]
                    //         );
                    //     },
                    // ],
                    // 'visibleButtons' => [
                    //     'login' => Yii::$app->user->can('administrator')
                    // ]

                ],
            ],
        ]); ?>
    </div>

    <div class="card-footer">
        <?php echo getDataProviderSummary($dataProvider) ?>
    </div>
</div>
