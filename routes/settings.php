<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('settings', function () {
        return Inertia::render('spp/settings/index');
    })->name('settings.index');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');

    Route::put('settings/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('password.update');

    Route::get('settings/security', function () {
        return Inertia::render('spp/settings/security');
    })->name('security.index');

    Route::get('settings/email', function () {
        return Inertia::render('spp/settings/email');
    })->name('email.index');

    Route::get('settings/appearance', function () {
        return Inertia::render('spp/settings/appearance');
    })->name('appearance.edit');

    Route::get('settings/verification', function () {
        return Inertia::render('spp/settings/verification');
    })->name('verification.index');

    Route::get('settings/two-factor', [TwoFactorAuthenticationController::class, 'show'])
        ->name('two-factor.show');
});
