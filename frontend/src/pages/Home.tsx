import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Users, Award, Star, ArrowRight, Sparkles, Code, Palette, TrendingUp, Megaphone } from 'lucide-react'
import api from '../services/api'
import { CourseCardSkeleton } from '../components/ui/Skeleton'

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

const categories = [
  { name: 'Development', icon: Code, color: 'from-blue-500 to-cyan-500' },
  { name: 'Design', icon: Palette, color: 'from-pink-500 to-rose-500' },
  { name: 'Business', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
  { name: 'Marketing', icon: Megaphone, color: 'from-orange-500 to-amber-500' },
]

const stats = [
  { label: 'Courses', value: '200+', icon: BookOpen },
  { label: 'Students', value: '50K+', icon: Users },
  { label: 'Certificates', value: '10K+', icon: Award },
  { label: 'Rating', value: '4.8', icon: Star },
]

export default function Home() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/courses?per_page=6').then((res) => {
      setCourses(res.data.data || [])
    }).finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient text-white py-24 md:py-32 relative">
        <div className="container-app relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> New courses added weekly
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
              Unlock Your<br />Potential
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/80 leading-relaxed">
              Master new skills with expert-led courses in tech, business, design, and more. Learn at your own pace, earn certificates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/courses')} className="btn-primary bg-white !text-primary-600 hover:!bg-gray-50 px-8 py-3.5 text-base shadow-xl shadow-black/10">
                Explore Courses <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('/register')} className="btn-secondary !bg-white/10 !text-white !border-white/20 hover:!bg-white/20 px-8 py-3.5 text-base backdrop-blur-sm">
                Start Free
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-app -mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="clay-stat text-center">
              <stat.icon className="w-6 h-6 text-primary-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Categories */}
      <section className="container-app py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Browse by Category</h2>
        <p className="text-gray-500 mb-8">Find courses in your area of interest</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
            >
              <Link
                to={`/courses?category=${cat.name}`}
                className="card card-no-hover p-5 flex flex-col items-center text-center gap-3 group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-700">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container-app pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Featured Courses</h2>
            <p className="text-gray-500">Hand-picked courses to get you started</p>
          </div>
          <Link to="/courses" className="btn-ghost hidden sm:inline-flex">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <CourseCardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
              >
                <Link to={`/courses/${course.slug}`} className="card block overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <img
                      src={course.thumbnail_url || `https://picsum.photos/seed/${course.id}/400/220`}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="clay-badge bg-white/90 backdrop-blur-sm text-gray-700 text-xs capitalize">{course.level}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">{course.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {course.instructor?.first_name} {course.instructor?.last_name}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-semibold text-gray-700">{course.rating_stats?.average || 0}</span>
                        <span className="text-xs text-gray-400">({course.rating_stats?.count || 0})</span>
                      </div>
                      <span className={`text-lg font-bold ${course.final_price === 0 ? 'text-emerald-600' : 'text-gray-800'}`}>
                        {course.final_price === 0 ? 'Free' : `$${course.final_price}`}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link to="/courses" className="btn-primary">View All Courses</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="container-app pb-16">
        <div className="card card-no-hover p-8 md:p-12 text-center bg-gradient-to-br from-primary-50 to-purple-50 border-primary-100">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Ready to start learning?</h2>
          <p className="text-gray-500 mb-6 max-w-lg mx-auto">
            Join thousands of learners and start building skills that matter. Create your free account today.
          </p>
          <button onClick={() => navigate('/register')} className="btn-primary px-8 py-3 text-base">
            Create Free Account <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  )
}
