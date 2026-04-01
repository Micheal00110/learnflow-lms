<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Course;
use App\Models\Module;
use App\Models\Lesson;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@learnflow.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        $instructor = User::create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'instructor@learnflow.com',
            'password' => Hash::make('password'),
            'role' => 'instructor',
            'bio' => 'Expert instructor with 10 years experience'
        ]);

        User::create([
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'student@learnflow.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        $course = Course::create([
            'instructor_id' => $instructor->id,
            'title' => 'Introduction to Web Development',
            'slug' => 'intro-web-dev',
            'description' => 'Learn HTML, CSS, and JavaScript basics',
            'price' => 49.99,
            'category' => 'Development',
            'level' => 'beginner',
            'is_published' => true,
            'status' => 'published',
        ]);

        $module = Module::create([
            'course_id' => $course->id,
            'title' => 'Getting Started',
            'position' => 1,
        ]);

        Lesson::create([
            'module_id' => $module->id,
            'course_id' => $course->id,
            'title' => 'Welcome to the Course',
            'type' => 'video',
            'position' => 1,
            'is_free_preview' => true,
        ]);

        Lesson::create([
            'module_id' => $module->id,
            'course_id' => $course->id,
            'title' => 'Setting Up Your Environment',
            'type' => 'text',
            'position' => 2,
            'is_free_preview' => true,
        ]);
    }
}
