<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique(); // Generated invoice number
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('submission_date');
            $table->date('invoice_date');
            $table->string('activity_name');
            $table->decimal('base_amount', 15, 2); // Base invoice amount
            $table->enum('vat_option', ['include', 'exclude', 'tanpa']); // VAT option
            $table->decimal('amount_paid', 15, 2)->default(0); // Amount already paid
            $table->enum('status', ['Pending', 'Partial', 'Paid', 'Overdue'])->default('Pending');
            $table->text('status_note')->nullable();
            $table->json('ope_items')->nullable(); // OPE items as JSON array
            $table->json('timeline')->nullable(); // Timeline of events
            $table->text('notes')->nullable(); // Internal notes
            $table->string('payment_link')->nullable(); // Payment link if any
            $table->timestamps();

            // Indexes for common queries
            $table->index('status');
            $table->index('submission_date');
            $table->index('invoice_date');
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
