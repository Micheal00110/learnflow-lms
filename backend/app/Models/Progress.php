<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Progress extends Model
{
    use HasFactory;

    protected $table = 'progress';

    protected $fillable = [
        'user_id', 'enrollment_id', 'lesson_id', 'course_id',
        'progress_percentage', 'time_spent_seconds', 'started_at', 'completed_at',
        'is_completed', 'last_position'
    ];

    protected $casts = [
        'last_position' => 'array',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'is_completed' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function enrollment(): BelongsTo
    {
        return $this->belongsTo(Enrollment::class);
    }

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function markComplete()
    {
        $this->update([
            'is_completed' => true,
            'completed_at' => now(),
            'progress_percentage' => 100,
        ]);
        $this->checkEnrollmentCompletion();
    }

    protected function checkEnrollmentCompletion()
    {
        $enrollment = $this->enrollment;
        $totalLessons = $enrollment->course->total_lessons ?: 1;
        $completed = $enrollment->progress()->where('is_completed', true)->count();
        if ($completed >= $totalLessons && $enrollment->status !== 'completed') {
            $enrollment->markComplete();
        }
    }
}
