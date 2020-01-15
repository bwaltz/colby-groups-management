<?php

namespace App;

use \Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\SoftDeletes;
use \Kalnoy\Nestedset\NodeTrait;


class Group extends Model
{
    use SoftDeletes;
    use NodeTrait;

    protected $fillable = array('name', 'description', 'parent_id');

}