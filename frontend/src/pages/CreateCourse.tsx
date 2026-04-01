import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function CreateCourse() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', description: '', level: 'beginner', price: 0 })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await api.post('/courses', form)
    navigate('/dashboard')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Course Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input" rows={4} />
        <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="input">
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <input type="number" placeholder="Price (0 for free)" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })} className="input" />
        <button type="submit" className="btn-primary">Create Course</button>
      </form>
    </div>
  )
}
