<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{slug}', [CourseController::class, 'show']);
Route::get('/categories', [CourseController::class, 'categories']);

// Auth routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/google', [AuthController::class, 'googleLogin']);
Route::post('/auth/refresh', [AuthController::class, 'refresh']);

// Protected routes
Route::middleware('auth:api')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/auth/change-password', [AuthController::class, 'changePassword']);
    Route::post('/become-instructor', [AuthController::class, 'becomeInstructor']);
    
    // Enrollments
    Route::get('/enrollments', [EnrollmentController::class, 'myEnrollments']);
    Route::post('/enrollments/{courseId}', [EnrollmentController::class, 'enroll']);
    Route::get('/enrollments/{enrollmentId}/progress', [EnrollmentController::class, 'getProgress']);
    
    // Instructor routes
    Route::post('/courses', [CourseController::class, 'store']);
    Route::put('/courses/{id}', [CourseController::class, 'update']);
    Route::delete('/courses/{id}', [CourseController::class, 'destroy']);
    Route::get('/my-courses', [CourseController::class, 'myCourses']);
    
    // Modules
    Route::post('/courses/{courseId}/modules', [ModuleController::class, 'store']);
    Route::put('/modules/{id}', [ModuleController::class, 'update']);
    Route::delete('/modules/{id}', [ModuleController::class, 'destroy']);
    
    // Lessons
    Route::post('/modules/{moduleId}/lessons', [LessonController::class, 'store']);
    Route::get('/lessons/{id}', [LessonController::class, 'show']);
    Route::post('/lessons/{id}/progress', [LessonController::class, 'updateProgress']);
    
    // Quizzes
    Route::get('/quizzes/{quizId}/start', [QuizController::class, 'start']);
    Route::post('/quiz-attempts/{attemptId}/submit', [QuizController::class, 'submit']);
    Route::get('/quizzes/{quizId}/attempts', [QuizController::class, 'myAttempts']);
    
    // Dashboards
    Route::get('/dashboard/admin', [DashboardController::class, 'adminStats']);
    Route::get('/dashboard/instructor', [DashboardController::class, 'instructorStats']);
    Route::get('/dashboard/student', [DashboardController::class, 'studentStats']);
});
