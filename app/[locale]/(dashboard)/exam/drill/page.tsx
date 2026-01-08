'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react'

interface Question {
  id: string
  question_ja: string
  options: { [key: string]: string }
  correct_answer: string
  explanation_ja: string
  category: string
}

export default function DrillPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadQuestions()
  }, [])

  const loadQuestions = async () => {
    const supabase = createClient()
    
    // Load random 20 questions
    const { data } = await supabase
      .from('exam_questions')
      .select('*')
      .limit(20)

    if (data) {
      // Shuffle questions
      const shuffled = [...data].sort(() => Math.random() - 0.5)
      setQuestions(shuffled)
    }
    
    setLoading(false)
  }

  const handleAnswer = async (answer: string) => {
    if (showExplanation) return

    setSelectedAnswer(answer)
    setShowExplanation(true)

    const isCorrect = answer === currentQuestion.correct_answer
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }))

    // Save answer to database
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      await supabase.from('user_answers').insert({
        user_id: user.id,
        question_id: currentQuestion.id,
        answer,
        is_correct: isCorrect,
      })
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      // Show results
      router.push(`/exam/results?correct=${score.correct}&total=${score.total}`)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">問題を読み込んでいます...</div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-600 mb-4">
              問題がまだ登録されていません
            </p>
            <Button onClick={() => router.push('/home')}>
              ホームに戻る
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const options = Object.entries(currentQuestion.options)
  const progressPercent = ((currentIndex + 1) / questions.length) * 100

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline">{currentQuestion.category}</Badge>
          <span className="text-sm text-gray-600">
            問題 {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <Progress value={progressPercent} />
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {currentQuestion.question_ja}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {options.map(([key, value]) => {
              const isSelected = selectedAnswer === key
              const isCorrect = key === currentQuestion.correct_answer
              const showResult = showExplanation
              
              let buttonClass = 'w-full p-4 text-left border-2 rounded-lg transition-all'
              
              if (showResult) {
                if (isCorrect) {
                  buttonClass += ' border-green-500 bg-green-50'
                } else if (isSelected && !isCorrect) {
                  buttonClass += ' border-red-500 bg-red-50'
                } else {
                  buttonClass += ' border-gray-200'
                }
              } else if (isSelected) {
                buttonClass += ' border-indigo-500 bg-indigo-50'
              } else {
                buttonClass += ' border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
              }

              return (
                <button
                  key={key}
                  onClick={() => handleAnswer(key)}
                  disabled={showExplanation}
                  className={buttonClass}
                >
                  <div className="flex items-center">
                    <span className="font-bold mr-3 text-lg">{key}.</span>
                    <span className="flex-1">{value}</span>
                    {showResult && isCorrect && (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Explanation */}
      {showExplanation && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3 mb-3">
              {selectedAnswer === currentQuestion.correct_answer ? (
                <>
                  <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-green-800 mb-2">正解！</h3>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-red-800 mb-2">不正解</h3>
                  </div>
                </>
              )}
            </div>
            <div className="pl-9">
              <p className="text-gray-700 leading-relaxed">
                {currentQuestion.explanation_ja || '解説は準備中です'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          正解率: {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%
          ({score.correct}/{score.total})
        </div>
        
        {showExplanation && (
          <Button onClick={handleNext} size="lg">
            {currentIndex < questions.length - 1 ? (
              <>
                次の問題
                <ArrowRight className="h-5 w-5 ml-2" />
              </>
            ) : (
              '結果を見る'
            )}
          </Button>
        )}
      </div>
    </div>
  )
}


