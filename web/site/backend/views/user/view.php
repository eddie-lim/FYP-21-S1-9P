<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model common\models\User */

$this->title = $model->getPublicIdentity();
$this->params['breadcrumbs'][] = ['label' => Yii::t('backend', 'Users'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="user-view">
    <div class="card">
        <div class="card-header">
            <?php 
                if(Yii::$app->user->can(\common\models\User::ROLE_ADMINISTRATOR)){
                    echo Html::a(Yii::t('backend', 'Update'), ['update', 'id' => $model->id], ['class' => 'btn btn-primary']);
                    echo Html::a(Yii::t('backend', 'Delete'), ['delete', 'id' => $model->id], [
                        'class' => 'btn btn-danger',
                        'data' => [
                            'confirm' => Yii::t('backend', 'Are you sure you want to delete this item?'),
                            'method' => 'post',
                        ],
                    ]);
                }
            ?>
        </div>
        <div class="card-body p-0">
            <?php echo DetailView::widget([
                'model' => $model,
                'attributes' => [
                    'id',
                    // 'username',
                    // 'auth_key',
                    [
                        'label' => 'Name',
                        'format' => 'raw',
                        'value' => function ($model) {
                            $html = $model->publicIdentity;
                            return $html;
                        },
                        'headerOptions' => ['width' => '150px'],
                    ],
                    'email:email',
                    'status',
                    'created_at:datetime',
                    'updated_at:datetime',
                    // 'login_at:datetime',
                    [
                        'attribute' => 'login_at',
                        'format' => 'raw',
                        'value' => function ($model) {
                            $html = $model->login_at > 1500000 ? Yii::$app->formatter->asDateTime($model->login_at) : "<i class='text-muted'>No login record</i>";
                            return $html;
                        },
                    ],
                ],
            ]) ?>
        </div>
    </div>
</div>
