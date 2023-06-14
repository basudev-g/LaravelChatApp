<?php

use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/chat', [ChatController::class, 'chat'])->name('chat');
Route::post('/send', [ChatController::class, 'send'])->name('send');
Route::post('/saveToSession', [ChatController::class, 'saveToSession'])->name('save');
Route::post('/getOldMessages', [ChatController::class, 'getOldMessages'])->name('getChat');
Route::post('/deleteChatHistory', [ChatController::class, 'deleteChatHistory'])->name('deleteChat');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
