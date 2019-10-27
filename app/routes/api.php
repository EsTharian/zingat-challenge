<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/document/{doc_id}', 'HomeController@getTokenizedFile')->middleware('token');
    Route::get('/new-api-token', 'HomeController@newApiToken');
    Route::get('/expire-the-token', 'HomeController@expireToken');
});
