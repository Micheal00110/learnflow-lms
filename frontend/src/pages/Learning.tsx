import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

export default function Learning() {
  const { courseId } = useParams()
  const [progress, setProgress] = useState<any>(null)
  useEffect(() => { api.get(`/enrollments/${courseId}/progress`).then((r) => setProgress(r.data)) }, [])
  if (!progress) return <div className="p-8">Loading...</div>
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 overflow-y-auto p-4">
        {progress.course?.modules?.map((m: any) => (
          <div key={m.id} className="mb-4">
            <h3 className="font-medium mb-2">{m.title}</h3>
            {m.lessons?.map((l: any) => (
              <div key={l.id} className="p-2 text-sm">{l.title}</div>
            ))}
          </div>
        ))}
      </aside>
      <main className="flex-1 p-8">Learning content here</main>
    </div>
  )
}
