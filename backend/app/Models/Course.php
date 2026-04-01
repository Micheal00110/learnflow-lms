<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Course extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'instructor_id', 'title', 'slug', 'description', 'short_description',
        'learning_objectives', 'requirements', 'thumbnail', 'preview_video',
        'level', 'status', 'is_published', 'price', 'discounted_price',
        'duration_minutes', 'total_lessons', 'tags', 'category', 'language',
    ];

    protected $casts = [
        'learning_objectives' => 'array',
        'requirements' => 'array',
        'tags' => 'array',
        'is_published' => 'boolean',
        'price' => 'decimal:2',
        'discounted_price' => 'decimal:2',
    ];

    protected $appends = ['thumbnail_url', 'final_price', 'rating_stats'];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($course) {
            if (empty($course->slug)) {
                $course->slug = Str::slug($course->title);
            }
        });
    }

    public function getThumbnailUrlAttribute()
    {
        return $this->thumbnail ? asset('storage/' . $this->thumbnail) : asset('images/default-course.png');
    }

    public function getFinalPriceAttribute()
    {
        return $this->discounted_price ?? $this->price ?? 0;
    }

    public function getRatingStatsAttribute()
    {
        $ratings = $this->reviews()->where('is_approved', true)->pluck('rating');
        $count = $ratings->count();
        return [
            'average' => $count > 0 ? round($ratings->avg(), 1) : 0,
            'count' => $count,
        ];
    }

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    public function modules(): HasMany
    {
        return $this->hasMany(Module::class)->orderBy('position');
    }

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class)->orderBy('position');
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function wishlists(): HasMany
    {
        return $this->hasMany(Wishlist::class);
    }

    public function discussions(): HasMany
    {
        return $this->hasMany(Discussion::class);
    }
}
