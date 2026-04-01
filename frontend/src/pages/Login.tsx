import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, GraduationCap, LogIn } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'
import api from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', form)
      login(data.user, data.access_token)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Login failed')
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
          <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
          <p className="text-gray-500 mt-1">Sign in to continue learning</p>
        </div>

        <div className="card card-no-hover p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input"
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input pr-10"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
              {loading ? 'Signing in...' : <><LogIn className="w-4 h-4" /> Sign In</>}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">Create one</Link>
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 card card-no-hover text-center">
          <p className="text-xs text-gray-400 mb-2">Demo accounts</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['student@learnflow.com', 'instructor@learnflow.com', 'admin@learnflow.com'].map((email) => (
              <button
                key={email}
                onClick={() => setForm({ email, password: 'password' })}
                className="text-xs px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors font-medium"
              >
                {email.split('@')[0]}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
