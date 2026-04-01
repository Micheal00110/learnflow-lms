<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Module extends Model
{
    use HasFactory;

    protected $fillable = ['course_id', 'title', 'description', 'position', 'duration_minutes', 'is_published'];

    protected $casts = [
        'is_published' => 'boolean',
        'duration_minutes' => 'integer',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class)->orderBy('position');
    }

    public function getProgressPercentage($userId)
    {
        $totalLessons = $this->lessons()->count();
        if ($totalLessons === 0) return 0;
        $completedLessons = Progress::where('user_id', $userId)
            ->whereIn('lesson_id', $this->lessons()->pluck('id'))
            ->where('is_completed', true)
            ->count();
        return round(($completedLessons / $totalLessons) * 100, 2);
    }
}
