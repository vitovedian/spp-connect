<?php

use App\Http\Controllers\SuratTugasPdfController;
use App\Support\SuratTugasRepository;
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
        $record = SuratTugasRepository::find($id);

        abort_unless($record && $record['status'] === 'Disetujui', 404);

        $pics = collect($record['pics'])->map(function (array $pic) {
            $missing = [];
            if (empty($pic['role'])) {
                $missing[] = 'Peran belum diisi';
            }

            return [
                'id' => $pic['id'],
                'name' => $pic['name'],
                'role' => $pic['role'],
                'missing' => $missing,
            ];
        })->values()->all();

        return Inertia::render('spp/forms/surat-tugas-preview', [
            'pdfUrl' => route('forms.surat-tugas.pdf', ['id' => $id]),
            'backUrl' => route('forms.surat-tugas'),
            'record' => [
                'id' => $record['id'],
                'letterNumber' => $record['letter_number'],
                'activityName' => $record['activity_name'],
                'status' => $record['status'],
                'statusNote' => $record['status_note'],
                'submittedAt' => SuratTugasRepository::formatDateTime($record['submitted_at']),
                'createdBy' => $record['created_by'],
                'clientName' => $record['client_name'] ?? null,
                'pics' => $pics,
            ],
        ]);
    })->name('forms.surat-tugas.preview');

    Route::get('forms/surat-tugas/{id}/pdf', [SuratTugasPdfController::class, 'download'])
        ->name('forms.surat-tugas.pdf');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
