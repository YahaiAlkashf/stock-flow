<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Category/Index', [
        'appName' => config('app.name', 'My Desktop App'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/categories', function () {
    return Inertia::render('Category/Index', [
        'appName' => config('app.name', 'My Desktop App'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Index', [
        'appName' => config('app.name', 'My Desktop App'),
    ]);
});

Route::prefix('api')->group(function () {
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
});
