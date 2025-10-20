<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NomorSurat extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nomor_surat',
        'tanggal_pengajuan',
        'bendera',
        'tujuan_surat',
        'nama_klien',
        'catatan',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'tanggal_pengajuan' => 'date',
    ];

    /**
     * Get the surat tugas records that use this nomor surat.
     */
    public function suratTugas()
    {
        return $this->hasMany(SuratTugas::class, 'letter_number', 'nomor_surat');
    }
}
