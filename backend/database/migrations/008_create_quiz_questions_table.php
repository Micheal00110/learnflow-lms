<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quiz_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quiz_id')->constrained()->cascadeOnDelete();
            $table->text('question');
            $table->enum('type', ['multiple_choice', 'single_choice', 'true_false', 'short_answer'])->default('multiple_choice');
            $table->json('options');
            $table->json('correct_answers');
            $table->integer('marks')->default(10);
            $table->text('explanation')->nullable();
            $table->integer('position')->default(0);
            $table->timestamps();
            
            $table->index(['quiz_id', 'position']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quiz_questions');
    }
};
