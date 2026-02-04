import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import LearningStats from '@/components/learning/LearningStats'

interface StatsPageProps {
  params: Promise<{ locale: string }>
}

export default async function StatsPage({ params }: StatsPageProps) {
  const { locale } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // すべての進捗データを取得
  const { data: allProgress } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', user.id)

  // すべてのレッスンを取得
  const { data: allLessons } = await supabase
    .from('lessons')
    .select('id, duration_seconds')

  // 統計計算
  const totalLessons = allLessons?.length || 0
  const completedLessons = allProgress?.filter(p => p.status === 'completed').length || 0
  const inProgressLessons = allProgress?.filter(p => p.status === 'in_progress').length || 0

  // 総学習時間（分）
  const totalMinutes = allProgress?.reduce((sum, p) => {
    return sum + (p.last_position || 0)
  }, 0) / 60 || 0

  // 今週の学習時間
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const weeklyProgress = allProgress?.filter(p => 
    p.last_accessed_at && new Date(p.last_accessed_at) >= oneWeekAgo
  ) || []
  const weeklyMinutes = weeklyProgress.reduce((sum, p) => {
    return sum + (p.last_position || 0)
  }, 0) / 60

  // 連続学習日数の計算（簡易版）
  const uniqueDates = new Set(
    allProgress
      ?.filter(p => p.last_accessed_at)
      .map(p => p.last_accessed_at!.split('T')[0])
  )
  const streak = uniqueDates.size

  // 業種別進捗
  const progressBySector = allProgress?.reduce((acc, p) => {
    const lesson = allLessons?.find(l => l.id === p.lesson_id)
    if (lesson) {
      const sectorId = p.lesson_id.split('-')[0]
      if (!acc[sectorId]) {
        acc[sectorId] = { completed: 0, inProgress: 0, total: 0 }
      }
      if (p.status === 'completed') acc[sectorId].completed++
      if (p.status === 'in_progress') acc[sectorId].inProgress++
      acc[sectorId].total++
    }
    return acc
  }, {} as Record<string, { completed: number; inProgress: number; total: number }>)

  const sectorNames: Record<string, string> = {
    agriculture: '農業',
    livestock: '畜産業',
    fishery: '漁業',
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link href={`/${locale}/home`}>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            ホームに戻る
          </Button>
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          学習統計
        </h1>
        <p className="text-gray-600">
          あなたの学習の記録と進捗を確認しましょう
        </p>
      </div>

      {/* 統計コンポーネント */}
      <LearningStats
        totalLessons={totalLessons}
        completedLessons={completedLessons}
        inProgressLessons={inProgressLessons}
        totalMinutes={totalMinutes}
        weeklyMinutes={weeklyMinutes}
        streak={streak}
        currentTier={profile?.current_tier || 1}
        locale={locale}
      />

      {/* 業種別進捗 */}
      {progressBySector && Object.keys(progressBySector).length > 0 && (
        <Card className="mt-6 border-2 border-indigo-200">
          <CardHeader>
            <CardTitle>業種別進捗</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(progressBySector).map(([sectorId, stats]) => (
                <div key={sectorId}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{sectorNames[sectorId] || sectorId}</span>
                    <span className="text-sm text-gray-600">
                      {stats.completed} / {stats.total} 完了
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 学習のヒント */}
      <Card className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">💡 学習のヒント</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 毎日少しずつ学習することで、記憶の定着が良くなります</li>
            <li>• 動画を見た後は、テキストで復習すると効果的です</li>
            <li>• ドリル練習で知識を確認しましょう</li>
            <li>• 連続学習日数を伸ばして、習慣化を目指しましょう</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
