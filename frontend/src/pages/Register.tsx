import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, GraduationCap, UserPlus } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'
import api from '../services/api'

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '', role: 'student' })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post('/auth/register', form)
      login(data.user, data.access_token || data.token)
      toast.success('Account created!')
      navigate('/dashboard')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Create your account</h1>
          <p className="text-gray-500 mt-1">Start your learning journey today</p>
        </div>

        <div className="card card-no-hover p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">First Name</label>
                <input type="text" placeholder="John" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} className="input" required />
              </div>
              <div>
                <label className="label">Last Name</label>
                <input type="text" placeholder="Doe" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} className="input" required />
              </div>
            </div>
            <div>
              <label className="label">Email</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" required />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} placeholder="Create a strong password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input pr-10" required />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="label">I want to</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setForm({ ...form, role: 'student' })} className={`p-3 rounded-xl border-2 text-center transition-all ${form.role === 'student' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 hover:border-gray-300'}`}>
                  <span className="text-sm font-semibold">Learn</span>
                  <p className="text-xs text-gray-500 mt-0.5">Take courses</p>
                </button>
                <button type="button" onClick={() => setForm({ ...form, role: 'instructor' })} className={`p-3 rounded-xl border-2 text-center transition-all ${form.role === 'instructor' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 hover:border-gray-300'}`}>
                  <span className="text-sm font-semibold">Teach</span>
                  <p className="text-xs text-gray-500 mt-0.5">Create courses</p>
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
              {loading ? 'Creating account...' : <><UserPlus className="w-4 h-4" /> Create Account</>}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">Sign in</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
