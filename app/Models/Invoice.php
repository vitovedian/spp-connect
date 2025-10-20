<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'invoice_number',
        'user_id',
        'submission_date',
        'invoice_date',
        'activity_name',
        'base_amount',
        'vat_option',
        'amount_paid',
        'status',
        'status_note',
        'ope_items',
        'timeline',
        'notes',
        'payment_link',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'submission_date' => 'date',
        'invoice_date' => 'date',
        'base_amount' => 'decimal:2',
        'amount_paid' => 'decimal:2',
        'ope_items' => 'array',
        'timeline' => 'array',
    ];

    /**
     * Get the user that owns the invoice.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
