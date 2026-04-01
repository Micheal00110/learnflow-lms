# LearnFlow LMS - Project Structure

## Overview
A full-featured Learning Management System with React frontend and Laravel backend.

## Total Files Created: 80+ files

### Backend (Laravel)
**Models (16 files):**
- User, Course, Module, Lesson, Enrollment, Progress
- Quiz, QuizQuestion, QuizAttempt
- Review, Wishlist, Payment, Certificate
- Discussion, DiscussionReply, Notification

**Controllers (8 files):**
- AuthController (login, register, JWT, Google OAuth)
- CourseController (CRUD, filtering, search)
- ModuleController (course modules)
- LessonController (lessons, progress tracking)
- EnrollmentController (enrollments, my courses)
- QuizController (attempts, grading)
- DashboardController (stats for all roles)

**Middleware (2 files):** JWT Authentication, Role-based access

**Migrations (16 files):** Complete database schema with relations

**Other:** API Routes, Database Seeders, Config files

### Frontend (React + TypeScript)
**Core Files:**
- main.tsx, App.tsx, index.css, vite.config.ts
- tailwind.config.js, tsconfig.json, package.json

**Components & Pages (18+ files):**
- Layout, Navbar, ProtectedRoute
- Home, Login, Register, Courses, CourseDetail
- Dashboard, MyCourses, Learning, CreateCourse
- Profile, InstructorDashboard, Quiz, Certificate

**Utilities:**
- API service (axios with JWT interceptor)
- Auth store (Zustand with persistence)
- Helper functions (formatDuration, formatPrice, etc.)

### Docker & DevOps
- docker-compose.yml (Laravel, MySQL, Redis, React)
- Backend Dockerfile (PHP 8.2 + FPM)
- Frontend Dockerfile (Node 18)

### Documentation
- README.md (full setup instructions)
- API.md (endpoint documentation)
- PROJECT_STRUCTURE.md (this file)

## Key Features Implemented

### Authentication
- Email/password with JWT
- Google OAuth
- Role-based access (Student, Instructor, Admin)
- Token refresh
- Password change

### Course Management
- Create/edit/delete courses (instructor)
- Course structure: Course -> Module -> Lesson
- Video lessons with progress tracking
- Free preview lessons
- Course search and filtering

### Learning Experience
- Student dashboard
- My courses with progress bars
- Video player with resume position
- Lesson completion tracking
- Discussion & Q&A per course

### Quizzes & Assessment
- Multiple quiz types (MCQ, true/false, short answer)
- Auto-grading
- Attempt limits
- Pass/fail scoring
- Quiz history

### Dashboard Analytics
- Student: enrollments, completed courses, certificates
- Instructor: students, revenue, course stats
- Admin: platform-wide analytics

### Payments (Structure Ready)
- Stripe integration ready
- Payment model & controller
- Enrollment with paid_amount tracking

### Certificates
- Certificate generation on completion
- Certificate number with QR code
- PDF generation structure

---

## Next Steps to Get Running:

### 1. Backend Setup
```bash
cd /home/workspace/LearnFlow-LMS/backend
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
# Configure DB in .env
php artisan migrate --seed
php artisan serve
```

### 2. Frontend Setup
```bash
cd /home/workspace/LearnFlow-LMS/frontend
npm install
npm run dev
```

### 3. Database Setup
- Create MySQL database 'learnflow'
- Run migrations with seed data
- Default users will be created: 
  - admin@learnflow.com / password
  - instructor@learnflow.com / password
  - student@learnflow.com / password

### 4. Docker (Alternative)
```bash
cd /home/workspace/LearnFlow-LMS/docker
docker-compose up -d
```

---

## Tech Stack Summary

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| Backend | Laravel 10, PHP 8.2 |
| Auth | JWT (tymon/jwt-auth) |
| Database | MySQL 8 |
| Cache | Redis |
| State | Zustand |
| Query | React Query |
| Icons | Lucide React |
| Charts | Recharts (ready) |

---

## Project Location
```
/home/workspace/LearnFlow-LMS/
```
