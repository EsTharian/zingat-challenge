<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::post('/document', 'HomeController@getFileNames');
Route::get('/document/{doc_id}', 'HomeController@getTokenizedFile')->middleware('token');

Route::middleware('auth')->group(function () {
    Route::post('/get-api-token', 'HomeController@getApiToken');
    Route::post('/new-api-token', 'HomeController@newApiToken');
    Route::post('/get-api-token-expires', 'HomeController@getApiTokenExpires');
});
