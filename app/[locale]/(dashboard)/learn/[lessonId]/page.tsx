'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import LessonTabs from '@/components/learning/LessonTabs'
import { useLearningStore } from '@/lib/stores/learningStore'

export default function LessonPage() {
  const router = useRouter()
  const params = useParams()
  const lessonId = params.lessonId as string
  
  const [lesson, setLesson] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [startPosition, setStartPosition] = useState(0)
  
  const { updateProgress } = useLearningStore()

  useEffect(() => {
    loadLesson()
  }, [lessonId])

  const loadLesson = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    // Load lesson
    const { data: lessonData } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', lessonId)
      .single()

    if (!lessonData) {
      router.push('/learn')
      return
    }

    // Check tier access
    const { data: profile } = await supabase
      .from('profiles')
      .select('current_tier')
      .eq('id', user.id)
      .single()

    if (!profile || profile.current_tier < lessonData.required_tier) {
      router.push('/learn')
      return
    }

    // Load progress
    const { data: progressData } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId)
      .single()

    if (progressData) {
      setStartPosition(progressData.last_position || 0)
      const progressPercent = progressData.last_position && lessonData.duration_seconds
        ? (progressData.last_position / lessonData.duration_seconds) * 100
        : 0
      setProgress(progressPercent)
    } else {
      // Create new progress entry
      await supabase.from('progress').insert({
        user_id: user.id,
        lesson_id: lessonId,
        status: 'in_progress',
      })
    }

    setLesson(lessonData)
    setLoading(false)
  }

  const handleProgress = async (time: number, type: 'video' | 'audio') => {
    if (!lesson) return

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return

    // Update progress in database
    await supabase
      .from('progress')
      .upsert({
        user_id: user.id,
        lesson_id: lessonId,
        status: 'in_progress',
        last_position: Math.floor(time),
        last_accessed_at: new Date().toISOString(),
      })

    // Update progress percentage
    if (lesson.duration_seconds) {
      const progressPercent = (time / lesson.duration_seconds) * 100
      setProgress(progressPercent)
      
      updateProgress(lessonId, {
        lessonId,
        status: 'in_progress',
        progress: progressPercent,
        lastPosition: Math.floor(time),
      })
    }
  }

  const handleComplete = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return

    await supabase
      .from('progress')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId)

    updateProgress(lessonId, {
      lessonId,
      status: 'completed',
      progress: 100,
    })

    router.push('/learn')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">読み込み中...</div>
      </div>
    )
  }

  if (!lesson) {
    return null
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link href="/learn">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            レッスン一覧に戻る
          </Button>
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {lesson.title_ja}
        </h1>
        
        {lesson.description_ja && (
          <p className="text-gray-600 mb-4">
            {lesson.description_ja}
          </p>
        )}

        {/* Progress Bar */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">進捗状況</span>
            <span className="text-sm text-gray-600">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} />
        </Card>
      </div>

      {/* Lesson Content */}
      <LessonTabs
        lesson={lesson}
        onProgress={handleProgress}
        startPosition={startPosition}
      />

      {/* Complete Button */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleComplete}
          size="lg"
          className="bg-green-600 hover:bg-green-700"
        >
          <CheckCircle2 className="h-5 w-5 mr-2" />
          このレッスンを完了する
        </Button>
      </div>
    </div>
  )
}


