<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Enrollment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'course_id', 'status', 'enrolled_at', 'expires_at',
        'completed_at', 'paid_amount', 'payment_id'
    ];

    protected $casts = [
        'enrolled_at' => 'datetime',
        'expires_at' => 'datetime',
        'completed_at' => 'datetime',
        'paid_amount' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($enrollment) {
            if (empty($enrollment->enrolled_at)) {
                $enrollment->enrolled_at = now();
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function progress(): HasMany
    {
        return $this->hasMany(Progress::class);
    }

    public function quizAttempts(): HasMany
    {
        return $this->hasMany(QuizAttempt::class);
    }

    public function certificate(): HasOne
    {
        return $this->hasOne(Certificate::class);
    }

    public function getProgressPercentageAttribute(): float
    {
        $totalLessons = $this->course->total_lessons ?: 1;
        $completed = $this->progress()->where('is_completed', true)->count();
        return round(($completed / $totalLessons) * 100, 2);
    }

    public function getCompletedLessonsCountAttribute(): int
    {
        return $this->progress()->where('is_completed', true)->count();
    }

    public function getIsCompletedAttribute(): bool
    {
        return $this->progress_percentage >= 100 && $this->status === 'completed';
    }

    public function markComplete()
    {
        $this->update([
            'status' => 'completed',
            'completed_at' => now(),
        ]);
        if (!$this->certificate) {
            Certificate::generate($this);
        }
    }
}
