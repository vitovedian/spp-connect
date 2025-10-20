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
        Schema::create('general_forms', function (Blueprint $table) {
            $table->id();
            $table->enum('form_type', ['Laporan Kegiatan', 'Persetujuan Program', 'Catatan Koordinasi']);
            $table->string('form_number')->nullable(); // Form reference number
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('submitted_at');
            $table->string('title'); // Title of the form
            $table->text('description')->nullable(); // Description of the form
            $table->enum('status', ['Draft', 'Submitted', 'In Review', 'Approved', 'Rejected', 'Completed'])->default('Draft');
            $table->text('status_note')->nullable();
            $table->json('form_data'); // Store form-specific data as JSON
            $table->json('attachments')->nullable(); // Store attachment information as JSON
            $table->json('approvals')->nullable(); // Track approval workflow
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            // Indexes for common queries
            $table->index('form_type');
            $table->index('status');
            $table->index('submitted_at');
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('general_forms');
    }
};
