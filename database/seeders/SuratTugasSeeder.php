<?php

namespace Database\Seeders;

use App\Models\SuratTugas;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class SuratTugasSeeder extends Seeder
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

        $payloads = [
            [
                'letter_number' => '001/SPP-ST/I/2025',
                'submitted_at' => '2025-01-12',
                'event_start' => '2025-01-18',
                'event_end' => '2025-01-20',
                'activity_name' => 'Pendampingan Transparansi Data Pemerintah Kota',
                'activity_type' => 'offline',
                'status' => 'Menunggu Persetujuan',
                'status_note' => 'Menunggu tanda tangan Kepala Bagian.',
                'pic' => 'Rahmat Hidayat',
                'companion_name' => 'Dewi Lestari',
                'companion_fee' => 1_250_000,
                'client_name' => 'Bank Mandiri',
                'pics' => [
                    ['id' => 'rahmat-hidayat', 'name' => 'Rahmat Hidayat', 'role' => 'Lead PIC'],
                    ['id' => 'mira-puspita', 'name' => 'Mira Puspita', 'role' => 'Koordinator Lapangan'],
                ],
                'instructors' => [
                    ['name' => 'Agus Wibowo', 'fee' => 1_500_000],
                    ['name' => 'Siti Ramadhani', 'fee' => 1_350_000],
                ],
                'created_at' => '2025-01-12 08:30:00',
                'updated_at' => '2025-01-13 10:05:00',
            ],
            [
                'letter_number' => '002/SPP-ST/I/2025',
                'submitted_at' => '2025-01-09',
                'event_start' => '2025-01-22',
                'event_end' => '2025-01-22',
                'activity_name' => 'Sosialisasi Layanan SPP Online',
                'activity_type' => 'online',
                'status' => 'Disetujui',
                'status_note' => 'Surat telah disahkan oleh pimpinan.',
                'pic' => 'Sari Wulandari',
                'companion_name' => 'Ridwan Pratama',
                'companion_fee' => 0,
                'client_name' => 'Bank Syariah Indonesia',
                'pics' => [
                    ['id' => 'sari-wulandari', 'name' => 'Sari Wulandari', 'role' => 'PIC Utama'],
                    ['id' => 'ario-nugroho', 'name' => 'Ario Nugroho', 'role' => 'Moderator Webinar'],
                ],
                'instructors' => [
                    ['name' => 'Mikael Santoso', 'fee' => 900_000],
                ],
                'created_at' => '2025-01-09 14:15:00',
                'updated_at' => '2025-01-10 09:20:00',
            ],
            [
                'letter_number' => '003/SPP-ST/I/2025',
                'submitted_at' => '2025-01-05',
                'event_start' => '2025-01-25',
                'event_end' => '2025-01-27',
                'activity_name' => 'Workshop Transformasi Digital Regional',
                'activity_type' => 'offline',
                'status' => 'Revisi',
                'status_note' => 'Lengkapi daftar peserta dan agenda final.',
                'pic' => 'Rangga Saputra',
                'companion_name' => null,
                'companion_fee' => null,
                'client_name' => 'Bank Negara Indonesia',
                'pics' => [
                    ['id' => 'rangga-saputra', 'name' => 'Rangga Saputra', 'role' => null],
                ],
                'instructors' => [
                    ['name' => 'Nurul Hidayah', 'fee' => 1_250_000],
                    ['name' => 'Bima Prakoso', 'fee' => 1_250_000],
                    ['name' => 'Yuni Astuti', 'fee' => 1_100_000],
                ],
                'created_at' => '2025-01-05 09:45:00',
                'updated_at' => '2025-01-08 16:40:00',
            ],
            [
                'letter_number' => null,
                'submitted_at' => '2025-02-02',
                'event_start' => '2025-02-10',
                'event_end' => '2025-02-12',
                'activity_name' => 'Pelatihan Onboarding Produk Digital',
                'activity_type' => 'offline',
                'status' => 'Draft',
                'status_note' => 'Menunggu kelengkapan data peserta sebelum diajukan.',
                'pic' => 'Dina Lestari',
                'companion_name' => 'Rudi Saputra',
                'companion_fee' => 850_000,
                'client_name' => 'PT Cemerlang Abadi',
                'pics' => [
                    ['id' => 'dina-lestari', 'name' => 'Dina Lestari', 'role' => 'PIC Utama'],
                    ['id' => 'rudi-saputra', 'name' => 'Rudi Saputra', 'role' => 'Pendamping'],
                ],
                'instructors' => [
                    ['name' => 'Julian Aditya', 'fee' => 1_450_000],
                    ['name' => 'Melly Susanti', 'fee' => 1_325_000],
                ],
                'created_at' => '2025-02-02 15:10:00',
                'updated_at' => '2025-02-02 15:10:00',
            ],
        ];

        foreach ($payloads as $payload) {
            SuratTugas::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'letter_number' => $payload['letter_number'],
                    'submitted_at' => $payload['submitted_at'],
                    'activity_name' => $payload['activity_name'],
                ],
                Arr::add($payload, 'user_id', $user->id)
            );
        }
    }
}
