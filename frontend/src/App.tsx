import { Routes, Route } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import MyCourses from './pages/MyCourses'
import Learning from './pages/Learning'
import Quiz from './pages/Quiz'
import Certificate from './pages/Certificate'
import Profile from './pages/Profile'
import InstructorDashboard from './pages/InstructorDashboard'
import CreateCourse from './pages/CreateCourse'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Dashboard />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Dashboard />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/learning/:courseId" element={<Learning />} />
            <Route path="/quiz/:quizId" element={<Quiz />} />
            <Route path="/certificates/:id" element={<Certificate />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/instructor" element={<InstructorDashboard />} />
            <Route path="/instructor/create-course" element={<CreateCourse />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
