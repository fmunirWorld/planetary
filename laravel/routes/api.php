<?php

use Illuminate\Http\Request;
Use App\Planet;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('', function () {
    $app_name = getenv('LR_APP_NAME');
    if ($app_name) {
        return response()->json([
            'message'=>'Hello from ' . $app_name . ' running in a Docker container behind Nginx!'
        ], 200);
    }

    return response()->json([
        'message'=>'Hello from Laravel!'
    ], 200);
});

Route::get('planets', 'PlanetController@index');
Route::get('planets/{id}', 'PlanetController@show');
Route::post('planets', 'PlanetController@store');
Route::put('planets/{planet}', 'PlanetController@update');
Route::delete('planets/{planet}', 'PlanetController@delete');
Route::get('planets/{planet}/satellites', 'PlanetController@satellites');

Route::get('satellites', 'SatelliteController@index');
Route::get('satellites/{id}', 'SatelliteController@show');
Route::post('satellites', 'SatelliteController@store');
Route::put('satellites/{satellite}', 'SatelliteController@update');
Route::delete('satellites/{satellite}', 'SatelliteController@delete');
