<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'module_id', 'course_id', 'title', 'description', 'type', 'video_url',
        'video_duration', 'content', 'document_path', 'position', 'is_free_preview', 'is_published'
    ];

    protected $casts = [
        'is_free_preview' => 'boolean',
        'is_published' => 'boolean',
    ];

    protected $appends = ['video_url_full'];

    public function getVideoUrlFullAttribute()
    {
        return $this->video_url ? asset('storage/' . $this->video_url) : null;
    }

    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function quiz(): HasOne
    {
        return $this->hasOne(Quiz::class);
    }

    public function getProgressForUser($userId)
    {
        return Progress::where('user_id', $userId)->where('lesson_id', $this->id)->first();
    }

    public function discussions()
    {
        return $this->hasMany(Discussion::class);
    }
}
