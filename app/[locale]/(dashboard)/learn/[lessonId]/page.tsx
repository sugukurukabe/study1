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
  const [error, setError] = useState<string>('')
  const [progress, setProgress] = useState(0)
  const [startPosition, setStartPosition] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const { updateProgress } = useLearningStore()

  useEffect(() => {
    loadLesson()
  }, [lessonId])

  const loadLesson = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    const locale = params.locale as string || 'ja'
    
    // ログイン状態を保存
    setIsLoggedIn(!!user)

    // ログインなしでもレッスンを読み込む
    // Load lesson with error handling
    const { data: lessonData, error: lessonError } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', lessonId)
      .single()

    if (lessonError) {
      console.error('Lesson query error:', lessonError)
      setError(`レッスンの読み込みに失敗しました: ${lessonError.message}`)
      setLoading(false)
      return
    }

    if (!lessonData) {
      console.error('Lesson not found:', lessonId)
      setError('レッスンが見つかりませんでした。レッスンID: ' + lessonId)
      setLoading(false)
      return
    }

    // Tierチェックを削除 - 全員が全てのコンテンツにアクセス可能

    // Load progress - ログインしている場合のみ
    if (user) {
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
    }

    setLesson(lessonData)
    setLoading(false)
  }

  const handleProgress = async (time: number, type: 'video' | 'audio') => {
    if (!lesson) return

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    // ログインしていない場合は進捗を保存しない（動画は見れる）
    if (!user) {
      // ローカルで進捗表示だけ更新
      if (lesson.duration_seconds) {
        const progressPercent = (time / lesson.duration_seconds) * 100
        setProgress(progressPercent)
      }
      return
    }

    // ログインしている場合は進捗を保存
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
    
    const locale = params.locale as string || 'ja'

    // ログインしていない場合は、登録を促すメッセージを表示
    if (!user) {
      if (confirm('学習の進捗を記録するには、アカウント登録が必要です。登録ページに移動しますか？')) {
        router.push(`/${locale}/signup?redirect=/${locale}/learn/${lessonId}`)
      }
      return
    }

    // ログインしている場合は進捗を保存
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

    // 前のページに戻る
    router.back()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">読み込み中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <Card className="max-w-md w-full p-8 text-center border-2 border-red-200">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">エラーが発生しました</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Button 
              onClick={() => router.back()}
              variant="outline"
              className="w-full"
            >
              前のページに戻る
            </Button>
            <Button 
              onClick={() => router.push(`/${params.locale || 'ja'}/home`)}
              className="w-full"
            >
              ホームに戻る
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  if (!lesson) {
    return null
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* ログインしていない場合のバナー */}
      {!isLoggedIn && (
        <Card className="mb-6 border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">📚</div>
                <div>
                  <h3 className="font-bold text-gray-900">学習の進捗を記録しませんか？</h3>
                  <p className="text-sm text-gray-600">無料アカウント登録で、学習履歴の保存や模擬試験の受験ができます</p>
                </div>
              </div>
              <Link href={`/${params.locale || 'ja'}/signup?redirect=/${params.locale || 'ja'}/learn/${lessonId}`}>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  無料登録
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          戻る
        </Button>
        
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


