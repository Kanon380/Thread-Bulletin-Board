<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\ResponseController;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth',  'verified'])->name('dashboard');

Route::get('/dashboard', [ThreadController::class, 'index'])->middleware(['auth',  'verified'])->name('dashboard');

Route::prefix('thread')->name('thread.')->group(function () {
    Route::get('/show', [ThreadController::class, 'show'])->middleware(['auth',  'verified'])->name('show');
    Route::get('/create', [ThreadController::class, 'create'])->middleware(['auth',  'verified'])->name('create');
    Route::get('/store', [ThreadController::class, 'store'])->middleware(['auth',  'verified'])->name('store');
});

Route::prefix('response')->name('response.')->group(function () {
    Route::get('/create', [ResponseController::class, 'create'])->middleware(['auth',  'verified'])->name('create');
    Route::post('/store', [ResponseController::class, 'store'])->middleware(['auth',  'verified'])->name('store');
    Route::get('/edit', [ResponseController::class, 'edit'])->middleware(['auth',  'verified'])->name('edit');
    Route::get('/update', [ResponseController::class, 'update'])->middleware(['auth',  'verified'])->name('update');
    Route::get('/delete', [ResponseController::class, 'delete'])->middleware(['auth',  'verified'])->name('delete');
});

require __DIR__ . '/auth.php';

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index'])->middleware(['auth:admin',  'verified'])->name('dashboard');
    Route::get('/delete', [AdminController::class, 'delete'])->middleware(['auth:admin',  'verified'])->name('delete');
    require __DIR__ . '/admin.php';
});
