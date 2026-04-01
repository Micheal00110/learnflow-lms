import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../services/api'

interface Course {
  id: number
  title: string
  slug: string
  short_description: string
  thumbnail_url: string
  price: number
  final_price: number
  instructor: { first_name: string; last_name: string }
  rating_stats: { average: number; count: number }
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/courses?per_page=6').then((res) => {
      setCourses(res.data.data || [])
      setLoading(false)
    })
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Unlock Your Potential</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">Learn from expert instructors and advance your career with thousands of courses in tech, business, and more.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses" className="btn-primary bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">Explore Courses</Link>
            <Link to="/register" className="btn-primary border border-white text-white bg-transparent hover:bg-white/10 px-8 py-3">Start Learning Free</Link>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Courses</h2>
          <Link to="/courses" className="text-blue-600 hover:underline">View All</Link>
        </div>
        {loading ? (
          <p className="text-center">Loading courses...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link key={course.id} to={`/courses/${course.slug}`} className="card hover:shadow-lg transition-shadow">
                <img src={course.thumbnail_url || 'https://via.placeholder.com/400x200'} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{course.instructor?.first_name} {course.instructor?.last_name}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="font-bold">{course.rating_stats?.average || 0}</span>
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-500">({course.rating_stats?.count || 0})</span>
                  </div>
                  <p className="font-bold text-lg">
                    {course.final_price === 0 ? 'Free' : `$${course.final_price}`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
