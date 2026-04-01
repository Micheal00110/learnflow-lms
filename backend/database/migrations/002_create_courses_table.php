<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('instructor_id')->constrained('users')->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('short_description')->nullable();
            $table->json('learning_objectives')->nullable();
            $table->json('requirements')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('preview_video')->nullable();
            $table->enum('level', ['beginner', 'intermediate', 'advanced'])->default('beginner');
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->boolean('is_published')->default(false);
            $table->decimal('price', 10, 2)->default(0.00);
            $table->decimal('discounted_price', 10, 2)->nullable();
            $table->integer('duration_minutes')->default(0);
            $table->integer('total_lessons')->default(0);
            $table->json('tags')->nullable();
            $table->string('category')->nullable();
            $table->string('language')->default('en');
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('slug');
            $table->index(['status', 'is_published']);
            $table->index('category');
            $table->index('instructor_id');
            $table->fullText(['title', 'description']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
