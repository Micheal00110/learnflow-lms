import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Award, TrendingUp, ArrowRight, GraduationCap } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { PageLoader } from '../components/ui/Spinner'
import { StatCardSkeleton } from '../components/ui/Skeleton'
import api from '../services/api'

export default function Dashboard() {
  const { user } = useAuthStore()
  const [stats, setStats] = useState<any>(null)
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get(`/dashboard/${user?.role || 'student'}`).then((r) => setStats(r.data)).catch(() => {}),
      api.get('/enrollments').then((r) => setEnrollments(r.data || [])).catch(() => {}),
    ]).finally(() => setLoading(false))
  }, [])

  if (loading) return <PageLoader />

  const statCards = [
    { label: 'Enrolled Courses', value: stats?.total_enrollments || enrollments.length || 0, icon: BookOpen, color: 'text-blue-500' },
    { label: 'Completed', value: stats?.completed_courses || 0, icon: Award, color: 'text-emerald-500' },
    { label: 'Certificates', value: stats?.certificates_earned || 0, icon: GraduationCap, color: 'text-purple-500' },
    { label: 'Hours Learned', value: stats?.total_hours || 0, icon: TrendingUp, color: 'text-amber-500' },
  ]

  return (
    <div className="container-app py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {/* Welcome */}
        <div className="card card-no-hover p-6 md:p-8 mb-8 bg-gradient-to-br from-primary-50 to-purple-50 border-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.first_name}!</h1>
              <p className="text-gray-500 mt-1">Continue where you left off</p>
            </div>
            {user?.role === 'instructor' && (
              <Link to="/instructor/create-course" className="btn-primary hidden sm:inline-flex">
                Create Course
              </Link>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {loading ? (
            [...Array(4)].map((_, i) => <StatCardSkeleton key={i} />)
          ) : (
            statCards.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
                <div className="clay-stat">
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Recent Courses */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Continue Learning</h2>
          <Link to="/my-courses" className="btn-ghost text-sm">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {enrollments.length === 0 ? (
          <div className="card card-no-hover p-8 text-center">
            <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet</p>
            <Link to="/courses" className="btn-primary">Browse Courses</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {enrollments.slice(0, 6).map((e: any, i: number) => (
              <motion.div key={e.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
                <Link to={`/learning/${e.course?.id}`} className="card block overflow-hidden group">
                  <img
                    src={e.course?.thumbnail_url || `https://picsum.photos/seed/${e.course?.id}/400/200`}
                    alt={e.course?.title}
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 text-sm mb-3 line-clamp-1 group-hover:text-primary-600 transition-colors">{e.course?.title}</h3>
                    <div className="clay-progress-track h-2 mb-2">
                      <div className="clay-progress-fill h-2" style={{ width: `${e.progress_percentage || 0}%` }} />
                    </div>
                    <p className="text-xs text-gray-500">{e.progress_percentage || 0}% complete</p>
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
