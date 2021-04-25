<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
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
Route::group([

    'middleware' => 'api'

], function ($router) {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('user', [AuthController::class, 'me']);
    Route::post('refreshJWT', [AuthController::class, 'refresh']);
    Route::post('logout', [AuthController::class, 'logout']);


    //product
    Route::get('product', [ProductController::class, 'listProduct']);
    Route::get('editProduct/{id}', [ProductController::class, 'edit']);
    Route::post('updateProduct/{id}', [ProductController::class, 'update']);
    Route::post('deleteProduct/{id}', [ProductController::class, 'destroy']);

    //user
    Route::get('listUser', [UserController::class, 'listUser']);
    Route::get('editUser/{id}', [UserController::class, 'edit']);
    Route::post('updateUser/{id}', [UserController::class, 'update']);
    Route::post('deleteUser/{id}', [UserController::class, 'destroy']);

});
