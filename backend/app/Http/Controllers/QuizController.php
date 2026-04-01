<?php
namespace App\Http\Controllers;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use App\Models\Enrollment;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function start($quizId)
    {
        $user = auth()->user();
        $quiz = Quiz::with('questions.options')->findOrFail($quizId);
        $enrollment = Enrollment::where('user_id', $user->id)->where('course_id', $quiz->course_id)->first();
        
        if (!$enrollment) return response()->json(['error' => 'Not enrolled'], 403);
        if (!$quiz->canAttemptAgain($user->id)) return response()->json(['error' => 'Max attempts reached'], 403);
        
        $attempt = QuizAttempt::create(['user_id' => $user->id, 'quiz_id' => $quizId, 'enrollment_id' => $enrollment->id]);
        
        return response()->json([
            'attempt_id' => $attempt->id,
            'quiz' => $quiz,
            'time_limit_minutes' => $quiz->time_limit_minutes,
            'attempt_number' => $attempt->attempt_number,
        ]);
    }

    public function submit(Request $request, $attemptId)
    {
        $attempt = QuizAttempt::with('quiz.questions')->findOrFail($attemptId);
        if ($attempt->user_id !== auth()->id()) return response()->json(['error' => 'Unauthorized'], 403);
        if ($attempt->completed_at) return response()->json(['error' => 'Already submitted'], 400);
        
        $answers = $request->answers;
        $score = 0;
        $totalMarks = 0;
        
        foreach ($attempt->quiz->questions as $question) {
            $totalMarks += $question->marks;
            if (isset($answers[$question->id])) {
                $result = $question->gradeAnswer($answers[$question->id]);
                $score += $result['score'];
            }
        }
        
        $attempt->complete($score, $totalMarks, $answers);
        
        return response()->json([
            'attempt' => $attempt->fresh(),
            'is_passed' => $attempt->is_passed,
        ]);
    }

    public function myAttempts($quizId)
    {
        $attempts = QuizAttempt::where('user_id', auth()->id())->where('quiz_id', $quizId)->get();
        return response()->json($attempts);
    }
}
