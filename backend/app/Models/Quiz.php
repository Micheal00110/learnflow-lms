<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'lesson_id', 'course_id', 'title', 'description', 'time_limit_minutes',
        'passing_score', 'total_marks', 'attempts_allowed', 'randomize_questions', 'show_correct_answers'
    ];

    protected $casts = [
        'randomize_questions' => 'boolean',
        'show_correct_answers' => 'boolean',
    ];

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function questions(): HasMany
    {
        return $this->hasMany(QuizQuestion::class)->orderBy('position');
    }

    public function attempts(): HasMany
    {
        return $this->hasMany(QuizAttempt::class);
    }

    public function attemptsForUser($userId)
    {
        return $this->attempts()->where('user_id', $userId);
    }

    public function getBestAttempt($userId)
    {
        return $this->attempts()->where('user_id', $userId)
            ->where('is_passed', true)
            ->orderBy('percentage', 'desc')
            ->first();
    }

    public function canAttemptAgain($userId): bool
    {
        $attemptCount = $this->attempts()->where('user_id', $userId)->count();
        return $attemptCount < $this->attempts_allowed;
    }

    public function getShuffledQuestions()
    {
        $questions = $this->questions;
        return $this->randomize_questions ? $questions->shuffle() : $questions;
    }
}
