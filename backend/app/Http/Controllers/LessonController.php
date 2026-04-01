<?php
namespace App\Http\Controllers;
use App\Models\Lesson;
use App\Models\Progress;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function show($id)
    {
        $lesson = Lesson::with(['module', 'course', 'quiz.questions'])->findOrFail($id);
        $progress = null;
        if (auth()->check()) {
            $progress = Progress::where('user_id', auth()->id())->where('lesson_id', $id)->first();
        }
        return response()->json(['lesson' => $lesson, 'progress' => $progress]);
    }

    public function store(Request $request, $moduleId)
    {
        $request->validate(['title' => 'required', 'type' => 'required|in:video,document,quiz,text']);
        $lesson = Lesson::create(array_merge($request->all(), ['module_id' => $moduleId, 'course_id' => $request->course_id]));
        return response()->json(['lesson' => $lesson], 201);
    }

    public function updateProgress(Request $request, $id)
    {
        $user = auth()->user();
        $enrollment = $user->enrollments()->whereHas('course.lessons', fn($q) => $q->where('id', $id))->first();
        if (!$enrollment) {
            return response()->json(['error' => 'Not enrolled'], 403);
        }
        $progress = Progress::firstOrCreate(
            ['user_id' => $user->id, 'lesson_id' => $id, 'enrollment_id' => $enrollment->id, 'course_id' => $enrollment->course_id],
            ['started_at' => now()]
        );
        if ($request->has('progress_percentage')) {
            $progress->progress_percentage = $request->progress_percentage;
        }
        if ($request->has('last_position')) {
            $progress->last_position = $request->last_position;
        }
        $progress->time_spent_seconds += $request->time_spent ?? 0;
        if ($request->is_completed || $progress->progress_percentage >= 90) {
            $progress->markComplete();
        }
        $progress->save();
        return response()->json(['progress' => $progress]);
    }
}
