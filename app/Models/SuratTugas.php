<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SuratTugas extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'letter_number',
        'user_id',
        'submitted_at',
        'event_start',
        'event_end',
        'activity_name',
        'activity_type',
        'status',
        'status_note',
        'pic',
        'companion_name',
        'companion_fee',
        'client_name',
        'pics',
        'instructors',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'submitted_at' => 'date',
        'event_start' => 'date',
        'event_end' => 'date',
        'pics' => 'array',
        'instructors' => 'array',
    ];

    /**
     * Get the user that owns the surat tugas.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the nomor surat associated with this surat tugas.
     */
    public function nomorSurat()
    {
        return $this->belongsTo(NomorSurat::class, 'letter_number', 'nomor_surat');
    }
}
