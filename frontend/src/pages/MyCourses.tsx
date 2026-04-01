import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Play } from 'lucide-react'
import api from '../services/api'
import { CourseCardSkeleton } from '../components/ui/Skeleton'
import EmptyState from '../components/ui/EmptyState'

export default function MyCourses() {
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    api.get('/enrollments').then((r) => setEnrollments(r.data || [])).finally(() => setLoading(false))
  }, [])

  const filtered = enrollments.filter((e: any) => {
    if (filter === 'progress') return (e.progress_percentage || 0) > 0 && (e.progress_percentage || 0) < 100
    if (filter === 'completed') return (e.progress_percentage || 0) >= 100
    return true
  })

  return (
    <div className="container-app py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">My Courses</h1>
        <p className="text-gray-500 mb-6">Track your enrolled courses and progress</p>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { key: 'all', label: 'All' },
            { key: 'progress', label: 'In Progress' },
            { key: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === tab.key ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'text-gray-600 hover:bg-white/60'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <CourseCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No courses yet"
            description="Browse our catalog and enroll in courses to start learning."
            action={{ label: 'Browse Courses', onClick: () => window.location.href = '/courses' }}
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((e: any, i: number) => (
              <motion.div key={e.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
                <Link to={`/learning/${e.course?.id}`} className="card block overflow-hidden group">
                  <div className="relative">
                    <img
                      src={e.course?.thumbnail_url || `https://picsum.photos/seed/${e.course?.id}/400/200`}
                      alt={e.course?.title}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">{e.course?.title}</h3>
                    <div className="clay-progress-track h-2.5 mb-2">
                      <div className="clay-progress-fill h-2.5" style={{ width: `${e.progress_percentage || 0}%` }} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{e.progress_percentage || 0}% complete</span>
                      {(e.progress_percentage || 0) >= 100 && (
                        <span className="clay-badge bg-emerald-50 text-emerald-600 text-xs">Completed</span>
                      )}
                    </div>
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
