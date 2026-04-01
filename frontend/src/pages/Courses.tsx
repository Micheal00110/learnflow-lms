import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

interface Course {
  id: number
  title: string
  slug: string
  short_description: string
  thumbnail_url: string
  price: number
  final_price: number
  category: string
  level: string
  instructor: { first_name: string; last_name: string }
  rating_stats: { average: number; count: number }
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState('')

  useEffect(() => {
    fetchCourses()
  }, [category, level])

  const fetchCourses = () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    if (level) params.append('level', level)
    if (search) params.append('search', search)
    api.get(`/courses?${params.toString()}`).then((res) => {
      setCourses(res.data.data || [])
      setLoading(false)
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchCourses()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore Courses</h1>
      
      <form onSubmit={handleSearch} className="flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input flex-1 min-w-64"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
          <option value="">All Categories</option>
          <option value="Development">Development</option>
          <option value="Business">Business</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>
        <select value={level} onChange={(e) => setLevel(e.target.value)} className="input">
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <button type="submit" className="btn-primary">Search</button>
      </form>

      {loading ? (
        <p className="text-center py-12">Loading courses...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Link key={course.id} to={`/courses/${course.slug}`} className="card hover:shadow-lg transition-shadow">
              <img src={course.thumbnail_url || 'https://via.placeholder.com/400x200'} alt={course.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold mb-1 line-clamp-1">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{course.instructor?.first_name} {course.instructor?.last_name}</p>
                <div className="flex items-center gap-1 text-sm mb-2">
                  <span className="font-bold">{course.rating_stats?.average || 0}</span>
                  <span className="text-yellow-400">★</span>
                  <span className="text-gray-500">({course.rating_stats?.count || 0})</span>
                </div>
                <p className="font-bold">
                  {course.final_price === 0 ? 'Free' : `$${course.final_price}`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
