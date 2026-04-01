<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $query = Course::with(['instructor', 'modules.lessons', 'reviews'])
            ->where('status', 'published')
            ->where('is_published', true);

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('level')) {
            $query->where('level', $request->level);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereFullText(['title', 'description'], $search)
                    ->orWhere('tags', 'like', "%{$search}%");
            });
        }

        $query->orderBy('created_at', 'desc');
        $courses = $query->paginate($request->per_page ?? 12);
        return response()->json($courses);
    }

    public function show($slug)
    {
        $course = Course::with(['instructor', 'modules.lessons', 'reviews.user'])
            ->where('slug', $slug)->firstOrFail();
        return response()->json(['course' => $course]);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        if (!$user->isInstructor()) {
            return response()->json(['error' => 'Only instructors can create courses'], 403);
        }

        $data = $request->all();
        $data['instructor_id'] = $user->id;
        $data['slug'] = Str::slug($data['title']) . '-' . Str::random(6);
        $course = Course::create($data);
        return response()->json(['course' => $course], 201);
    }

    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);
        $course->update($request->all());
        return response()->json(['course' => $course]);
    }

    public function destroy($id)
    {
        Course::findOrFail($id)->delete();
        return response()->json(['message' => 'Course deleted']);
    }
}
