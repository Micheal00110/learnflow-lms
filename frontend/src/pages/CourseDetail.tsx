import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, BarChart3, BookOpen, Users, Star, ChevronDown, ChevronUp, Play, CheckCircle2, Lock } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { PageLoader } from '../components/ui/Spinner'
import toast from 'react-hot-toast'
import api from '../services/api'

export default function CourseDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const [course, setCourse] = useState<any>(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [expandedModule, setExpandedModule] = useState<number | null>(null)
  const [enrolling, setEnrolling] = useState(false)

  useEffect(() => {
    api.get(`/courses/${slug}`).then((res) => {
      setCourse(res.data.course)
      setIsEnrolled(res.data.is_enrolled)
    })
  }, [slug])

  const handleEnroll = async () => {
    if (!isAuthenticated) { navigate('/login'); return }
    setEnrolling(true)
    try {
      await api.post(`/enrollments/${course.id}`)
      setIsEnrolled(true)
      toast.success('Successfully enrolled!')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Enrollment failed')
    } finally {
      setEnrolling(false)
    }
  }

  if (!course) return <PageLoader />

  const totalLessons = course.modules?.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0) || 0

  return (
    <div className="container-app py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/courses" className="hover:text-primary-600 transition-colors">Courses</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium truncate">{course.title}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative rounded-2xl overflow-hidden mb-6">
              <img
                src={course.thumbnail_url || `https://picsum.photos/seed/${course.id}/800/400`}
                alt={course.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="clay-badge bg-white/20 backdrop-blur-md text-white text-xs mb-3 capitalize">{course.level}</span>
                <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{course.title}</h1>
              </div>
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 mb-8 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-semibold">{course.rating_stats?.average || 0}</span>
                <span>({course.rating_stats?.count || 0} reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{course.enrollments_count || 0} students</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <BookOpen className="w-4 h-4" />
                <span>{totalLessons} lessons</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <BarChart3 className="w-4 h-4" />
                <span className="capitalize">{course.level}</span>
              </div>
            </div>

            {/* Description */}
            <div className="card card-no-hover p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-3">About this course</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{course.description}</p>
            </div>

            {/* Modules */}
            <div className="card card-no-hover p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Course Content</h2>
              <div className="space-y-3">
                {course.modules?.map((mod: any, i: number) => (
                  <div key={mod.id} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 text-sm font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-sm">{mod.title}</h3>
                          <p className="text-xs text-gray-500">{mod.lessons?.length || 0} lessons</p>
                        </div>
                      </div>
                      {expandedModule === mod.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>
                    {expandedModule === mod.id && mod.lessons && (
                      <div className="border-t border-gray-100 divide-y divide-gray-50">
                        {mod.lessons.map((lesson: any) => (
                          <div key={lesson.id} className="flex items-center gap-3 px-4 py-3 text-sm">
                            {lesson.type === 'video' ? <Play className="w-4 h-4 text-gray-400" /> : <BookOpen className="w-4 h-4 text-gray-400" />}
                            <span className="text-gray-700 flex-1">{lesson.title}</span>
                            {lesson.is_free_preview && <span className="text-xs text-primary-500 font-medium">Preview</span>}
                            {!lesson.is_free_preview && !isEnrolled && <Lock className="w-3.5 h-3.5 text-gray-300" />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="sticky top-24">
            <div className="card card-no-hover p-6">
              <p className="text-3xl font-bold text-gray-800 mb-4">
                {course.final_price === 0 ? (
                  <span className="text-emerald-600">Free</span>
                ) : (
                  <>
                    <span>${course.final_price}</span>
                    {course.price !== course.final_price && (
                      <span className="text-lg text-gray-400 line-through ml-2">${course.price}</span>
                    )}
                  </>
                )}
              </p>

              {isEnrolled ? (
                <button onClick={() => navigate(`/learning/${course.id}`)} className="btn-primary w-full py-3 text-base mb-4">
                  <Play className="w-5 h-5" /> Continue Learning
                </button>
              ) : (
                <button onClick={handleEnroll} disabled={enrolling} className="btn-primary w-full py-3 text-base mb-4">
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>
              )}

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-gray-600">
                  <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Lessons</span>
                  <span className="font-semibold">{totalLessons}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Duration</span>
                  <span className="font-semibold">{course.duration_minutes || 0}m</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span className="flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Level</span>
                  <span className="font-semibold capitalize">{course.level}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Certificate</span>
                  <span className="font-semibold">Yes</span>
                </div>
              </div>
            </div>

            {/* Instructor */}
            {course.instructor && (
              <div className="card card-no-hover p-6 mt-4">
                <h3 className="font-semibold text-gray-800 mb-3">Instructor</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center font-bold shadow-md">
                    {course.instructor.first_name?.[0]}{course.instructor.last_name?.[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{course.instructor.first_name} {course.instructor.last_name}</p>
                    <p className="text-xs text-gray-500">{course.instructor.bio || 'Expert Instructor'}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
