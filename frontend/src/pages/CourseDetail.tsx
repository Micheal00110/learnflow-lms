import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import api from '../services/api'

export default function CourseDetail() {
  const { slug } = useParams()
  const { isAuthenticated } = useAuthStore()
  const [course, setCourse] = useState<any>(null)
  const [isEnrolled, setIsEnrolled] = useState(false)

  useEffect(() => {
    api.get(`/courses/${slug}`).then((res) => { setCourse(res.data.course); setIsEnrolled(res.data.is_enrolled) })
  }, [slug])

  const handleEnroll = async () => {
    if (!isAuthenticated) { window.location.href = '/login'; return }
    await api.post(`/enrollments/${course?.id}`)
    setIsEnrolled(true)
  }

  if (!course) return <div className="p-8">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-6">{course.description}</p>
          <h2 className="text-xl font-semibold mb-4">Course Content</h2>
          {course.modules?.map((m: any, i: number) => (
            <div key={m.id} className="card mb-4">
              <div className="p-4 bg-gray-50"><h3 className="font-medium">Section {i + 1}: {m.title}</h3></div>
            </div>
          ))}
        </div>
        <div>
          <img src={course.thumbnail_url} alt={course.title} className="w-full h-48 object-cover rounded-lg mb-4" />
          <div className="card p-6">
            <p className="text-3xl font-bold mb-4">{course.final_price === 0 ? 'Free' : `$${course.final_price}`}</p>
            {isEnrolled ? (
              <Link to={`/learning/${course.id}`} className="w-full btn-primary block text-center">Continue Learning</Link>
            ) : (
              <button onClick={handleEnroll} className="w-full btn-primary">Enroll Now</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
