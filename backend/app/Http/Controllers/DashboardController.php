<?php
namespace App\Http\Controllers;
use App\Models\Enrollment;use App\Models\Course;use App\Models\Payment;use App\Models\User;use Illuminate\Http\Request;
class DashboardController extends Controller
{
    public function adminStats()
    {
        $user = auth()->user();
        if (!$user->isAdmin()) return response()->json(['error' => 'Unauthorized'], 403);
        $now = now(); $lastMonth = $now->copy()->subMonth();
        $usersThisMonth = User::whereMonth('created_at', $now->month)->count();
        $usersLastMonth = User::whereMonth('created_at', $lastMonth->month)->count();
        $revenueThisMonth = Payment::where('status', 'completed')->whereMonth('paid_at', $now->month)->sum('amount');
        $revenueLastMonth = Payment::where('status', 'completed')->whereMonth('paid_at', $lastMonth->month)->sum('amount');
        return response()->json([
            'total_users' => User::count(),
            'total_courses' => Course::count(),
            'total_enrollments' => Enrollment::count(),
            'total_revenue' => Payment::where('status', 'completed')->sum('amount'),
            'monthly_active_users' => User::where('last_login_at', '>=', $now->subDays(30))->count(),
            'revenue_this_month' => $revenueThisMonth,
            'revenue_growth' => $revenueLastMonth > 0 ? round((($revenueThisMonth - $revenueLastMonth) / $revenueLastMonth) * 100, 2) : 0,
            'new_users_this_month' => $usersThisMonth,
            'user_growth' => $usersLastMonth > 0 ? round((($usersThisMonth - $usersLastMonth) / $usersLastMonth) * 100, 2) : 0,
            'recent_enrollments' => Enrollment::with('user', 'course')->latest()->take(10)->get(),
            'revenue_by_month' => Payment::selectRaw('DATE_FORMAT(paid_at, "%Y-%m") as month, SUM(amount) as revenue')->where('status', 'completed')->where('paid_at', '>=', $now->subYear())->groupBy('month')->get(),
            'top_courses' => Course::withCount('enrollments')->orderBy('enrollments_count', 'desc')->take(5)->get(),
        ]);
    }
    public function instructorStats()
    {
        $user = auth()->user();
        if (!$user->isInstructor()) return response()->json(['error' => 'Unauthorized'], 403);
        $now = now(); $courseIds = $user->courses()->pluck('id');
        $revenueThisMonth = Payment::whereIn('course_id', $courseIds)->where('status', 'completed')->whereMonth('paid_at', $now->month)->sum('amount');
        return response()->json([
            'total_courses' => $user->courses()->count(),
            'published_courses' => $user->courses()->where('is_published', true)->count(),
            'total_students' => Enrollment::whereIn('course_id', $courseIds)->distinct('user_id')->count(),
            'total_revenue' => Payment::whereIn('course_id', $courseIds)->where('status', 'completed')->sum('amount') * 0.7,
            'revenue_this_month' => $revenueThisMonth * 0.7,
            'average_course_rating' => $user->courses()->join('reviews', 'courses.id', '=', 'reviews.course_id')->where('reviews.is_approved', true)->avg('reviews.rating') ?? 0,
            'monthly_revenue' => Payment::whereIn('course_id', $courseIds)->where('status', 'completed')->where('paid_at', '>=', $now->subYear())->selectRaw('DATE_FORMAT(paid_at, "%Y-%m") as month, SUM(amount * 0.7) as revenue')->groupBy('month')->get(),
            'course_enrollments' => Enrollment::whereIn('course_id', $courseIds)->with('course:id,title')->get()->groupBy('course_id')->map(fn($l) => ['course_title' => $l->first()->course?->title, 'count' => $l->count()]),
        ]);
    }
    public function studentStats()
    {
        $user = auth()->user();
        $enrollments = $user->enrollments()->with('course:id,title,thumbnail,instructor_id,instructor.first_name,instructor.last_name')->get();
        $completed = $enrollments->where('status', 'completed');
        return response()->json([
            'total_enrollments' => $enrollments->count(),
            'completed_courses' => $completed->count(),
            'in_progress_courses' => $enrollments->where('status', 'active')->count(),
            'certificates_earned' => $user->certificates()->count(),
            'total_learning_hours' => $user->getTotalLearningHoursAttribute(),
            'average_score' => max(0, $user->quizAttempts()->whereNotNull('percentage')->avg('percentage') ?? 0),
            'current_courses' => $enrollments->where('status', 'active')->take(3)->values(),
            'achievements' => ['fast_learner' => $completed->where('completed_at', '<', now()->parse($completed->first()?->enrolled_at)->addDays(7))->count() > 0, 'quiz_master' => $user->quizAttempts()->where('is_passed', true)->count() >= 10, 'streak_keeper' => true, 'course_collector' => $enrollments->count() >= 5],
        ]);
    }
}
