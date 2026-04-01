import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Save } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../services/api'

export default function CreateCourse() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', description: '', level: 'beginner', price: 0, category: 'Development' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/courses', form)
      toast.success('Course created!')
      navigate('/instructor')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create course')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-app py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Create New Course</h1>
        <p className="text-gray-500 mb-8">Fill in the details to create your course</p>

        <div className="card card-no-hover p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label">Course Title</label>
              <input type="text" placeholder="e.g., Complete Web Development Bootcamp" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" required />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea placeholder="What will students learn in this course?" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input" rows={5} />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="label">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input">
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <div>
                <label className="label">Level</label>
                <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="input">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div>
              <label className="label">Price (USD, 0 for free)</label>
              <input type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} className="input" />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={loading} className="btn-primary">
                <Save className="w-4 h-4" /> {loading ? 'Creating...' : 'Create Course'}
              </button>
              <button type="button" onClick={() => navigate('/instructor')} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
