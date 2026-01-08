'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useTierAccess } from '@/lib/hooks/useTierAccess'
import { AlertCircle, Clock, Flag } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface Question {
  id: string
  question_ja: string
  options: { [key: string]: string }
  correct_answer: string
}

export default function SimulationPage() {
  const router = useRouter()
  const { hasAccess } = useTierAccess(3)
  
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [flagged, setFlagged] = useState<Set<number>>(new Set())
  const [timeRemaining, setTimeRemaining] = useState(60 * 60) // 60 minutes
  const [started, setStarted] = useState(false)
  const [showFurigana, setShowFurigana] = useState(false)

  useEffect(() => {
    if (!hasAccess) {
      router.push('/profile/tier-upgrade')
    }
  }, [hasAccess])

  useEffect(() => {
    if (started && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [started, timeRemaining])

  const loadQuestions = async () => {
    const supabase = createClient()
    
    // Load 100 questions for simulation
    const { data } = await supabase
      .from('exam_questions')
      .select('id, question_ja, options, correct_answer')
      .limit(100)

    if (data) {
      const shuffled = [...data].sort(() => Math.random() - 0.5)
      setQuestions(shuffled)
      setStarted(true)
    }
  }

  const handleAnswer = (questionIndex: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }))
  }

  const toggleFlag = (questionIndex: number) => {
    setFlagged(prev => {
      const next = new Set(prev)
      if (next.has(questionIndex)) {
        next.delete(questionIndex)
      } else {
        next.add(questionIndex)
      }
      return next
    })
  }

  const handleSubmit = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return

    // Calculate score
    let correct = 0
    const userAnswers = []
    
    for (let i = 0; i < questions.length; i++) {
      const userAnswer = answers[i]
      const isCorrect = userAnswer === questions[i].correct_answer
      if (isCorrect) correct++
      
      userAnswers.push({
        user_id: user.id,
        question_id: questions[i].id,
        answer: userAnswer || '',
        is_correct: isCorrect,
      })
    }

    // Save all answers
    await supabase.from('user_answers').insert(userAnswers)

    // Redirect to results
    router.push(`/exam/results?correct=${correct}&total=${questions.length}&simulation=true`)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold mb-4">
                CBT本番シミュレーション
              </h1>
              <p className="text-gray-600 mb-6">
                実際の試験環境を再現したシミュレーションです
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">注意事項</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>制限時間: 60分</li>
                    <li>問題数: 100問</li>
                    <li>途中保存はできません</li>
                    <li>PCまたはタブレットを横向きにしてください</li>
                    <li>静かな環境で受験してください</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button
              onClick={loadQuestions}
              size="lg"
              className="w-full"
            >
              試験を開始
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-xl text-white">問題を読み込んでいます...</div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const options = Object.entries(currentQuestion.options)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Timer Header */}
      <div className="fixed top-0 left-0 right-0 bg-black p-4 z-10 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-white border-white">
              問題 {currentIndex + 1} / {questions.length}
            </Badge>
            {flagged.has(currentIndex) && (
              <Flag className="h-5 w-5 text-amber-500 fill-amber-500" />
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-red-500" />
            <span className={`text-2xl font-mono ${timeRemaining < 300 ? 'text-red-500' : ''}`}>
              残り時間: {formatTime(timeRemaining)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-8">
            {/* Question */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFurigana(!showFurigana)}
                  className="text-white border-white hover:bg-white/20"
                >
                  ふりがな: {showFurigana ? 'ON' : 'OFF'}
                </Button>
              </div>
              <p className="text-lg leading-relaxed whitespace-pre-wrap">
                {currentQuestion.question_ja}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {options.map(([key, value]) => {
                const isSelected = answers[currentIndex] === key
                
                return (
                  <button
                    key={key}
                    onClick={() => handleAnswer(currentIndex, key)}
                    className={`w-full p-4 text-left rounded-lg text-xl transition-colors ${
                      isSelected
                        ? 'bg-blue-600 hover:bg-blue-500'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    {key}. {value}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black p-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="text-white border-white hover:bg-white/20"
          >
            前の問題
          </Button>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => toggleFlag(currentIndex)}
              className="text-white border-white hover:bg-white/20"
            >
              <Flag className={flagged.has(currentIndex) ? 'fill-amber-500 text-amber-500' : ''} />
            </Button>

            <Button
              variant="destructive"
              onClick={handleSubmit}
            >
              試験を終了
            </Button>
          </div>

          <Button
            onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
            disabled={currentIndex === questions.length - 1}
            className="bg-blue-600 hover:bg-blue-500"
          >
            次の問題
          </Button>
        </div>
      </div>
    </div>
  )
}


