<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSatellitesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('satellites', function (Blueprint $table) {
            $table->bigIncrements('satellite_id');
            $table->string('satellite_name');
            $table->boolean('is_regular');
            $table->double('radius');
            $table->year('discovery_year');
            $table->unsignedBigInteger('planet');
            $table->foreign('planet')
                ->references('planet_id')->on('planets')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('satellites');
    }
}
