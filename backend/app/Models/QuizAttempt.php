<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuizAttempt extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'quiz_id', 'enrollment_id', 'score', 'total_marks',
        'percentage', 'is_passed', 'started_at', 'completed_at', 'time_taken_seconds',
        'attempt_number', 'answers', 'feedback'
    ];

    protected $casts = [
        'answers' => 'array',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'is_passed' => 'boolean',
        'percentage' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($attempt) {
            if (empty($attempt->started_at)) {
                $attempt->started_at = now();
            }
            $attempt->attempt_number = static::where('user_id', $attempt->user_id)
                ->where('quiz_id', $attempt->quiz_id)
                ->count() + 1;
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }

    public function enrollment(): BelongsTo
    {
        return $this->belongsTo(Enrollment::class);
    }

    public function complete($score, $totalMarks, $answers = null)
    {
        $this->completed_at = now();
        $this->score = $score;
        $this->total_marks = $totalMarks;
        $this->percentage = round(($score / $totalMarks) * 100, 2);
        $this->is_passed = $this->percentage >= $this->quiz->passing_score;
        $this->answers = $answers;
        $this->time_taken_seconds = $this->started_at->diffInSeconds($this->completed_at);
        $this->save();
    }
}
