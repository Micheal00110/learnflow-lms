<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quiz_attempts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('quiz_id')->constrained()->cascadeOnDelete();
            $table->foreignId('enrollment_id')->constrained()->cascadeOnDelete();
            $table->integer('score')->nullable();
            $table->integer('total_marks')->nullable();
            $table->decimal('percentage', 5, 2)->nullable();
            $table->boolean('is_passed')->nullable();
            $table->timestamp('started_at');
            $table->timestamp('completed_at')->nullable();
            $table->integer('time_taken_seconds')->nullable();
            $table->integer('attempt_number')->default(1);
            $table->json('answers')->nullable();
            $table->text('feedback')->nullable();
            $table->timestamps();
            
            $table->index(['user_id', 'quiz_id']);
            $table->index(['enrollment_id', 'is_passed']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quiz_attempts');
    }
};
