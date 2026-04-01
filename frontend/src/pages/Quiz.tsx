import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Award, RotateCcw } from 'lucide-react'
import { PageLoader } from '../components/ui/Spinner'
import toast from 'react-hot-toast'
import api from '../services/api'

export default function Quiz() {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState<any>(null)
  const [questions, setQuestions] = useState<any[]>([])
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentQ, setCurrentQ] = useState(0)

  useEffect(() => {
    api.get(`/quizzes/${quizId}/start`).then((res) => {
      setQuiz(res.data.quiz)
      setQuestions(res.data.quiz?.questions || res.data.questions || [])
    }).catch(() => toast.error('Failed to load quiz')).finally(() => setLoading(false))
  }, [quizId])

  const handleSubmit = async () => {
    try {
      const { data } = await api.post(`/quiz-attempts/${quizId}/submit`, { answers })
      setResult(data)
      setSubmitted(true)
    } catch {
      toast.error('Failed to submit quiz')
    }
  }

  if (loading) return <PageLoader />
  if (!quiz) return <div className="container-app py-12 text-center text-gray-500">Quiz not found</div>

  if (submitted && result) {
    const passed = result.is_passed
    return (
      <div className="container-app py-12">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md mx-auto">
          <div className="card card-no-hover p-10 text-center">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center ${passed ? 'bg-emerald-50' : 'bg-red-50'}`}>
              {passed ? <CheckCircle2 className="w-10 h-10 text-emerald-500" /> : <XCircle className="w-10 h-10 text-red-500" />}
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{passed ? 'Congratulations!' : 'Keep Trying!'}</h1>
            <p className="text-5xl font-black mb-2" style={{ color: passed ? '#10b981' : '#ef4444' }}>
              {result.percentage ?? 0}%
            </p>
            <p className="text-gray-500 mb-8">
              {passed ? 'You passed the quiz successfully.' : 'You did not reach the passing score.'}
            </p>
            <div className="flex gap-3 justify-center">
              {passed && (
                <button onClick={() => navigate('/my-courses')} className="btn-primary">
                  <Award className="w-4 h-4" /> Continue
                </button>
              )}
              <button onClick={() => { setSubmitted(false); setResult(null); setAnswers({}); setCurrentQ(0) }} className="btn-secondary">
                <RotateCcw className="w-4 h-4" /> Retake
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const question = questions[currentQ]

  return (
    <div className="container-app py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-800">{quiz.title || 'Quiz'}</h1>
          <span className="text-sm text-gray-500">{currentQ + 1} / {questions.length}</span>
        </div>

        {/* Progress */}
        <div className="clay-progress-track h-2 mb-8">
          <div className="clay-progress-fill h-2" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
        </div>

        {question && (
          <div className="card card-no-hover p-6 md:p-8 animate-slideUp" key={question.id}>
            <p className="text-lg font-semibold text-gray-800 mb-6">{currentQ + 1}. {question.question}</p>
            <div className="space-y-3">
              {(question.options || []).map((opt: string, j: number) => (
                <label
                  key={j}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${answers[question.id] === j ? 'border-primary-500 bg-primary-50' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}
                >
                  <input
                    type="radio"
                    name={`q-${question.id}`}
                    checked={answers[question.id] === j}
                    onChange={() => setAnswers({ ...answers, [question.id]: j })}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${answers[question.id] === j ? 'border-primary-500 bg-primary-500' : 'border-gray-300'}`}>
                    {answers[question.id] === j && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className="text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
            disabled={currentQ === 0}
            className="btn-secondary disabled:opacity-40"
          >
            Previous
          </button>
          {currentQ < questions.length - 1 ? (
            <button onClick={() => setCurrentQ(currentQ + 1)} className="btn-primary">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-primary bg-gradient-to-r from-emerald-500 to-emerald-600">
              Submit Quiz
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
