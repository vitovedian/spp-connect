<?php

use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\SuratTugasController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('surat-tugas', SuratTugasController::class);
    Route::apiResource('invoices', InvoiceController::class);
});
