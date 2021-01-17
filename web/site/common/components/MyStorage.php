<?php
namespace common\components;


use Yii;
use League\Flysystem\FilesystemInterface;
use trntv\filekit\events\StorageEvent;
use trntv\filekit\filesystem\FilesystemBuilderInterface;
use yii\base\Component;
use yii\base\InvalidConfigException;
use yii\helpers\FileHelper;
use trntv\filekit\Storage;
use trntv\filekit\File;

 
class MyStorage extends Storage
{
    
    public function save($file, $preserveFileName = false, $overwrite = false, $config = [], $pathPrefix = '')
    {
        $pathPrefix = FileHelper::normalizePath($pathPrefix);
        $fileObj = File::create($file);
        Yii::warning($fileObj);
        $dirIndex = $this->getDirIndex($pathPrefix);
        if ($preserveFileName === false) {
            do {
                $filename = implode('.', [
                    Yii::$app->security->generateRandomString(),
                    $fileObj->getExtension()
                ]);
                $path = implode(DIRECTORY_SEPARATOR, [$pathPrefix, $dirIndex, $filename]);
            } while ($this->getFilesystem()->has($path));
        } else {
            $filename = $fileObj->getPathInfo('filename');
            $path = implode(DIRECTORY_SEPARATOR, [$pathPrefix, $dirIndex, $file]);

            // $path = implode(DIRECTORY_SEPARATOR, [$pathPrefix, $dirIndex, "okoko.ok"]);
        }

        $this->beforeSave($fileObj->getPath(), $this->getFilesystem());

        $stream = fopen($fileObj->getPath(), 'r+');

        $defaultConfig = $this->defaultSaveConfig;

        if (is_callable($defaultConfig)) {
            $defaultConfig = call_user_func($defaultConfig, $fileObj);
        }

        if (is_callable($config)) {
            $config = call_user_func($config, $fileObj);
        }

        $config = array_merge(['ContentType' => $fileObj->getMimeType()], $defaultConfig, $config);

        if ($overwrite) {
            $success = $this->getFilesystem()->putStream($path, $stream, $config);
        } else {
            $success = $this->getFilesystem()->writeStream($path, $stream, $config);
        }

        if (is_resource($stream)) {
            fclose($stream);
        }

        if ($success) {
            $this->afterSave($path, $this->getFilesystem());
            return $path;
        }

        return false;
    }

    
}
