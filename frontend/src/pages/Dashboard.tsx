import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import api from '../services/api'

export default function Dashboard() {
  const { user } = useAuthStore()
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    api.get(`/dashboard/${user?.role || 'student'}`).then((res) => setStats(res.data))
  }, [])

  if (!stats) return <div className="p-8">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.first_name}!</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4"><p className="text-sm text-gray-600">Courses</p><p className="text-2xl font-bold">{stats.total_enrollments || 0}</p></div>
        <div className="card p-4"><p className="text-sm text-gray-600">Completed</p><p className="text-2xl font-bold">{stats.completed_courses || 0}</p></div>
        <div className="card p-4"><p className="text-sm text-gray-600">Certificates</p><p className="text-2xl font-bold">{stats.certificates_earned || 0}</p></div>
      </div>
      {user?.role === 'instructor' && (
        <Link to="/instructor/create-course" className="btn-primary mt-6">Create New Course</Link>
      )}
    </div>
  )
}
