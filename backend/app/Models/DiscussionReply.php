<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DiscussionReply extends Model
{
    use HasFactory;

    protected $fillable = ['discussion_id', 'user_id', 'content', 'parent_id', 'upvotes', 'is_answer'];

    protected $casts = [
        'is_answer' => 'boolean',
    ];

    public function discussion(): BelongsTo
    {
        return $this->belongsTo(Discussion::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id')->orderBy('created_at');
    }

    public function markAsAnswer()
    {
        self::where('discussion_id', $this->discussion_id)->update(['is_answer' => false]);
        $this->update(['is_answer' => true]);
        $this->discussion->markResolved();
    }
}
