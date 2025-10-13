<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('spp/welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('spp/dashboard');
    })->name('dashboard');

    Route::get('forms', function () {
        return Inertia::render('spp/forms');
    })->name('forms');

    Route::get('forms/surat-tugas', function () {
        return Inertia::render('spp/forms/surat-tugas');
    })->name('forms.surat-tugas');

    Route::get('forms/surat-tugas/{id}/preview', function (string $id) {
        return Inertia::render('spp/forms/surat-tugas-preview', [
            'id' => $id,
        ]);
    })->name('forms.surat-tugas.preview');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
