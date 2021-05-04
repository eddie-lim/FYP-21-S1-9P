<?php
/**
 * @author Eugine Terentev <eugine@terentev.net>
 * @author Victor Gonzalez <victor@vgr.cl>
 * @var yii\web\View $this
 * @var string $content
 */

use backend\assets\BackendAsset;
use common\models\SystemLog;
use backend\widgets\MainSidebarMenu;
use common\models\User;
use common\models\Enquiries;
use yii\bootstrap4\Alert;
use yii\helpers\ArrayHelper;
use yii\helpers\Url;
use yii\log\Logger;
use yii\bootstrap4\Breadcrumbs;
use yii\bootstrap4\Nav;
use yii\bootstrap4\NavBar;
use yii\bootstrap4\Html;
use rmrevin\yii\fontawesome\FAR;
use rmrevin\yii\fontawesome\FAS;
use rmrevin\yii\fontawesome\FAB;
use common\components\keyStorage\FormModel;
use common\components\keyStorage\FormWidget;

$bundle = BackendAsset::register($this);
// Yii::info(Yii::$app->components["i18n"]["translations"]['*']['class'], 'test');
$keyStorage = Yii::$app->keyStorage;

$logEntries = [
    [
        'label' => Yii::t('backend', 'You have {num} log items', ['num' => SystemLog::find()->count()]),
        'linkOptions' => ['class' => ['dropdown-item', 'dropdown-header']]
    ],
    '<div class="dropdown-divider"></div>',
];
foreach (SystemLog::find()->orderBy(['log_time' => SORT_DESC])->limit(5)->all() as $logEntry) {
    $logEntries[] = [
        'label' => FAS::icon('exclamation-triangle', ['class' => [$logEntry->level === Logger::LEVEL_ERROR ? 'text-red' : 'text-yellow']]). ' '. $logEntry->category,
        'url' => ['/log/view', 'id' => $logEntry->id]
    ];
    $logEntries[] = '<div class="dropdown-divider"></div>';
}

$logEntries[] = [
    'label' => Yii::t('backend', 'View all'),
    'url' => ['/log/index'],
    'linkOptions' => ['class' => ['dropdown-item', 'dropdown-footer']]
];
?>

<?php $this->beginContent('@backend/views/layouts/base.php'); ?>
<div class="wrapper">
    <!-- navbar -->
    <?php NavBar::begin([
        'renderInnerContainer' => false,
        'options' => [
            'class' => [
                'main-header',
                'navbar',
                'navbar-expand',
                Yii::$app->user->can(User::ROLE_SUPERADMIN) ? "navbar-dark" : (Yii::$app->user->can(User::ROLE_ADMINISTRATOR) ? "navbar-dark" : "navbar-light"),
                $keyStorage->get('adminlte.navbar-no-border') ? 'border-bottom-0' : null,
                $keyStorage->get('adminlte.navbar-small-text') ? 'text-sm' : null,
            ],
        ],
    ]); ?>

        <!-- left navbar links -->
        <?php echo Nav::widget([
            'options' => ['class' => ['navbar-nav']],
            'encodeLabels' => false,
            'items' => [
                [
                    // sidebar menu toggler
                    'label' => FAS::icon('bars'),
                    'url' => '#',
                    'options' => [
                        'data' => ['widget' => 'pushmenu'],
                        'role' => 'button',
                    ]
                ],
            ]
        ]); ?>
        <!-- /left navbar links -->
        <!-- right navbar links -->
        <?php echo Nav::widget([
            'options' => ['class' => ['navbar-nav', 'ml-auto']],
            'encodeLabels' => false,
            'items' => [
                [
                    // log events
                    'label' => FAS::icon('clipboard-list').' <span class="badge badge-warning navbar-badge">'.SystemLog::find()->count().'</span>',
                    'url' => '#',
                    'linkOptions' => ['class' => ['no-caret']],
                    'dropdownOptions' => [
                        'class' => ['dropdown-menu', 'dropdown-menu-lg', 'dropdown-menu-right'],
                    ],
                    'items' => $logEntries,
                    'visible' => Yii::$app->user->can(User::ROLE_SUPERADMIN),
                ],
                '<li class="nav-item dropdown user-menu">
                    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                        '.Html::img(Yii::$app->user->identity->userProfile->getAvatar('/img/anonymous.png'), ['class' => ['img-circle', 'elevation-2', 'bg-white', 'user-image'], 'alt' => 'User image']).'
                        '.Html::tag('span', Yii::$app->user->identity->publicIdentity, ['class' => ['d-none', 'd-md-inline']]).'
                    </a>
                    <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <!-- User image -->
                        <li class="user-header bg-primary">
                            '.Html::img(Yii::$app->user->identity->userProfile->getAvatar('/img/anonymous.png'), ['class' => ['img-circle', 'elevation-2', 'bg-white'], 'alt' => 'User image']).'
                            <p>
                                '.Yii::$app->user->identity->publicIdentity.'
                                <small>'.Yii::t('backend', 'Member since {0, date, long}', Yii::$app->user->identity->created_at).'</small>
                            </p>
                        </li>
                        <!-- Menu Footer-->
                        <li class="user-footer">
                            <div class="float-left">
                                '.Html::a(Yii::t('backend', 'Profile'), ['/sign-in/profile'], ['class' => 'btn btn-default btn-flat']).'
                            </div>
                            <div class="float-left">
                                '.Html::a(Yii::t('backend', 'Account'), ['/sign-in/account'], ['class' => 'btn btn-default btn-flat']).'
                            </div>
                            <div class="float-right">
                                '.Html::a(Yii::t('backend', 'Logout'), ['/sign-in/logout'], ['class' => 'btn btn-default btn-flat', 'data-method' => 'post']).'
                            </div>
                        </li>
                    </ul>
                </li>
                ',
                [
                    // control sidebar button
                    'label' => FAS::icon('th-large'),
                    'url'  => '#',
                    'linkOptions' => [
                        'data' => ['widget' => 'control-sidebar', 'slide' => 'true'],
                        'role' => 'button'
                    ],
                    'visible' => Yii::$app->user->can(User::ROLE_SUPERADMIN),
                ],
            ]
        ]); ?>
        <!-- /right navbar links -->

    <?php NavBar::end(); ?>
    <!-- /navbar -->

    <!-- main sidebar -->
    <aside class="main-sidebar <?= Yii::$app->user->can(User::ROLE_SUPERADMIN) ? "sidebar-dark-red" : (Yii::$app->user->can(User::ROLE_ADMINISTRATOR) ? "sidebar-dark-orange" : "sidebar-light-teal") ?> elevation-4 <?php echo $keyStorage->get('adminlte.sidebar-no-expand') ? 'sidebar-no-expand' : null ?>">
        <!-- brand logo -->
        <a href="/" class="brand-link text-center <?php echo $keyStorage->get('adminlte.brand-text-small') ? 'text-sm' : null ?>">
            <!-- <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
                style="opacity: .8"> -->
            <span class="brand-text font-weight-bold"><?php echo Yii::$app->name ?></span>
        </a>
        <!-- /brand logo -->

        <!-- sidebar -->
        <div class="sidebar">
            <!-- sidebar user panel -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                    <?php echo Html::img(
                        Yii::$app->user->identity->userProfile->getAvatar('/img/anonymous.png'),
                        ['class' => ['img-circle', 'elevation-2', 'bg-white'], 'alt' => 'User image']
                    ) ?>
                </div>
                <div class="info">
                    <a href="#" class="d-block"><?php echo Yii::$app->user->identity->publicIdentity ?></a>
                    <a class="d-block text-wrap">Role: <?= User::getUserRole(Yii::$app->user->id) ?></a>
                </div>
            </div>
            <!-- /sidebar user panel -->

            <!-- sidebar menu -->
            <nav class="mt-2">
                <?php echo MainSidebarMenu::widget([
                    'options' => [
                        'class' => [
                            'nav',
                            'nav-pills',
                            'nav-sidebar',
                            'flex-column',
                            $keyStorage->get('adminlte.sidebar-small-text') ? 'text-sm' : null,
                            $keyStorage->get('adminlte.sidebar-flat') ? 'nav-flat' : null,
                            $keyStorage->get('adminlte.sidebar-legacy') ? 'nav-legacy' : null,
                            $keyStorage->get('adminlte.sidebar-compact') ? 'nav-compact' : null,
                            $keyStorage->get('adminlte.sidebar-child-indent') ? 'nav-child-indent' : null,
                        ],
                        'data' => [
                            'widget' => 'treeview',
                            'accordion' => 'false'
                        ],
                        'role' => 'menu',
                    ],
                    'items' => [
                        [
                            'label' => Yii::t('backend', 'My University'),
                            'icon' => FAS::icon('building', ['class' => ['nav-icon']]),
                            'url' => ['/site/home'],
                            'active' => Yii::$app->controller->id === 'site' && Yii::$app->controller->action->id === 'home',
                        ],
                        [
                            'label' => Yii::t('backend', 'Users'),
                            'icon' => FAS::icon('users', ['class' => ['nav-icon']]),
                            'url' => ['/user/index'],
                            'active' => Yii::$app->controller->id === 'user',
                            'visible' => Yii::$app->user->can(User::ROLE_ADMINISTRATOR),
                        ],
                        [
                            'label' => Yii::t('backend', 'Courses'),
                            'icon' => FAS::icon('book-open', ['class' => ['nav-icon']]),
                            'url' => ['/courses/index'],
                            'active' => Yii::$app->controller->id === 'courses',
                        ],
                        [
                            'label' => Yii::t('backend', 'University Partners'),
                            'icon' => FAS::icon('school', ['class' => ['nav-icon']]),
                            'url' => ['/university-partners/index'],
                            'active' => Yii::$app->controller->id === 'university-partners',
                            'visible' => Yii::$app->user->can(User::ROLE_ADMINISTRATOR),
                        ],
                        [
                            'label' => Yii::t('backend', 'Events'),
                            'icon' => FAS::icon('calendar-day', ['class' => ['nav-icon']]),
                            'url' => ['/events/index'],
                            'active' => Yii::$app->controller->id === 'events',
                        ],
                        [
                            'label' => Yii::t('backend', 'FAQ'),
                            'icon' => FAS::icon('question-circle', ['class' => ['nav-icon']]),
                            'url' => ['/faq/index'],
                            'active' => Yii::$app->controller->id === 'faq',
                        ],
                        [
                            'label' => Yii::t('backend', 'Enquiries'),
                            'icon' => FAB::icon('wpforms', ['class' => ['nav-icon']]),
                            'url' => ['/enquiries/index'],
                            'active' => Yii::$app->controller->id === 'enquiries',
                            'badge' => Yii::$app->user->can(Yii::$app->user->identity::ROLE_SUPERADMIN) ? Enquiries::find()->where(['status'=>'enabled'])->count() : Enquiries::find()->where(['status'=>'enabled'])->andWhere(['school_id'=>Yii::$app->user->identity->userProfile->school_id])->count(),
                            'badgeBgClass' => 'badge-success',
                        ],
                        [
                            'label' => Yii::t('backend', 'Newsletter Subscriptions'),
                            'icon' => FAS::icon('newspaper', ['class' => ['nav-icon']]),
                            'url' => ['/newsletter-subscriptions/index'],
                        ],
                        // DEV --------------------------------------------------
                        [
                            'label' => Yii::t('backend', 'Developer'),
                            'url' => '#',
                            'icon' => FAB::icon('dev', ['class' => ['nav-icon']]),
                            'options' => ['class' => 'nav-item has-treeview'],
                            'active' => (strpos(Yii::$app->controller->id, 'rbac') === 0),
                            'visible' => Yii::$app->user->can(User::ROLE_SUPERADMIN),
                            'items' => [
                                [
                                    'label' => Yii::t('backend', 'RBAC Rules'),
                                    'url' => '#',
                                    'icon' => FAS::icon('user-shield', ['class' => ['nav-icon']]),
                                    'options' => ['class' => 'nav-item has-treeview'],
                                    'active' => (strpos(Yii::$app->controller->id, 'rbac') === 0),
                                    'visible' => Yii::$app->user->can('administrator'),
                                    'items' => [
                                        [
                                            'label' => Yii::t('backend', 'Assignments'),
                                            'url' => ['/rbac-auth-assignment/index'],
                                            'icon' => FAR::icon('circle', ['class' => ['nav-icon']]),
                                            'active' => (Yii::$app->controller->id == 'rbac-auth-assignment'),
                                        ],
                                        [
                                            'label' => Yii::t('backend', 'Items'),
                                            'url' => ['/rbac-auth-item/index'],
                                            'icon' => FAR::icon('circle', ['class' => ['nav-icon']]),
                                            'active' => (Yii::$app->controller->id == 'rbac-auth-item'),
                                        ],
                                        [
                                            'label' => Yii::t('backend', 'Child Items'),
                                            'url' => ['/rbac-auth-item-child/index'],
                                            'icon' => FAR::icon('circle', ['class' => ['nav-icon']]),
                                            'active' => (Yii::$app->controller->id =='rbac-auth-item-child'),
                                        ],
                                        [
                                            'label' => Yii::t('backend', 'Rules'),
                                            'url' => ['/rbac-auth-rule/index'],
                                            'icon' => FAR::icon('circle', ['class' => ['nav-icon']]),
                                            'active' => (Yii::$app->controller->id == 'rbac-auth-rule'),
                                        ],
                                    ],
                                ],
                                [
                                    'label' => Yii::t('backend', 'Files'),
                                    'url' => '#',
                                    'icon' => FAS::icon('folder-open', ['class' => ['nav-icon']]),
                                    'options' => ['class' => 'nav-item has-treeview'],
                                    'active' => (Yii::$app->controller->id == 'storage' || Yii::$app->controller->id == 'manager'),
                                    'visible' => Yii::$app->user->can('administrator'),
                                    'items' => [
                                        [
                                            'label' => Yii::t('backend', 'Storage'),
                                            'url' => ['/storage/index'],
                                            'icon' => FAS::icon('database', ['class' => ['nav-icon']]),
                                            'active' => (Yii::$app->controller->id == 'storage'),
                                        ],
                                        [
                                            'label' => Yii::t('backend', 'Manager'),
                                            'url' => ['/manager/index'],
                                            'icon' => FAS::icon('archive', ['class' => ['nav-icon']]),
                                            'active' => (Yii::$app->controller->id == 'manager'),
                                        ],
                                    ],
                                ],
                                [
                                    'label' => Yii::t('backend', 'Key-Value Storage'),
                                    'url' => ['/key-storage/index'],
                                    'icon' => FAS::icon('exchange-alt', ['class' => ['nav-icon']]),
                                    'active' => (Yii::$app->controller->id == 'key-storage'),
                                    'visible' => Yii::$app->user->can('administrator'),
                                ],
                                [
                                    'label' => Yii::t('backend', 'Cache'),
                                    'url' => ['/cache/index'],
                                    'icon' => FAS::icon('sync', ['class' => ['nav-icon']]),
                                    'visible' => Yii::$app->user->can('administrator'),
                                ],
                                [
                                    'label' => Yii::t('backend', 'System Information'),
                                    'url' => ['/information/index'],
                                    'icon' => FAS::icon('tachometer-alt', ['class' => ['nav-icon']]),
                                    'visible' => Yii::$app->user->can('administrator'),
                                ],
                                [
                                    'label' => Yii::t('backend', 'Logs'),
                                    'url' => ['/log/index'],
                                    'icon' => FAS::icon('clipboard-list', ['class' => ['nav-icon']]),
                                    'badge' => SystemLog::find()->count(),
                                    'badgeBgClass' => 'badge-danger',
                                    'visible' => Yii::$app->user->can('administrator'),
                                ],
                            ],
                        ],
                    ],
                ]) ?>
            </nav>
            <!-- /sidebar menu -->
        </div>
        <!-- /sidebar -->
    </aside>
    <!-- /main sidebar -->

    <!-- content wrapper -->
    <div class="content-wrapper" style="min-height: 402px;">
        <!-- content header -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2"> 
                    <?php if(isset(Yii::$app->user->identity->userProfile->universityPartners) && strpos($this->title, Yii::$app->user->identity->userProfile->universityPartners->name) === false): ?>
                        <div class="col-12">
                            <h2 class="m-0 text-dark"><?php echo Yii::$app->user->identity->userProfile->universityPartners->name ?></h2>
                        </div>
                    <?php endif; ?>
                    <div class="col-sm-6">
                        <h3 class="m-0 text-dark"><?php echo Html::encode($this->title) ?></h3>
                    </div>
                    <div class="col-sm-6">
                        <?php echo Breadcrumbs::widget([
                            'tag' => 'ol',
                            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
                            'options' => ['class' => ['breadcrumb', 'float-sm-right']]
                        ]) ?>
                    </div>
                </div>
            </div>
        </div>
        <!-- /content header -->

        <!-- main content -->
        <section class="content">
            <div class="container-fluid">
                <?php if (Yii::$app->session->hasFlash('alert')) : ?>
                    <?php echo Alert::widget([
                        'body' => ArrayHelper::getValue(Yii::$app->session->getFlash('alert'), 'body'),
                        'options' => ArrayHelper::getValue(Yii::$app->session->getFlash('alert'), 'options'),
                    ]) ?>
                <?php endif; ?>
                <?php echo $content ?>
            </div>
        </section>
        <!-- /main content -->

        <?php echo Html::a(FAS::icon('chevron-up'), '#', [
            'class' => ['btn', 'btn-primary', 'back-to-top'],
            'role' => 'button',
            'aria-label' => 'Scroll to top',
        ]) ?>
    </div>
    <!-- /content wrapper -->

    <!-- footer -->
    <footer class="main-footer <?php echo $keyStorage->get('adminlte.footer-small-text') ? 'text-sm' : null ?>">
        <strong>&copy; <?php echo Yii::$app->name . " " . date('Y') ?></strong>
    </footer>
    <!-- /footer -->

    <?php if (Yii::$app->user->can('administrator')) : ?>
    <!-- control sidebar -->
    <div class="control-sidebar control-sidebar-dark overflow-auto">
        <div class="control-sidebar-content p-3">
            <?php echo FormWidget::widget([
                'model' => new FormModel([
                    'keys' => [
                        'frontend.options' => [
                            'type' => FormModel::TYPE_HEADER,
                            'content' => 'Frontend Options'
                        ],
                        'frontend.maintenance' => [
                            'label' => Yii::t('backend', 'Maintenance mode'),
                            'type' => FormModel::TYPE_DROPDOWN,
                            'items' => [
                                'disabled' => Yii::t('backend', 'Disabled'),
                                'enabled' => Yii::t('backend', 'Enabled'),
                            ],
                        ],
                        'backend.options' => [
                            'type' => FormModel::TYPE_HEADER,
                            'content' => 'Backend Options'
                        ],
                        'adminlte.body-small-text' => [
                            'label' => Yii::t('backend', 'Body small text'),
                            'type' => FormModel::TYPE_CHECKBOX,
                        ],
                        'adminlte.no-navbar-border' => [
                            'label' => Yii::t('backend', 'No navbar border'),
                            'type' => FormModel::TYPE_CHECKBOX,
                        ],
                        'adminlte.navbar-small-text' => [
                            'label' => Yii::t('backend', 'Navbar small text'),
                            'type' => FormModel::TYPE_CHECKBOX,
                        ],
                        'adminlte.navbar-fixed' => [
                            'label' => Yii::t('backend', 'Fixed navbar'),
                            'type' => FormModel::TYPE_CHECKBOX,
                        ],
                        'adminlte.footer-small-text' => [
                            'label' => Yii::t('backend', 'Footer small text'),
                            'type' => FormModel::TYPE_CHECKBOX,
                        ],
                        'adminlte.footer-fixed' => [
                            'label' => Yii::t('backend', 'Fixed footer'),
                            'type' => FormModel::TYPE_CHECKBOX,
                        ],
                        'adminlte.sidebar-small-text' => [
                            'label' => Yii::t('backend', 'Sidebar small text'),
                            'type' => FormModel::TYPE_CHECKBOX,
                        ],
                        'adminlte.sidebar-flat' => [
                            'label' => Yii::t('backend', 'Sidebar flat style'),
                            'type' => FormModel::TYPE_CHECKBOX,
                        ],
                        'adminlte.sidebar-legacy' => [
                            'label' => Yii::t('backend', 'Sidebar legacy style'),
                            'type' => FormModel::TYPE_CHECKBOX,
                        ],
                        'adminlte.sidebar-compact' => [
                            'label' => Yii::t('backend', 'Sidebar compact style'),
                            'type' => FormModel::TYPE_CHECKBOX,
                        ],
                        'adminlte.sidebar-fixed' => [
                            'label' => Yii::t('backend', 'Fixed sidebar'),
                            'type' => FormModel::TYPE_CHECKBOX,
                        ],
                        'adminlte.sidebar-collapsed' => [
                            'label' => Yii::t('backend', 'Collapsed sidebar'),
                            'type' => FormModel::TYPE_CHECKBOX,
                        ],
                        'adminlte.sidebar-mini' => [
                            'label' => Yii::t('backend', 'Mini sidebar'),
                            'type' => FormModel::TYPE_CHECKBOX,
                        ],
                        'adminlte.sidebar-child-indent' => [
                            'label' => Yii::t('backend', 'Indent sidebar child menu items'),
                            'type' => FormModel::TYPE_CHECKBOX,
                        ],
                        'adminlte.sidebar-no-expand' => [
                            'label' => Yii::t('backend', 'Disable sidebar hover/focus auto expand'),
                            'type' => FormModel::TYPE_CHECKBOX,
                        ],
                        'adminlte.brand-small-text' => [
                            'label' => Yii::t('backend', 'Brand small text'),
                            'type' => FormModel::TYPE_CHECKBOX,
                        ],
                    ],
                ]),
                'submitText' => FAS::icon('save').' '.Yii::t('backend', 'Save'),
                'submitOptions' => ['class' => 'btn btn-primary'],
                'formOptions' => [
                    'action' => ['/settings/index'],
                    'method' => 'post'
                ],
            ]) ?>
        </div>
    </div>
    <!-- /control sidebar -->
    <?php endif; ?>
</div>
<?php $this->endContent(); ?>
