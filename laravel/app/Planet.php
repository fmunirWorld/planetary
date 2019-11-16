<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Planet extends Model
{
    protected $table = 'planets';
    protected $primaryKey = 'planet_id';
    public $timestamps = false;
    protected $fillable = ['planet_name', 'home_star', 'mass', 'radius', 'distance'];
    protected $with = ['satellites'];

    public function getKeyName(){
        return "planet_id";
    }

    public function satellites()
    {
        return $this->hasMany('App\Satellite', 'planet');
    }
}
