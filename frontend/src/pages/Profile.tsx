import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Save, Shield } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { getInitials } from '../lib/utils'
import toast from 'react-hot-toast'
import api from '../services/api'

export default function Profile() {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.put('/profile', form)
      toast.success('Profile updated!')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'security', label: 'Security', icon: Shield },
  ]

  return (
    <div className="container-app py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar tabs */}
          <div className="lg:col-span-1">
            <div className="card card-no-hover p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.key ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <tab.icon className="w-4 h-4" /> {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="card card-no-hover p-6 md:p-8">
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                    {getInitials(user?.first_name, user?.last_name)}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">{user?.first_name} {user?.last_name}</h2>
                    <span className="clay-badge bg-primary-50 text-primary-600 text-xs capitalize mt-1">{user?.role}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> First Name</label>
                      <input type="text" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} className="input" required />
                    </div>
                    <div>
                      <label className="label">Last Name</label>
                      <input type="text" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} className="input" required />
                    </div>
                  </div>
                  <div>
                    <label className="label flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" required />
                  </div>
                  <div>
                    <label className="label">Bio</label>
                    <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="input" rows={3} placeholder="Tell us about yourself..." />
                  </div>
                  <button type="submit" disabled={saving} className="btn-primary">
                    <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="card card-no-hover p-6 md:p-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Change Password</h2>
                <p className="text-sm text-gray-500 mb-6">Update your password to keep your account secure.</p>
                <form className="space-y-5 max-w-md" onSubmit={(e) => { e.preventDefault(); toast.success('Password updated!') }}>
                  <div>
                    <label className="label">Current Password</label>
                    <input type="password" className="input" required />
                  </div>
                  <div>
                    <label className="label">New Password</label>
                    <input type="password" className="input" required />
                  </div>
                  <div>
                    <label className="label">Confirm New Password</label>
                    <input type="password" className="input" required />
                  </div>
                  <button type="submit" className="btn-primary">
                    <Shield className="w-4 h-4" /> Update Password
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
