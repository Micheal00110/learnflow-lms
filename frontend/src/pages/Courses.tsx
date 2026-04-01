import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, Star, X } from 'lucide-react'
import api from '../services/api'
import { CourseCardSkeleton } from '../components/ui/Skeleton'
import EmptyState from '../components/ui/EmptyState'

interface Course {
  id: number
  title: string
  slug: string
  thumbnail_url: string
  final_price: number
  level: string
  category: string
  instructor: { first_name: string; last_name: string }
  rating_stats: { average: number; count: number }
}

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('category') || '')

  const fetchCourses = () => {
    setLoading(true)
    const params = new URLSearchParams()
    const category = searchParams.get('category')
    const level = searchParams.get('level')
    if (category) params.append('category', category)
    if (level) params.append('level', level)
    if (search && !category) params.append('search', search)
    api.get(`/courses?${params.toString()}`).then((res) => {
      setCourses(res.data.data || [])
    }).finally(() => setLoading(false))
  }

  useEffect(() => { fetchCourses() }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchParams(search ? { search } : {})
  }

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) params.set(key, value)
    else params.delete(key)
    setSearchParams(params)
  }

  const clearFilters = () => {
    setSearch('')
    setSearchParams({})
  }

  const hasFilters = searchParams.toString().length > 0

  return (
    <div className="container-app py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Explore Courses</h1>
        <p className="text-gray-500">Discover courses taught by industry experts</p>
      </motion.div>

      {/* Filters */}
      <form onSubmit={handleSearch} className="card card-no-hover p-4 mb-8 animate-slideUp">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
            />
          </div>
          <select
            value={searchParams.get('category') || ''}
            onChange={(e) => setFilter('category', e.target.value)}
            className="input w-auto min-w-[150px]"
          >
            <option value="">All Categories</option>
            <option value="Development">Development</option>
            <option value="Business">Business</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
          <select
            value={searchParams.get('level') || ''}
            onChange={(e) => setFilter('level', e.target.value)}
            className="input w-auto min-w-[140px]"
          >
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <button type="submit" className="btn-primary">
            <Search className="w-4 h-4" /> Search
          </button>
          {hasFilters && (
            <button type="button" onClick={clearFilters} className="btn-ghost text-gray-400">
              <X className="w-4 h-4" /> Clear
            </button>
          )}
        </div>
      </form>

      {/* Results */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <CourseCardSkeleton key={i} />)}
        </div>
      ) : courses.length === 0 ? (
        <EmptyState
          icon={Filter}
          title="No courses found"
          description="Try adjusting your search or filters to find what you're looking for."
          action={{ label: 'Clear Filters', onClick: clearFilters }}
        />
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">{courses.length} course{courses.length !== 1 ? 's' : ''} found</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course, i) => (
              <motion.div key={course.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * i }}>
                <Link to={`/courses/${course.slug}`} className="card block overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <img
                      src={course.thumbnail_url || `https://picsum.photos/seed/${course.id}/400/220`}
                      alt={course.title}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="clay-badge bg-white/90 backdrop-blur-sm text-gray-700 text-xs capitalize">{course.level}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors text-sm">{course.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">{course.instructor?.first_name} {course.instructor?.last_name}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-semibold">{course.rating_stats?.average || 0}</span>
                        <span className="text-xs text-gray-400">({course.rating_stats?.count || 0})</span>
                      </div>
                      <span className={`font-bold ${course.final_price === 0 ? 'text-emerald-600' : 'text-gray-800'}`}>
                        {course.final_price === 0 ? 'Free' : `$${course.final_price}`}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
