<?php

declare(strict_types=1);

namespace App\Support;

use Carbon\CarbonImmutable;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class SuratTugasRepository
{
    /**
     * @return Collection<int, array<string, mixed>>
     */
    public static function all(): Collection
    {
        return collect(config('surat_tugas', []));
    }

    /**
     * @return array<string, mixed>|null
     */
    public static function find(string $id): ?array
    {
        $record = self::all()->first(static fn (array $record): bool => $record['id'] === $id);

        if (! $record) {
            return null;
        }

        $record['letter_number'] = $record['letter_number'] ?? self::formatLetterNumber($record);

        $record['pics'] = collect($record['pics'] ?? [])->map(static fn ($pic) => [
            'id' => $pic['id'] ?? Str::slug($pic['name'] ?? Str::uuid()->toString()),
            'name' => $pic['name'] ?? 'Tidak diketahui',
            'role' => $pic['role'] ?? null,
        ])->values()->all();

        return $record;
    }

    public static function formatLetterNumber(array $record): string
    {
        [$initial, $year, $sequence] = explode('-', $record['id']);
        $month = (int) date('n', strtotime($record['submitted_at']));
        $romanMonths = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

        return sprintf('%s/%s-%s/%s/%s', $sequence, 'SPP', $initial, $romanMonths[$month - 1] ?? '-', $year);
    }

    public static function pics(array $record): Collection
    {
        return collect($record['pics'] ?? []);
    }

    public static function calculateTotalFee(array $record): int
    {
        $companion = (int) ($record['companion_fee'] ?? 0);
        $instructors = collect($record['instructors'] ?? [])->sum('fee');

        return $companion + (int) $instructors;
    }

    public static function formatMoney(int $amount): string
    {
        return 'Rp ' . number_format($amount, 0, ',', '.');
    }

    public static function formatDateTime(string $iso, bool $withTime = true): string
    {
        $dt = CarbonImmutable::parse($iso)->locale('id')->timezone('Asia/Jakarta');

        return $withTime
            ? $dt->translatedFormat('d F Y \p\u\k\u\l H:i')
            : $dt->translatedFormat('d F Y');
    }
}
