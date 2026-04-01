<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuizQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'quiz_id', 'question', 'type', 'options', 'correct_answers', 'marks', 'explanation', 'position'
    ];

    protected $casts = [
        'options' => 'array',
        'correct_answers' => 'array',
    ];

    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }

    public function gradeAnswer($answer): array
    {
        $score = 0;
        $isCorrect = false;

        switch ($this->type) {
            case 'multiple_choice':
                $correctAnswers = (array) $this->correct_answers;
                $submittedAnswers = (array) $answer;
                $intersection = array_intersect($correctAnswers, $submittedAnswers);
                $isCorrect = count($intersection) === count($correctAnswers) && count($submittedAnswers) === count($correctAnswers);
                if ($isCorrect) $score = $this->marks;
                break;

            case 'single_choice':
            case 'true_false':
                $isCorrect = in_array($answer, (array) $this->correct_answers);
                if ($isCorrect) $score = $this->marks;
                break;

            case 'short_answer':
                $correctAnswers = array_map('strtolower', (array) $this->correct_answers);
                $submitted = strtolower(trim($answer));
                $isCorrect = in_array($submitted, $correctAnswers);
                if ($isCorrect) $score = $this->marks;
                break;
        }

        return [
            'score' => $score,
            'is_correct' => $isCorrect,
            'correct_answers' => $this->correct_answers,
            'explanation' => $this->explanation,
        ];
    }
}
