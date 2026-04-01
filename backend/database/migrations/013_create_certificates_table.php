<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->foreignId('enrollment_id')->constrained()->cascadeOnDelete();
            $table->string('certificate_number')->unique();
            $table->string('pdf_path');
            $table->string('template')->default('default');
            $table->string('qr_code')->nullable();
            $table->timestamp('issued_at');
            $table->timestamp('expires_at')->nullable();
            $table->boolean('is_revoked')->default(false);
            $table->text('revoke_reason')->nullable();
            $table->timestamp('revoked_at')->nullable();
            $table->timestamps();
            
            $table->index('certificate_number');
            $table->index(['user_id', 'issued_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
