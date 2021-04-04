<?php

namespace common\models;

use trntv\filekit\behaviors\UploadBehavior;
use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "user_profile".
 *
 * @property int $user_id
 * @property string|null $firstname
 * @property string|null $lastname
 * @property string|null $avatar_path
 * @property string|null $avatar_base_url
 * @property string $locale
 * @property int|null $gender
 * @property string|null $mobile
 * @property string|null $highest_qualification
 * @property int|null $school_id
 * @property int|null $subscribe_newsletter
 * @property string|null $country_code
 * @property string|null $nationality
 * @property string|null $awarding_institute
 * @property int|null $year_of_graduation
 *
 * @property User $user
 */
class UserProfile extends ActiveRecord
{
    const GENDER_MALE = 1;
    const GENDER_FEMALE = 2;

    /**
     * @var
     */
    public $picture;

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%user_profile}}';
    }

    /**
     * @return array
     */
    public function behaviors()
    {
        return [
            'picture' => [
                'class' => UploadBehavior::class,
                'attribute' => 'picture',
                'pathAttribute' => 'avatar_path',
                'baseUrlAttribute' => 'avatar_base_url'
            ]
        ];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['gender', 'school_id', 'subscribe_newsletter', 'year_of_graduation'], 'integer'],
            [['gender'], 'in', 'range' => [NULL, self::GENDER_FEMALE, self::GENDER_MALE]],
            [['firstname', 'lastname', 'avatar_path', 'avatar_base_url', 'mobile', 'highest_qualification', 'nationality', 'awarding_institute'], 'string', 'max' => 255],
            [['locale'], 'string', 'max' => 32],
            [['country_code'], 'string', 'max' => 45],
            ['picture', 'safe'],
            [['mobile', 'highest_qualification', 'nationality', 'awarding_institute', 'country_code'], 'default', 'value'=>""],
            // [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'user_id' => 'User ID',
            'firstname' => 'Firstname',
            'lastname' => 'Lastname',
            'avatar_path' => 'Avatar Path',
            'avatar_base_url' => 'Avatar Base Url',
            'locale' => 'Locale',
            'gender' => 'Gender',
            'mobile' => 'Mobile',
            'highest_qualification' => 'Highest Qualification',
            'school_id' => 'School ID',
            'subscribe_newsletter' => 'Subscribe Newsletter',
            'country_code' => 'Country Code',
            'nationality' => 'Nationality',
            'awarding_institute' => 'Awarding Institute',
            'year_of_graduation' => 'Year Of Graduation',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    /**
     * @return null|string
     */
    public function getFullName()
    {
        if ($this->firstname || $this->lastname) {
            return implode(' ', [$this->firstname, $this->lastname]);
        }
        return null;
    }

    /**
     * @param null $default
     * @return bool|null|string
     */
    public function getAvatar($default = null)
    {
        return $this->avatar_path
            ? Yii::getAlias($this->avatar_base_url . '/' . $this->avatar_path)
            : $default;
    }

    public function fields() {
        return [
            'firstname',
            'lastname',
            'mobile',
            'highest_qualification',
            'school_id',
            'subscribe_newsletter',
            'country_code',
            'nationality',
            'year_of_graduation',
            'awarding_institute',
        ];
    }
}
