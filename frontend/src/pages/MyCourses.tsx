import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

export default function MyCourses() {
  const [enrollments, setEnrollments] = useState([])
  useEffect(() => { api.get('/enrollments').then((r) => setEnrollments(r.data)) }, [])
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.map((e: any) => (
          <Link key={e.id} to={`/learning/${e.course.id}`} className="card hover:shadow-lg">
            <img src={e.course.thumbnail_url} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold mb-2">{e.course.title}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${e.progress_percentage || 0}%` }} />
              </div>
              <p className="text-sm text-gray-600">{e.progress_percentage || 0}% complete</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
