import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, BookOpen, Users, DollarSign, Star, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { PageLoader } from '../components/ui/Spinner'
import api from '../services/api'

export default function InstructorDashboard() {
  const [courses, setCourses] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/instructor/courses').then((r) => setCourses(r.data.data || r.data || [])).catch(() => {}),
      api.get('/dashboard/instructor').then((r) => setStats(r.data)).catch(() => {}),
    ]).finally(() => setLoading(false))
  }, [])

  if (loading) return <PageLoader />

  const statCards = [
    { label: 'Total Courses', value: stats?.total_courses || courses.length || 0, icon: BookOpen, color: 'text-blue-500' },
    { label: 'Total Students', value: stats?.total_students || 0, icon: Users, color: 'text-emerald-500' },
    { label: 'Revenue', value: `$${stats?.total_revenue || 0}`, icon: DollarSign, color: 'text-amber-500' },
    { label: 'Avg Rating', value: stats?.avg_rating || '0', icon: Star, color: 'text-purple-500' },
  ]

  const chartData = courses.map((c) => ({ name: c.title?.slice(0, 15), students: c.enrolled_count || 0 }))

  return (
    <div className="container-app py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Instructor Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your courses and track performance</p>
          </div>
          <Link to="/instructor/create-course" className="btn-primary">
            <Plus className="w-4 h-4" /> New Course
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
              <div className="clay-stat">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
                </div>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        {chartData.length > 0 && (
          <div className="card card-no-hover p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-500" /> Enrollment Overview
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb' }} />
                  <Bar dataKey="students" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Courses */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">Your Courses</h2>
        {courses.length === 0 ? (
          <div className="card card-no-hover p-10 text-center">
            <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">You haven't created any courses yet</p>
            <Link to="/instructor/create-course" className="btn-primary">
              <Plus className="w-4 h-4" /> Create Your First Course
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course, i) => (
              <motion.div key={course.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
                <Link to={`/courses/${course.slug}`} className="card block p-5 group">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-primary-600 transition-colors">{course.title}</h3>
                    <span className={`clay-badge text-xs ${course.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {course.status || 'draft'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.enrolled_count || 0} students</span>
                    <span className="font-semibold text-gray-700">${course.revenue || 0}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
