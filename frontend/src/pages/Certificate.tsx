import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Award, Download, Calendar, Hash } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { PageLoader } from '../components/ui/Spinner'
import api from '../services/api'

export default function Certificate() {
  const { id } = useParams()
  const { user } = useAuthStore()
  const [certificate, setCertificate] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/certificates/${id}`).then((res) => {
      setCertificate(res.data.certificate || res.data)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [id])

  if (loading) return <PageLoader />
  if (!certificate) return <div className="container-app py-12 text-center text-gray-500">Certificate not found</div>

  return (
    <div className="container-app py-12">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-2xl mx-auto">
        <div className="card card-no-hover overflow-hidden">
          {/* Decorative top border */}
          <div className="h-2 bg-gradient-to-r from-primary-400 via-purple-500 to-pink-500" />

          <div className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Award className="w-8 h-8 text-white" />
            </div>

            <p className="text-sm font-semibold text-primary-500 uppercase tracking-widest mb-3">Certificate of Completion</p>
            <div className="w-12 h-1 bg-gradient-to-r from-primary-400 to-purple-500 mx-auto mb-6 rounded-full" />

            <p className="text-gray-500 mb-2">This certifies that</p>
            <h1 className="text-3xl font-black text-gray-800 mb-3">
              {user?.first_name} {user?.last_name}
            </h1>
            <p className="text-gray-500 mb-2">has successfully completed</p>
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-8">
              {certificate.course?.title || certificate.course_title || 'Course'}
            </h2>

            <div className="flex justify-center gap-8 text-sm mb-8">
              <div className="text-center">
                <Calendar className="w-5 h-5 text-gray-400 mx-auto mb-1.5" />
                <p className="font-semibold text-gray-800">{certificate.issued_at ? new Date(certificate.issued_at).toLocaleDateString() : 'N/A'}</p>
                <p className="text-xs text-gray-400">Date Issued</p>
              </div>
              <div className="text-center">
                <Hash className="w-5 h-5 text-gray-400 mx-auto mb-1.5" />
                <p className="font-semibold text-gray-800 font-mono text-xs">{certificate.certificate_number || id}</p>
                <p className="text-xs text-gray-400">Certificate ID</p>
              </div>
            </div>

            <button onClick={() => window.print()} className="btn-primary">
              <Download className="w-4 h-4" /> Download Certificate
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
