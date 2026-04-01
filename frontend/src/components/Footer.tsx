import { Link } from 'react-router-dom'
import { GraduationCap, Github, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/40 mt-20">
      <div className="container-app py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-7 h-7 text-primary-500" />
              <span className="text-lg font-bold text-gray-800">LearnFlow</span>
            </Link>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
              Empowering learners worldwide with expert-led courses in technology, business, design, and more.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/courses" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Browse Courses</Link></li>
              <li><Link to="/register" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Become an Instructor</Link></li>
              <li><Link to="/register" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">Sign Up</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-gray-500">Help Center</span></li>
              <li><span className="text-sm text-gray-500">Contact Us</span></li>
              <li><span className="text-sm text-gray-500">Privacy Policy</span></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/40 gap-4">
          <p className="text-xs text-gray-400 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> using React & Laravel
          </p>
          <div className="flex items-center gap-4">
            <Github className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  )
}
