<?php

namespace tests\common\traits;

trait UnitTestHelper {

    public function fieldIsPresent($model, $field, $addBlankStrings = false)
    {
        $blanks = [ NULL ];
        if ($addBlankStrings) {
            array_push($blanks, [ '', '     ' ]);
        }

        foreach ($blanks as $blank) {
            $model->setAttribute($field, $blank);
            $this->assertFalse($model->validate());
        }
    }

    public function fieldHasType($model, $field, $type)
    {
        $assorted_values = [ true, 'string', 1, 1.23, ['array'] ];
        $invalid_values = array_filter($assorted_values, function($val) use ($type) {
            return gettype($val) !== $type;
        });

        foreach ($invalid_values as $invalid) {
            $model->setAttribute($field, $invalid);
            $this->assertFalse($model->validate([$field]));
        }
    }

    public function fieldHasMaxLength($model, $field, $maxLen)
    {
        $model->setAttribute($field, str_repeat('a', $maxLen));
        $this->assertTrue($model->validate([$field]));

        $model->setAttribute($field, str_repeat('a', $maxLen + 1));
        $this->assertFalse($model->validate([$field]));
    }

    public function fieldHasPermittedValue($model, $field, $permitted, $unpermitted)
    {
        foreach($permitted as $val) {
            $model->setAttribute($field, $val);
            $this->assertTrue($model->validate([$field]));
        }

        foreach($unpermitted as $val) {
            $model->setAttribute($field, $val);
            $this->assertFalse($model->validate([$field]));
        }
    }

    public function fieldHasValidReference($model, $field, $validIds, $invalidIds, $name)
    {
        foreach($validIds as $id) {
            $this->$name->$field = $id;
            $this->assertTrue($model->validate([$field]));
        }

        foreach($invalidIds as $id) {
            $this->$name->$field = $id;
            $this->assertFalse($model->validate([$field]));
        }
    }
}
