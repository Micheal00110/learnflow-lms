<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Discussion extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'course_id', 'lesson_id', 'title', 'content', 'type', 'is_pinned', 'is_resolved', 'upvotes', 'views'
    ];

    protected $casts = [
        'is_pinned' => 'boolean',
        'is_resolved' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($discussion) {
            if (empty($discussion->views)) {
                $discussion->views = 0;
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

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }

    public function replies(): HasMany
    {
        return $this->hasMany(DiscussionReply::class)->whereNull('parent_id')->orderBy('created_at');
    }

    public function allReplies(): HasMany
    {
        return $this->hasMany(DiscussionReply::class)->orderBy('created_at');
    }

    public function markResolved()
    {
        $this->update(['is_resolved' => true]);
    }

    public function incrementViews()
    {
        $this->increment('views');
    }
}
