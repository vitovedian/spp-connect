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
        Schema::create('nomor_surat', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_surat')->unique();
            $table->date('tanggal_pengajuan');
            $table->enum('bendera', ['SPP', 'MBS', 'EPU', 'KIM', 'PrimaOne']);
            $table->string('tujuan_surat');
            $table->string('nama_klien')->nullable();
            $table->text('catatan')->nullable();
            $table->timestamps();
        });

        Schema::create('surat_tugas', function (Blueprint $table) {
            $table->id();
            $table->string('letter_number')->nullable(); // Reference to nomor_surat if assigned
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('submitted_at');
            $table->date('event_start');
            $table->date('event_end');
            $table->string('activity_name');
            $table->enum('activity_type', ['offline', 'online']);
            $table->enum('status', ['Draft', 'Pengajuan', 'Persetujuan', 'Selesai', 'Menunggu Persetujuan', 'Disetujui', 'Revisi'])->default('Draft');
            $table->text('status_note')->nullable();
            $table->string('pic')->nullable();
            $table->string('companion_name')->nullable();
            $table->integer('companion_fee')->nullable();
            $table->string('client_name')->nullable();
            $table->json('pics')->nullable(); // Array of PICs with name and role
            $table->json('instructors')->nullable(); // Array of instructors with name and fee
            $table->timestamps();

            // Indexes for common queries
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
        Schema::dropIfExists('surat_tugas');
        Schema::dropIfExists('nomor_surat');
    }
};
