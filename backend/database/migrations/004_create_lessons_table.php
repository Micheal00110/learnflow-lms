<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('module_id')->constrained()->cascadeOnDelete();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('type', ['video', 'document', 'quiz', 'text'])->default('video');
            $table->string('video_url')->nullable();
            $table->string('video_duration')->nullable();
            $table->text('content')->nullable();
            $table->string('document_path')->nullable();
            $table->integer('position')->default(0);
            $table->boolean('is_free_preview')->default(false);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
            
            $table->index(['module_id', 'position']);
            $table->index(['course_id', 'position']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
