import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Award, TrendingUp, GraduationCap } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { PageLoader } from '../components/ui/Spinner'
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
    <div className="min-h-screen">
      {/* Welcome Header */}
      <section className="section-header bg-white border-b border-gray-200">
        <div className="container-app">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="section-title">Welcome back, {user?.first_name}!</h1>
            <p className="section-subtitle">Continue where you left off</p>
          </motion.div>
        </div>
      </section>

      <div className="container-app">
        {loading ? (
          <PageLoader />
        ) : (
          <>
            {/* Instructor Actions */}
            {user?.role === 'instructor' && (
              <section className="section">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <Link to="/instructor/create-course" className="card card-no-hover p-6 bg-gradient-to-r from-primary-50 to-purple-50 border-primary-100 flex items-center justify-between group">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">Want to create a course?</h3>
                      <p className="text-sm text-gray-500">Share your expertise with thousands of learners</p>
                    </div>
                    <span className="btn-primary whitespace-nowrap">Create Course →</span>
                  </Link>
                </motion.div>
              </section>
            )}

            {/* Progress Stats */}
            <section className="section">
              <div className="section-header">
                <h2 className="section-title">Your Progress</h2>
              </div>
              <div className="content-grid grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <div className="clay-stat">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                          stat.color === 'text-blue-500' ? 'from-blue-100 to-blue-50' :
                          stat.color === 'text-emerald-500' ? 'from-emerald-100 to-emerald-50' :
                          stat.color === 'text-purple-500' ? 'from-purple-100 to-purple-50' :
                          'from-amber-100 to-amber-50'
                        } flex items-center justify-center`}>
                          <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Continue Learning */}
            <section className="section">
              <div className="section-header flex items-center justify-between">
                <div>
                  <h2 className="section-title">Continue Learning</h2>
                  <p className="section-subtitle">Resume your courses and keep progressing</p>
                </div>
                {enrollments.length > 0 && (
                  <Link to="/my-courses" className="btn-ghost text-sm hidden sm:inline-flex">
                    View All →
                  </Link>
                )}
              </div>

              {enrollments.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">No courses yet</h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't enrolled in any courses. Explore our catalog to get started!</p>
                  <Link to="/courses" className="btn-primary">
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <div className="content-grid grid md:grid-cols-2 lg:grid-cols-3">
                  {enrollments.slice(0, 6).map((e: any, i: number) => (
                    <motion.div
                      key={e.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link to={`/learning/${e.course?.id}`} className="card block overflow-hidden group h-full">
                        <div className="relative overflow-hidden h-48 bg-gray-100">
                          <img
                            src={e.course?.thumbnail_url || `https://picsum.photos/seed/${e.course?.id}/400/240`}
                            alt={e.course?.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <span className="text-white text-sm font-semibold">Resume</span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors text-base">
                            {e.course?.title}
                          </h3>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500 font-medium">Progress</span>
                            <span className="text-xs text-gray-700 font-semibold">{e.progress_percentage || 0}%</span>
                          </div>
                          <div className="clay-progress-track h-2 mt-2">
                            <div className="clay-progress-fill h-2" style={{ width: `${e.progress_percentage || 0}%` }} />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                  {enrollments.length > 6 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      className="col-span-full flex justify-center mt-8"
                    >
                      <Link to="/my-courses" className="btn-primary">
                        View All Courses
                      </Link>
                    </motion.div>
                  )}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  )
}


            {/* Continue Learning */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Continue Learning</h2>
                  <p className="text-sm text-gray-500 mt-1">Resume your courses and keep progressing</p>
                </div>
                {enrollments.length > 0 && (
                  <Link to="/my-courses" className="btn-ghost text-sm hidden sm:inline-flex">
                    View All →
                  </Link>
                )}
              </div>

              {enrollments.length === 0 ? (
                <div className="card card-no-hover p-12 text-center">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No courses yet</h3>
                  <p className="text-gray-500 mb-6">You haven't enrolled in any courses. Explore our catalog to get started!</p>
                  <Link to="/courses" className="btn-primary">
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrollments.slice(0, 6).map((e: any, i: number) => (
                      <motion.div
                        key={e.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i }}
                      >
                        <Link to={`/learning/${e.course?.id}`} className="card block overflow-hidden group h-full">
                          <div className="relative overflow-hidden h-40 bg-gray-200">
                            <img
                              src={e.course?.thumbnail_url || `https://picsum.photos/seed/${e.course?.id}/400/200`}
                              alt={e.course?.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <div className="text-white text-center">
                                <p className="text-sm font-semibold">Resume</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                              {e.course?.title}
                            </h3>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-xs text-gray-500 font-medium">Progress</span>
                                  <span className="text-xs text-gray-700 font-semibold">{e.progress_percentage || 0}%</span>
                                </div>
                                <div className="clay-progress-track h-2">
                                  <div className="clay-progress-fill h-2" style={{ width: `${e.progress_percentage || 0}%` }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  {enrollments.length > 6 && (
                    <div className="text-center mt-6 sm:hidden">
                      <Link to="/my-courses" className="btn-primary">
                        View All Courses
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
