import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { Bell, LogOut, Menu, X, GraduationCap, LayoutDashboard, BookOpen, User, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getInitials } from '../../lib/utils'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
    setIsMobileOpen(false)
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 clay-navbar z-50">
      <div className="container-app">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              LearnFlow
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link to="/courses" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50/50 rounded-xl transition-all">
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> Courses</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50/50 rounded-xl transition-all">
                  Dashboard
                </Link>
                {user?.role === 'instructor' && (
                  <Link to="/instructor" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50/50 rounded-xl transition-all flex items-center gap-1.5">
                    <LayoutDashboard className="w-4 h-4" /> Instructor
                  </Link>
                )}
                <button className="relative p-2 rounded-xl hover:bg-primary-50/50 transition-colors">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-primary-50/50 transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                      {getInitials(user?.first_name, user?.last_name)}
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 clay-dropdown py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b border-gray-100 mb-1">
                          <p className="text-sm font-semibold text-gray-800">{user?.first_name} {user?.last_name}</p>
                          <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                        </div>
                        <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-primary-50/60 hover:text-primary-600 transition-colors">
                          <User className="w-4 h-4" /> Profile
                        </Link>
                        <Link to="/my-courses" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-primary-50/60 hover:text-primary-600 transition-colors">
                          <BookOpen className="w-4 h-4" /> My Courses
                        </Link>
                        <hr className="my-1 border-gray-100" />
                        <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <button className="md:hidden p-2 rounded-xl hover:bg-primary-50/50 transition-colors" onClick={() => setIsMobileOpen(!isMobileOpen)}>
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-white/40"
            >
              <div className="py-4 space-y-1">
                <Link to="/courses" onClick={() => setIsMobileOpen(false)} className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-primary-50/50 rounded-xl transition-colors">
                  Courses
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMobileOpen(false)} className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-primary-50/50 rounded-xl transition-colors">
                      Dashboard
                    </Link>
                    <Link to="/my-courses" onClick={() => setIsMobileOpen(false)} className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-primary-50/50 rounded-xl transition-colors">
                      My Courses
                    </Link>
                    {user?.role === 'instructor' && (
                      <Link to="/instructor" onClick={() => setIsMobileOpen(false)} className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-primary-50/50 rounded-xl transition-colors">
                        Instructor Dashboard
                      </Link>
                    )}
                    <Link to="/profile" onClick={() => setIsMobileOpen(false)} className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-primary-50/50 rounded-xl transition-colors">
                      Profile
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMobileOpen(false)} className="block px-4 py-3 text-sm font-medium text-gray-600 hover:bg-primary-50/50 rounded-xl transition-colors">
                      Sign In
                    </Link>
                    <Link to="/register" onClick={() => setIsMobileOpen(false)} className="block px-4 py-3 text-sm font-semibold text-primary-600 hover:bg-primary-50/50 rounded-xl transition-colors">
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
