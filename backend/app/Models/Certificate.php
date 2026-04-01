<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'course_id', 'enrollment_id', 'certificate_number', 'pdf_path',
        'template', 'qr_code', 'issued_at', 'expires_at', 'is_revoked', 'revoke_reason', 'revoked_at'
    ];

    protected $casts = [
        'issued_at' => 'datetime',
        'expires_at' => 'datetime',
        'revoked_at' => 'datetime',
        'is_revoked' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($certificate) {
            if (empty($certificate->certificate_number)) {
                $certificate->certificate_number = 'CERT-' . strtoupper(Str::random(12));
            }
            if (empty($certificate->issued_at)) {
                $certificate->issued_at = now();
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

    public function enrollment(): BelongsTo
    {
        return $this->belongsTo(Enrollment::class);
    }

    public static function generate(Enrollment $enrollment): self
    {
        $certificate = self::create([
            'user_id' => $enrollment->user_id,
            'course_id' => $enrollment->course_id,
            'enrollment_id' => $enrollment->id,
            'pdf_path' => 'certificates/' . Str::uuid() . '.pdf',
            'template' => 'default',
        ]);

        self::generatePDF($certificate);
        return $certificate;
    }

    protected static function generatePDF(self $certificate)
    {
        // PDF generation logic would go here using a PDF library
        // For now this is a placeholder - actual implementation needs PDF library
    }

    public function getUrlAttribute(): string
    {
        return asset('storage/' . $this->pdf_path);
    }

    public function isValid(): bool
    {
        if ($this->is_revoked) return false;
        if ($this->expires_at && $this->expires_at->isPast()) return false;
        return true;
    }
}
