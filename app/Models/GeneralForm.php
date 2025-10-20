<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GeneralForm extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'form_type',
        'form_number',
        'user_id',
        'submitted_at',
        'title',
        'description',
        'status',
        'status_note',
        'form_data',
        'attachments',
        'approvals',
        'completed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'submitted_at' => 'date',
        'completed_at' => 'datetime',
        'form_data' => 'array',
        'attachments' => 'array',
        'approvals' => 'array',
    ];

    /**
     * Get the user that owns the general form.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
