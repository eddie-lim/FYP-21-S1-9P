<?php
  namespace common\components;

  use Yii;
  use common\components\Settings;
  use yii\helpers\StringHelper;

  class Utility {
    public static function enclose_quotes_str($arr) {
      return implode(',', array_map(array(__CLASS__, 'add_quotes'), $arr));
    }
    public static function add_quotes($str) {
      return sprintf("'%s'", $str);
    }
    public static function randomToken($length = 32) {
      return Yii::$app->getSecurity()->generateRandomString($length);
      // return substr(bin2hex(random_bytes($length)), 0, $length);
    }

    public static function truncate($str, $max) {
      return StringHelper::truncate($str, $max);
      /*if($str) {
          return strlen($str) > $max ? substr($str, 0, $max -1)."..." : $str;
      }*/
    }
    public static function guid() {
      //GUID v4
      $data = random_bytes(16);
      assert(strlen($data) == 16);

      $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
      $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10

      return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
    public static function getJsParseDate($date) {
      return JsExpressionHelper::parse($this->date);
    }
    //https://odan.github.io/2017/08/10/aes-256-encryption-and-decryption-in-php-and-csharp.html
    //Encryption function
    public static function encrypt($plaintext) {
      //$plaintext = 'My secret message 1234';
      $password = Settings::ENCRYPT_KEY;
      $method = 'aes-256-cbc';
      $key = substr(hash('sha256', $password, true), 0, 32);
      $iv = chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0);
      $encrypted = base64_encode(openssl_encrypt($plaintext, $method, $key, OPENSSL_RAW_DATA, $iv));
      return $encrypted;
    }
    //Decryption function
    public static function decrypt($encrypted) {
      $password = Settings::ENCRYPT_KEY;
      $method = 'aes-256-cbc';
      $key = substr(hash('sha256', $password, true), 0, 32);
      $iv = chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0) . chr(0x0);
      $plaintext = openssl_decrypt(base64_decode($encrypted), $method, $key, OPENSSL_RAW_DATA, $iv);
      return $plaintext;
    }
    public static function humanTiming($time) {
        $time = ($time<1)? 1 : $time;
        $tokens = array (
            31536000 => 'year',
            2592000 => 'month',
            604800 => 'week',
            86400 => 'day',
            3600 => 'hour',
            60 => 'minute',
            1 => 'second'
        );

        foreach ($tokens as $unit => $text) {
            if ($time < $unit) continue;
            $numberOfUnits = floor($time / $unit);
            return $numberOfUnits.' '.$text.(($numberOfUnits>1)?'s':'');
        }
    }
    public static function jsonifyError($field = "", $message = "", $message_key = "") {
      $result = [
          'field' => $field,
          'message' => $message,
          'message_key' => $message_key
      ];

      $e = json_encode([$result]);
      $e = preg_replace("/\n/", "", $e);
      return $e;        
    }
    public static function getClientIp() {
      $ipaddress = '';
      if (getenv('HTTP_CLIENT_IP'))
        $ipaddress = getenv('HTTP_CLIENT_IP');
      else if(getenv('HTTP_X_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
      else if(getenv('HTTP_X_FORWARDED'))
        $ipaddress = getenv('HTTP_X_FORWARDED');
      else if(getenv('HTTP_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_FORWARDED_FOR');
      else if(getenv('HTTP_FORWARDED'))
       $ipaddress = getenv('HTTP_FORWARDED');
      else if(getenv('REMOTE_ADDR'))
        $ipaddress = getenv('REMOTE_ADDR');
      else
        $ipaddress = 'UNKNOWN';
      return $ipaddress;
    }

    public static function getYoutubeVideoId($youtube_url) {
      $youtube_id = "";
      parse_str( parse_url( $youtube_url, PHP_URL_QUERY ), $my_array_of_vars );
      if(isset($my_array_of_vars['v'])) {
        $youtube_id = $my_array_of_vars['v'];
      } else {
        $d = explode('/', parse_url($youtube_url, PHP_URL_PATH));
        $youtube_id = isset($d[1]) ? $d[1] : "";
      }
      return $youtube_id;  
    }

    public static function formatNumberString($value, $prefix_length) {
      $formatted = "";
      if (strlen($value) < $prefix_length) {
        $prefix = $prefix_length - strlen($value);
        for ($i = 0; $i < $prefix; $i++) {
          $formatted .= '0';
        }
        $formatted .= $value;
      }
      return $formatted;
    }
    public static function formatNumberToOrdinalWord($number){
      $formatter = new \NumberFormatter('en_US', \NumberFormatter::SPELLOUT);
      $formatter->setTextAttribute(\NumberFormatter::DEFAULT_RULESET, "%spellout-ordinal");
      return strtoupper($formatter->format($number));
    }

    public static function replacePathAccordingToOS($filepath = "") {
      if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
          $filepath = str_replace('\\', '/', $filepath);
          // echo 'This is a server using Windows!';
      } /*else {
        $filepath
          // echo 'This is a server not using Windows!';
      }*/
      return $filepath;
    }

    public static function countryList() {
        return array(
          'AD'=>array('name'=>'Andorra','code'=>'376'),
          'AE'=>array('name'=>'United Arab Emirates','code'=>'971'),
          'AF'=>array('name'=>'Afghanistan','code'=>'93'),
          'AG'=>array('name'=>'Antigua and Barbuda','code'=>'1268'),
          'AI'=>array('name'=>'Anguilla','code'=>'1264'),
          'AL'=>array('name'=>'Albania','code'=>'355'),
          'AM'=>array('name'=>'Armenia','code'=>'374'),
          'AO'=>array('name'=>'Angola','code'=>'244'),
          'AQ'=>array('name'=>'Antarctica','code'=>'672'),
          'AR'=>array('name'=>'Argentina','code'=>'54'),
          'AS'=>array('name'=>'American Samoa','code'=>'1684'),
          'AT'=>array('name'=>'Austria','code'=>'43'),
          'AU'=>array('name'=>'Australia','code'=>'61'),
          'AW'=>array('name'=>'Aruba','code'=>'297'),
          'AZ'=>array('name'=>'Azerbaijan','code'=>'994'),
          'BA'=>array('name'=>'Bosnia and Herzegovina','code'=>'387'),
          'BB'=>array('name'=>'Barbados','code'=>'1246'),
          'BD'=>array('name'=>'Bangladesh','code'=>'880'),
          'BE'=>array('name'=>'Belgium','code'=>'32'),
          'BF'=>array('name'=>'Burkina Faso','code'=>'226'),
          'BG'=>array('name'=>'Bulgaria','code'=>'359'),
          'BH'=>array('name'=>'Bahrain','code'=>'973'),
          'BI'=>array('name'=>'Burundi','code'=>'257'),
          'BJ'=>array('name'=>'Benin','code'=>'229'),
          'BM'=>array('name'=>'Bermuda','code'=>'1441'),
          'BN'=>array('name'=>'Brunei Darussalam','code'=>'673'),
          'BO'=>array('name'=>'Bolivia','code'=>'591'),
          'BR'=>array('name'=>'Brazil','code'=>'55'),
          'BS'=>array('name'=>'Bahamas','code'=>'1242'),
          'BT'=>array('name'=>'Bhutan','code'=>'975'),
          'BW'=>array('name'=>'Botswana','code'=>'267'),
          'BY'=>array('name'=>'Belarus','code'=>'375'),
          'BZ'=>array('name'=>'Belize','code'=>'501'),
          'CA'=>array('name'=>'Canada','code'=>'1'),
          'CD'=>array('name'=>'Congo, Dem. Rep.','code'=>'243'),
          'CF'=>array('name'=>'Central African Republic','code'=>'236'),
          'CG'=>array('name'=>'Congo','code'=>'242'),
          'CH'=>array('name'=>'Switzerland','code'=>'41'),
          'CI'=>array('name'=>'Cote d ivoire','code'=>'225'),
          'CK'=>array('name'=>'Cook islands','code'=>'682'),
          'CL'=>array('name'=>'Chile','code'=>'56'),
          'CM'=>array('name'=>'Cameroon','code'=>'237'),
          'CN'=>array('name'=>'China','code'=>'86'),
          'CO'=>array('name'=>'Colombia','code'=>'57'),
          'CR'=>array('name'=>'Costa Rica','code'=>'506'),
          'CU'=>array('name'=>'Cuba','code'=>'53'),
          'CX'=>array('name'=>'Christmas island','code'=>'61'),
          'CY'=>array('name'=>'Cyprus','code'=>'357'),
          'CZ'=>array('name'=>'Czech Republic','code'=>'420'),
          'DE'=>array('name'=>'Germany','code'=>'49'),
          'DJ'=>array('name'=>'Djibouti','code'=>'253'),
          'DK'=>array('name'=>'Denmark','code'=>'45'),
          'DM'=>array('name'=>'Dominica','code'=>'1767'),
          'DO'=>array('name'=>'Dominican Republic','code'=>'1809'),
          'DZ'=>array('name'=>'Algeria','code'=>'213'),
          'EC'=>array('name'=>'Ecuador','code'=>'593'),
          'EE'=>array('name'=>'Estonia','code'=>'372'),
          'EG'=>array('name'=>'Egypt','code'=>'20'),
          'ER'=>array('name'=>'Eritrea','code'=>'291'),
          'ES'=>array('name'=>'Spain','code'=>'34'),
          'ET'=>array('name'=>'Ethiopia','code'=>'251'),
          'FI'=>array('name'=>'Finland','code'=>'358'),
          'FJ'=>array('name'=>'Fiji','code'=>'679'),
          'FK'=>array('name'=>'Falkland Islands (malvinas)','code'=>'500'),
          'FM'=>array('name'=>'Micronesia, Fed. Sts.','code'=>'691'),
          'FO'=>array('name'=>'Faroe Islands','code'=>'298'),
          'FR'=>array('name'=>'France','code'=>'33'),
          'GA'=>array('name'=>'Gabon','code'=>'241'),
          'GB'=>array('name'=>'United Kingdom','code'=>'44'),
          'GD'=>array('name'=>'Grenada','code'=>'1473'),
          'GE'=>array('name'=>'Georgia','code'=>'995'),
          'GH'=>array('name'=>'Ghana','code'=>'233'),
          'GI'=>array('name'=>'Gibraltar','code'=>'350'),
          'GL'=>array('name'=>'Greenland','code'=>'299'),
          'GM'=>array('name'=>'Gambia','code'=>'220'),
          'GN'=>array('name'=>'Guinea','code'=>'224'),
          'GQ'=>array('name'=>'Equatorial Guinea','code'=>'240'),
          'GR'=>array('name'=>'Greece','code'=>'30'),
          'GT'=>array('name'=>'Guatemala','code'=>'502'),
          'GU'=>array('name'=>'Guam','code'=>'1671'),
          'GW'=>array('name'=>'Guinea-Bissau','code'=>'245'),
          'GY'=>array('name'=>'Guyana','code'=>'592'),
          'HK'=>array('name'=>'Hong kong','code'=>'852'),
          'HN'=>array('name'=>'Honduras','code'=>'504'),
          'HR'=>array('name'=>'Croatia','code'=>'385'),
          'HT'=>array('name'=>'Haiti','code'=>'509'),
          'HU'=>array('name'=>'Hungary','code'=>'36'),
          'ID'=>array('name'=>'Indonesia','code'=>'62'),
          'IE'=>array('name'=>'Ireland','code'=>'353'),
          'IL'=>array('name'=>'Israel','code'=>'972'),
          'IM'=>array('name'=>'Isle of Man','code'=>'44'),
          'IN'=>array('name'=>'India','code'=>'91'),
          'IQ'=>array('name'=>'Iraq','code'=>'964'),
          'IR'=>array('name'=>'Iran, Islamic Rep.','code'=>'98'),
          'IS'=>array('name'=>'Iceland','code'=>'354'),
          'IT'=>array('name'=>'Italy','code'=>'39'),
          'JM'=>array('name'=>'Jamaica','code'=>'1876'),
          'JO'=>array('name'=>'Jordan','code'=>'962'),
          'JP'=>array('name'=>'Japan','code'=>'81'),
          'KE'=>array('name'=>'Kenya','code'=>'254'),
          'KH'=>array('name'=>'Cambodia','code'=>'855'),
          'KI'=>array('name'=>'Kiribati','code'=>'686'),
          'KM'=>array('name'=>'Comoros','code'=>'269'),
          'KP'=>array('name'=>"Korea, Dem. People's Rep.",'code'=>'850'),
          'KR'=>array('name'=>'Korea, Rep.','code'=>'82'),
          'KW'=>array('name'=>'Kuwait','code'=>'965'),
          'KY'=>array('name'=>'Cayman Islands','code'=>'1345'),
          'LA'=>array('name'=>'Lao PDR','code'=>'856'),
          'LB'=>array('name'=>'Lebanon','code'=>'961'),
          'LC'=>array('name'=>'Saint lucia','code'=>'1758'),
          'LI'=>array('name'=>'Liechtenstein','code'=>'423'),
          'LK'=>array('name'=>'Sri Lanka','code'=>'94'),
          'LR'=>array('name'=>'Liberia','code'=>'231'),
          'LS'=>array('name'=>'Lesotho','code'=>'266'),
          'LT'=>array('name'=>'Lithuania','code'=>'370'),
          'LU'=>array('name'=>'Luxembourg','code'=>'352'),
          'LV'=>array('name'=>'Latvia','code'=>'371'),
          'MA'=>array('name'=>'Morocco','code'=>'212'),
          'MC'=>array('name'=>'Monaco','code'=>'377'),
          'MD'=>array('name'=>'Moldova','code'=>'373'),
          'ME'=>array('name'=>'Montenegro','code'=>'382'),
          'MF'=>array('name'=>'Saint Martin','code'=>'1599'),
          'MG'=>array('name'=>'Madagascar','code'=>'261'),
          'MH'=>array('name'=>'Marshall Islands','code'=>'692'),
          'MK'=>array('name'=>'North Macedonia','code'=>'389'),
          'ML'=>array('name'=>'Mali','code'=>'223'),
          'MM'=>array('name'=>'Myanmar','code'=>'95'),
          'MN'=>array('name'=>'Mongolia','code'=>'976'),
          'MO'=>array('name'=>'Macau','code'=>'853'),
          'MP'=>array('name'=>'Northern Mariana Islands','code'=>'1670'),
          'MR'=>array('name'=>'Mauritania','code'=>'222'),
          'MS'=>array('name'=>'Montserrat','code'=>'1664'),
          'MT'=>array('name'=>'Malta','code'=>'356'),
          'MU'=>array('name'=>'Mauritius','code'=>'230'),
          'MV'=>array('name'=>'Maldives','code'=>'960'),
          'MW'=>array('name'=>'Malawi','code'=>'265'),
          'MX'=>array('name'=>'Mexico','code'=>'52'),
          'MY'=>array('name'=>'Malaysia','code'=>'60'),
          'MZ'=>array('name'=>'Mozambique','code'=>'258'),
          'NA'=>array('name'=>'Namibia','code'=>'264'),
          'NC'=>array('name'=>'New Caledonia','code'=>'687'),
          'NE'=>array('name'=>'Niger','code'=>'227'),
          'NG'=>array('name'=>'Nigeria','code'=>'234'),
          'NI'=>array('name'=>'Nicaragua','code'=>'505'),
          'NL'=>array('name'=>'Netherlands','code'=>'31'),
          'NO'=>array('name'=>'Norway','code'=>'47'),
          'NP'=>array('name'=>'Nepal','code'=>'977'),
          'NR'=>array('name'=>'Nauru','code'=>'674'),
          'NZ'=>array('name'=>'New Zealand','code'=>'64'),
          'OM'=>array('name'=>'Oman','code'=>'968'),
          'PA'=>array('name'=>'Panama','code'=>'507'),
          'PE'=>array('name'=>'Peru','code'=>'51'),
          'PF'=>array('name'=>'French Polynesia','code'=>'689'),
          'PG'=>array('name'=>'Papua New Guinea','code'=>'675'),
          'PH'=>array('name'=>'Philippines','code'=>'63'),
          'PK'=>array('name'=>'Pakistan','code'=>'92'),
          'PL'=>array('name'=>'Poland','code'=>'48'),
          'PR'=>array('name'=>'Puerto Rico','code'=>'1'),
          'PT'=>array('name'=>'Portugal','code'=>'351'),
          'PW'=>array('name'=>'Palau','code'=>'680'),
          'PY'=>array('name'=>'Paraguay','code'=>'595'),
          'QA'=>array('name'=>'Qatar','code'=>'974'),
          'RO'=>array('name'=>'Romania','code'=>'40'),
          'RS'=>array('name'=>'Serbia','code'=>'381'),
          'RU'=>array('name'=>'Russian Federation','code'=>'7'),
          'RW'=>array('name'=>'Rwanda','code'=>'250'),
          'SA'=>array('name'=>'Saudi Arabia','code'=>'966'),
          'SB'=>array('name'=>'Solomon Islands','code'=>'677'),
          'SC'=>array('name'=>'Seychelles','code'=>'248'),
          'SD'=>array('name'=>'Sudan','code'=>'249'),
          'SE'=>array('name'=>'Sweden','code'=>'46'),
          'SG'=>array('name'=>'Singapore','code'=>'65'),
          'SH'=>array('name'=>'Saint Helena','code'=>'290'),
          'SI'=>array('name'=>'Slovenia','code'=>'386'),
          'SK'=>array('name'=>'Slovakia','code'=>'421'),
          'SL'=>array('name'=>'Sierra Leone','code'=>'232'),
          'SM'=>array('name'=>'San Marino','code'=>'378'),
          'SN'=>array('name'=>'Senegal','code'=>'221'),
          'SO'=>array('name'=>'Somalia','code'=>'252'),
          'SR'=>array('name'=>'Suriname','code'=>'597'),
          'SV'=>array('name'=>'El Salvador','code'=>'503'),
          'SY'=>array('name'=>'Syrian Arab Republic','code'=>'963'),
          'SZ'=>array('name'=>'Swaziland','code'=>'268'),
          'TC'=>array('name'=>'Turks and Caicos Islands','code'=>'1649'),
          'TD'=>array('name'=>'Chad','code'=>'235'),
          'TG'=>array('name'=>'Togo','code'=>'228'),
          'TH'=>array('name'=>'Thailand','code'=>'66'),
          'TJ'=>array('name'=>'Tajikistan','code'=>'992'),
          'TL'=>array('name'=>'Timor-Leste','code'=>'670'),
          'TM'=>array('name'=>'Turkmenistan','code'=>'993'),
          'TN'=>array('name'=>'Tunisia','code'=>'216'),
          'TO'=>array('name'=>'Tonga','code'=>'676'),
          'TR'=>array('name'=>'Turkey','code'=>'90'),
          'TT'=>array('name'=>'Trinidad and Tobago','code'=>'1868'),
          'TV'=>array('name'=>'Tuvalu','code'=>'688'),
          'TW'=>array('name'=>'Taiwan','code'=>'886'),
          'TZ'=>array('name'=>'Tanzania','code'=>'255'),
          'UA'=>array('name'=>'Ukraine','code'=>'380'),
          'UG'=>array('name'=>'Uganda','code'=>'256'),
          'US'=>array('name'=>'United States of America','code'=>'1'),
          'UY'=>array('name'=>'Uruguay','code'=>'598'),
          'UZ'=>array('name'=>'Uzbekistan','code'=>'998'),
          'VE'=>array('name'=>'Venezuela','code'=>'58'),
          'VG'=>array('name'=>'British Virgin Islands','code'=>'1284'),
          'VI'=>array('name'=>'Virgin Islands, u.s.','code'=>'1340'),
          'VN'=>array('name'=>'Vietnam','code'=>'84'),
          'VU'=>array('name'=>'Vanuatu','code'=>'678'),
          'WS'=>array('name'=>'American Samoa','code'=>'685'),
          'XK'=>array('name'=>'Kosovo','code'=>'381'),
          'YE'=>array('name'=>'Yemen, Rep.','code'=>'967'),
          'ZA'=>array('name'=>'South Africa','code'=>'27'),
          'SS'=>array('name'=>'South Sudan','code'=>'211'),
          'ZM'=>array('name'=>'Zambia','code'=>'260'),
          'ZW'=>array('name'=>'Zimbabwe','code'=>'263')
        );
    }

    public static function getPreSignedS3Url($path) {
        return Yii::$app->myS3Client->getPreSignedS3Url($path);
    }    
    
  }

?>