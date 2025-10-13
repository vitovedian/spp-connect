<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Support\SuratTugasRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Spatie\LaravelPdf\Facades\Pdf;

class SuratTugasPdfController extends Controller
{
    public function download(Request $request, string $id): Response|RedirectResponse
    {
        $record = SuratTugasRepository::find($id);

        if (! $record || $record['status'] !== 'Disetujui') {
            return redirect()
                ->back()
                ->with('error', 'Surat tugas belum tersedia untuk pratinjau PDF.');
        }

        $picId = $request->query('pic');
        $pic = collect($record['pics'])->first(static fn (array $candidate): bool => $candidate['id'] === $picId) ?? $record['pics'][0] ?? null;

        if (! $pic) {
            return redirect()
                ->back()
                ->with('error', 'Data PIC tidak ditemukan.');
        }

        $incomplete = [];
        if (empty($pic['role'])) {
            $incomplete[] = 'Peran belum diisi';
        }

        $viewData = [
            'record' => array_merge($record, [
                'selected_pic' => $pic,
                'selected_pic_missing' => $incomplete,
            ]),
            'formatted_letter_number' => $record['letter_number'],
            'submitted_at' => SuratTugasRepository::formatDateTime($record['submitted_at']),
            'event_period' => sprintf(
                '%s - %s',
                SuratTugasRepository::formatDateTime($record['event_start'], false),
                SuratTugasRepository::formatDateTime($record['event_end'], false)
            ),
            'event_start' => SuratTugasRepository::formatDateTime($record['event_start'], false),
            'event_end' => SuratTugasRepository::formatDateTime($record['event_end'], false),
            'total_fee' => SuratTugasRepository::calculateTotalFee($record),
        ];

        $pdf = Pdf::view('pdf.surat-tugas', $viewData)
            ->format('a4')
            ->name($record['id'] . '-' . $pic['id'] . '.pdf');

        $fileNameBase = $record['id'].'-'.$pic['id'];

        if ($request->boolean('download')) {
            $pdf->download($fileNameBase);
        } else {
            $pdf->inline($fileNameBase);
        }

        return $pdf->toResponse($request);
    }
}
