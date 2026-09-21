<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource('products', ProductController::class)->except(['create', 'show', 'edit']);
     Route::resource('categories', CategoryController::class)->except(['create', 'show', 'edit']);
});

require __DIR__.'/settings.php';
