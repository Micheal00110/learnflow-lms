<?php
namespace App\Http\Controllers;
use App\Models\Enrollment;
use App\Models\Course;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function enroll(Request $request, $courseId)
    {
        $user = auth()->user();
        $course = Course::findOrFail($courseId);
        
        if ($user->enrollments()->where('course_id', $courseId)->exists()) {
            return response()->json(['error' => 'Already enrolled'], 400);
        }
        
        $paidAmount = $course->price == 0 ? 0 : $course->final_price;
        
        $enrollment = Enrollment::create([
            'user_id' => $user->id,
            'course_id' => $courseId,
            'paid_amount' => $paidAmount,
        ]);
        
        return response()->json(['enrollment' => $enrollment->load('course')], 201);
    }

    public function myEnrollments()
    {
        $enrollments = auth()->user()->enrollments()->with('course.instructor')->latest()->get();
        return response()->json($enrollments);
    }

    public function getProgress($enrollmentId)
    {
        $enrollment = Enrollment::with(['course.modules.lessons', 'progress'])
            ->where('id', $enrollmentId)
            ->where('user_id', auth()->id())
            ->firstOrFail();
        return response()->json($enrollment);
    }
}
