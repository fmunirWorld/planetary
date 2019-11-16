<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Satellite extends Model
{
    protected $table = 'satellites';
    protected $primaryKey = 'satellite_id';
    public $timestamps = false;
    protected $fillable = ['satellite_name', 'is_regular', 'radius', 'discovery_year', 'planet'];

    public function getKeyName(){
        return "satellite_id";
    }

    public function planet()
    {
        return $this->belongsTo('App\Planet', 'planet_id');
    }
}
