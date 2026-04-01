# LearnFlow LMS

A modern, scalable Learning Management System built with **React + Laravel**.

## Features

- User Authentication (Email, Google OAuth)
- Multi-role support (Student, Instructor, Admin)
- Course Management (Create, Edit, Delete)
- Module & Lesson Structure
- Video Player with Progress Tracking
- Quizzes with Auto-grading
- Certificates Generation
- Dashboard Analytics (Student, Instructor, Admin)
- Payment Integration (Stripe)
- Dark Mode
- Mobile Responsive

## Tech Stack

### Backend (Laravel)
- PHP 8.1+
- Laravel 10.x
- JWT Authentication (tymon/jwt-auth)
- MySQL 8+
- Redis (Caching)
- AWS S3 (File Storage)
- Stripe (Payments)

### Frontend (React)
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Query
- Zustand (State Management)
- React Router v6

## Project Structure

```
LearnFlow-LMS/
├── backend/          # Laravel API
│   ├── app/         # Controllers, Models, Middleware
│   ├── config/      # Configuration files
│   ├── database/    # Migrations, Seeders
│   └── routes/      # API routes
├── frontend/         # React App
│   ├── src/         # Components, Pages, Hooks
│   └── public/      # Static assets
├── docker/          # Docker configuration
└── docs/            # Further documentation
```

## Installation

### Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
# Configure database in .env
php artisan migrate --seed
php artisan serve
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth login
- `GET /api/me` - Get current user
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh token

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/{slug}` - Get course details
- `POST /api/courses` - Create course (instructor)
- `PUT /api/courses/{id}` - Update course
- `DELETE /api/courses/{id}` - Delete course

### Enrollments
- `GET /api/enrollments` - My enrollments
- `POST /api/enrollments/{courseId}` - Enroll in course

### Dashboards
- `GET /api/dashboard/student` - Student dashboard
- `GET /api/dashboard/instructor` - Instructor dashboard
- `GET /api/dashboard/admin` - Admin dashboard

### Quizzes
- `GET /api/quizzes/{id}/start` - Start quiz attempt
- `POST /api/quiz-attempts/{id}/submit` - Submit answers

## Database Schema

- Users
- Courses
- Modules
- Lessons
- Enrollments
- Progress
- Quizzes & Questions
- Quiz Attempts
- Payments
- Certificates
- Discussions
- Reviews

## License

MIT License
