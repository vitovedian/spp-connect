<?php

namespace Database\Seeders;

use App\Models\Invoice;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class InvoiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        if (! $user) {
            $user = User::factory()->create([
                'name' => 'Demo User',
                'email' => 'demo@example.com',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]);
        }

        $invoices = [
            [
                'invoice_number' => 'INV-2025-001',
                'submission_date' => '2025-01-10',
                'invoice_date' => '2025-01-12',
                'activity_name' => 'Transformasi Digital 2025',
                'base_amount' => 30_000_000,
                'vat_option' => 'include',
                'amount_paid' => 15_000_000,
                'status' => 'Partial',
                'status_note' => 'Menunggu pembayaran termin kedua sebelum 11 Februari 2025.',
                'ope_items' => [
                    ['description' => 'Koordinasi Lapangan', 'quantity' => 1, 'unit_price' => 2_500_000],
                    ['description' => 'Perjalanan Tim Teknis', 'quantity' => 1, 'unit_price' => 7_500_000],
                ],
                'timeline' => [
                    ['label' => 'Pengajuan disetujui', 'date' => '2025-01-10 10:30:00'],
                    ['label' => 'Invoice diterbitkan', 'date' => '2025-01-12 08:15:00'],
                    ['label' => 'Pembayaran termin 1', 'date' => '2025-01-20 09:05:00', 'note' => 'Rp15.000.000'],
                ],
                'notes' => 'Termin akhir dapat dibayar via virtual account BNI atau Mandiri.',
                'payment_link' => 'https://pay.spp-connect.id/invoices/INV-2025-001',
                'created_at' => '2025-01-12 08:15:00',
                'updated_at' => '2025-01-20 09:05:00',
            ],
            [
                'invoice_number' => 'INV-2025-002',
                'submission_date' => '2025-01-22',
                'invoice_date' => '2025-01-25',
                'activity_name' => 'Monitoring Evaluasi Wilayah',
                'base_amount' => 21_000_000,
                'vat_option' => 'include',
                'amount_paid' => 0,
                'status' => 'Pending',
                'status_note' => 'Invoice baru dikirim, belum ada konfirmasi pembayaran.',
                'ope_items' => [
                    ['description' => 'Dokumentasi Lapangan', 'quantity' => 1, 'unit_price' => 4_500_000],
                    ['description' => 'Transportasi Tim Evaluator', 'quantity' => 1, 'unit_price' => 3_200_000],
                ],
                'timeline' => [
                    ['label' => 'Pengajuan dicatat', 'date' => '2025-01-22 12:05:00'],
                    ['label' => 'Invoice diterbitkan', 'date' => '2025-01-25 08:25:00'],
                ],
                'notes' => 'Pembayaran dilakukan per termin setelah laporan kegiatan disetujui.',
                'payment_link' => 'https://pay.spp-connect.id/invoices/INV-2025-002',
                'created_at' => '2025-01-25 08:25:00',
                'updated_at' => '2025-01-25 08:25:00',
            ],
            [
                'invoice_number' => 'INV-2024-219',
                'submission_date' => '2024-11-14',
                'invoice_date' => '2024-11-16',
                'activity_name' => 'Program Penguatan Literasi',
                'base_amount' => 28_000_000,
                'vat_option' => 'exclude',
                'amount_paid' => 39_000_000,
                'status' => 'Paid',
                'status_note' => null,
                'ope_items' => [
                    ['description' => 'Konsumsi Peserta', 'quantity' => 2, 'unit_price' => 4_500_000],
                    ['description' => 'Logistik Modul Cetak', 'quantity' => 1, 'unit_price' => 2_000_000],
                ],
                'timeline' => [
                    ['label' => 'Invoice diterbitkan', 'date' => '2024-11-16 08:10:00'],
                    ['label' => 'Pembayaran penuh diterima', 'date' => '2024-12-02 14:25:00'],
                ],
                'notes' => 'Proyek ditutup. Siap untuk case study internal.',
                'payment_link' => null,
                'created_at' => '2024-11-16 08:10:00',
                'updated_at' => '2024-12-02 14:25:00',
            ],
            [
                'invoice_number' => 'INV-2024-207',
                'submission_date' => '2024-10-02',
                'invoice_date' => '2024-10-05',
                'activity_name' => 'Program Pemberdayaan Digital',
                'base_amount' => 14_000_000,
                'vat_option' => 'tanpa',
                'amount_paid' => 9_000_000,
                'status' => 'Overdue',
                'status_note' => 'Termin kedua terlambat sejak 4 November 2024.',
                'ope_items' => [
                    ['description' => 'Perjalanan Pendamping', 'quantity' => 1, 'unit_price' => 2_500_000],
                    ['description' => 'Sewa Fasilitas', 'quantity' => 1, 'unit_price' => 1_500_000],
                ],
                'timeline' => [
                    ['label' => 'Pengajuan dicatat', 'date' => '2024-10-02 14:45:00'],
                    ['label' => 'Invoice diterbitkan', 'date' => '2024-10-05 08:20:00'],
                    ['label' => 'Pembayaran termin 1', 'date' => '2024-10-18 16:45:00', 'note' => 'Rp9.000.000'],
                    ['label' => 'Pengingat kedua', 'date' => '2024-11-12 09:30:00', 'note' => 'Telepon ke koordinator program'],
                ],
                'notes' => 'Perlu eskalasi ke pimpinan bila belum dibayar akhir pekan ini.',
                'payment_link' => null,
                'created_at' => '2024-10-05 08:20:00',
                'updated_at' => '2024-11-12 09:30:00',
            ],
        ];

        foreach ($invoices as $invoice) {
            Invoice::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'invoice_number' => $invoice['invoice_number'],
                ],
                Arr::add($invoice, 'user_id', $user->id)
            );
        }
    }
}
