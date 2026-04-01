import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Play, FileText, CheckCircle2, Circle, ArrowLeft } from 'lucide-react'
import { PageLoader } from '../components/ui/Spinner'
import toast from 'react-hot-toast'
import api from '../services/api'

export default function Learning() {
  const { courseId } = useParams()
  const [progress, setProgress] = useState<any>(null)
  const [activeLesson, setActiveLesson] = useState<any>(null)
  const [expandedModule, setExpandedModule] = useState<number | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    api.get(`/enrollments/${courseId}/progress`).then((r) => {
      setProgress(r.data)
      const firstModule = r.data.course?.modules?.[0]
      if (firstModule) {
        setExpandedModule(firstModule.id)
        setActiveLesson(firstModule.lessons?.[0])
      }
    })
  }, [courseId])

  const markComplete = async () => {
    if (!activeLesson) return
    try {
      await api.post(`/lessons/${activeLesson.id}/progress`, { is_completed: true })
      toast.success('Lesson completed!')
    } catch {
      toast.error('Failed to update progress')
    }
  }

  if (!progress) return <PageLoader />

  const course = progress.course || {}

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 320 : 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white border-r border-gray-100 overflow-hidden flex-shrink-0"
      >
        <div className="w-80 h-full overflow-y-auto">
          <div className="p-4 border-b border-gray-100">
            <Link to="/my-courses" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 transition-colors mb-3">
              <ArrowLeft className="w-4 h-4" /> My Courses
            </Link>
            <h2 className="font-bold text-gray-800 line-clamp-2">{course.title}</h2>
          </div>

          <div className="py-2">
            {course.modules?.map((mod: any, i: number) => (
              <div key={mod.id}>
                <button
                  onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-primary-50 text-primary-600 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <span className="text-sm font-medium text-gray-700 text-left">{mod.title}</span>
                  </div>
                  {expandedModule === mod.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {expandedModule === mod.id && mod.lessons && (
                  <div className="bg-gray-50/50">
                    {mod.lessons.map((lesson: any) => (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full flex items-center gap-3 px-6 py-2.5 text-left transition-colors ${activeLesson?.id === lesson.id ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-100 text-gray-600'}`}
                      >
                        {lesson.type === 'video' ? <Play className="w-4 h-4 flex-shrink-0" /> : <FileText className="w-4 h-4 flex-shrink-0" />}
                        <span className="text-sm flex-1 line-clamp-1">{lesson.title}</span>
                        <Circle className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 max-w-4xl">
          {/* Toggle sidebar */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mb-4 btn-ghost text-sm text-gray-500">
            {sidebarOpen ? 'Hide' : 'Show'} Sidebar
          </button>

          {activeLesson ? (
            <motion.div key={activeLesson.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{activeLesson.title}</h1>
              <p className="text-sm text-gray-500 mb-6 capitalize">{activeLesson.type} Lesson</p>

              {/* Video placeholder */}
              {activeLesson.type === 'video' && (
                <div className="card card-no-hover mb-6 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                        <Play className="w-8 h-8 text-white fill-white" />
                      </div>
                      <p className="text-white/60 text-sm">{activeLesson.title}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Text content */}
              {activeLesson.type === 'text' && activeLesson.content && (
                <div className="card card-no-hover p-6 mb-6">
                  <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
                </div>
              )}

              {activeLesson.description && (
                <div className="card card-no-hover p-6 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{activeLesson.description}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={markComplete} className="btn-primary">
                  <CheckCircle2 className="w-4 h-4" /> Mark as Complete
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              Select a lesson from the sidebar
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
