import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { BookOpen, Trophy, TrendingUp, Video, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

// セクターデータ
const sectors = [
  { slug: 'agriculture', ja: '農業', id: 'Pertanian', icon: '🌾', active: true },
  { slug: 'livestock', ja: '畜産業', id: 'Peternakan', icon: '🐄', active: true },
  { slug: 'fishery', ja: '漁業', id: 'Perikanan', icon: '🐟', active: false },
]

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // オンボーディング未完了でもコンテンツは見れるように（リダイレクトしない）
  const showOnboardingBanner = profile && !profile.onboarding_completed

  const { data: progress } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', user.id)
    .order('last_accessed_at', { ascending: false })
    .limit(3)

  const { data: badges } = await supabase
    .from('badges')
    .select('*')
    .eq('user_id', user.id)
    .order('earned_at', { ascending: false })
    .limit(5)

  // 最近学習したレッスンの詳細を取得
  const recentLessonIds = progress?.map(p => p.lesson_id) || []
  const { data: recentLessons } = recentLessonIds.length > 0
    ? await supabase
        .from('lessons')
        .select('id, title_ja, title_id, description_ja, duration_seconds, cloudflare_video_id_ja, cloudflare_video_id_id, category_id')
        .in('id', recentLessonIds)
    : { data: null }

  // ユーザーの好みの業種を取得
  const preferredSectors = profile?.preferred_sectors || []
  
  // 好みの業種のレッスンを優先的に表示
  const filteredSectors = preferredSectors.length > 0
    ? sectors.filter(s => preferredSectors.includes(s.slug))
    : sectors

  // 学習目標に応じたメッセージ
  const goalMessages: Record<string, string> = {
    exam_preparation: '試験合格に向けて頑張りましょう！',
    skill_improvement: 'スキルアップを目指して学習を続けましょう！',
    career_change: '新しいキャリアへの第一歩を踏み出しましょう！',
  }
  const goalMessage = profile?.learning_goal ? goalMessages[profile.learning_goal] : '今日も頑張りましょう！'

  // 今日の学習時間を計算（今日のprogressから）
  const today = new Date().toISOString().split('T')[0]
  const todayProgress = progress?.filter(p => 
    p.last_accessed_at && p.last_accessed_at.startsWith(today)
  ) || []
  const todayMinutes = todayProgress.reduce((sum, p) => {
    return sum + (p.last_position || 0)
  }, 0) / 60
  const dailyGoalMinutes = profile?.daily_goal_minutes || 30

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Onboarding Banner - リダイレクトせずにバナー表示 */}
      {showOnboardingBanner && (
        <Card className="mb-6 border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">🎯</div>
                <div>
                  <h3 className="font-bold text-gray-900">学習設定をカスタマイズしませんか？</h3>
                  <p className="text-sm text-gray-600">あなたに合った学習プランを作成できます</p>
                </div>
              </div>
              <Link href={`/${locale}/onboarding`}>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  設定する
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Welcome Section - パーソナライズ */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
          ようこそ、{profile?.full_name}さん
        </h1>
        <p className="text-gray-600">
          {goalMessage}
        </p>
      </div>

      {/* Continue Learning - 最近学習したレッスン（最優先表示） */}
      {recentLessons && recentLessons.length > 0 && (
        <Card className="mb-6 border-2 border-indigo-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-xl">
              <Video className="h-6 w-6 text-indigo-600" />
              <span>学習を続ける</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentLessons.map((lesson) => {
                const progressItem = progress?.find(p => p.lesson_id === lesson.id)
                const progressPercent = progressItem?.last_position && lesson.duration_seconds
                  ? Math.round((progressItem.last_position / lesson.duration_seconds) * 100)
                  : 0
                const hasVideo = lesson.cloudflare_video_id_ja || lesson.cloudflare_video_id_id

                return (
                  <Link key={lesson.id} href={`/${locale}/learn/${lesson.id}`}>
                    <Card className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-indigo-300 active:scale-[0.98]">
                      <CardContent className="p-4 md:p-5">
                        <div className="flex items-center gap-4">
                          {/* Video Thumbnail Icon */}
                          <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                            {hasVideo ? (
                              <Video className="h-8 w-8 md:h-10 md:w-10 text-white" />
                            ) : (
                              <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-white" />
                            )}
                          </div>
                          
                          {/* Lesson Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 text-base md:text-lg">
                              {lesson.title_ja}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                              {lesson.description_ja}
                            </p>
                            {progressPercent > 0 && (
                              <div className="flex items-center gap-2">
                                <Progress value={progressPercent} className="h-2" />
                                <span className="text-xs text-gray-500 whitespace-nowrap font-medium">
                                  {progressPercent}%
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {/* Continue Button */}
                          <ChevronRight className="h-6 w-6 md:h-7 md:w-7 text-indigo-600 flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 今日の学習進捗 - コンパクト版 */}
      {profile?.daily_goal_minutes && (
        <Card className="mb-6 border-2 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                今日の学習時間
              </span>
              <span className="text-sm font-bold text-green-700">
                {Math.round(todayMinutes)}分 / {dailyGoalMinutes}分
              </span>
            </div>
            <Progress 
              value={(todayMinutes / dailyGoalMinutes) * 100} 
              className="h-3"
            />
            {todayMinutes >= dailyGoalMinutes && (
              <p className="text-xs text-green-700 mt-2 font-medium">
                🎉 今日の目標達成！素晴らしい！
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Stats Grid - コンパクト版 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border border-indigo-100 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">完了レッスン</span>
              <BookOpen className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-indigo-600 mb-1">
              {progress?.filter(p => p.status === 'completed').length || 0}
            </div>
            {progress && progress.length > 0 && (
              <Progress 
                value={(progress.filter(p => p.status === 'completed').length / progress.length) * 100} 
                className="h-1.5"
              />
            )}
          </CardContent>
        </Card>

        <Card className="border border-purple-100 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">現在のTier</span>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-1">
              Tier {profile?.current_tier || 1}
            </div>
            {profile?.current_tier !== 3 ? (
              <Link href={`/${locale}/profile/tier-upgrade`} className="text-xs text-indigo-600 hover:underline font-medium">
                アップグレード →
              </Link>
            ) : (
              <span className="text-xs text-gray-600">最高レベル！</span>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sectors - 業種選択（パーソナライズ） */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {preferredSectors.length > 0 ? 'あなたの学習業種' : '学習する業種を選択'}
          </h2>
          {preferredSectors.length > 0 && (
            <Link href={`/${locale}/onboarding`}>
              <Button variant="outline" size="sm">
                変更
              </Button>
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(filteredSectors.length > 0 ? filteredSectors : sectors).map((sector) => (
            <Link
              key={sector.slug}
              href={sector.active ? `/${locale}/sectors/${sector.slug}` : '#'}
              className={sector.active ? '' : 'pointer-events-none'}
            >
              <Card className={`cursor-pointer transition-all ${
                sector.active 
                  ? 'hover:shadow-lg hover:scale-[1.02] border-2 border-indigo-200 active:scale-[0.98]' 
                  : 'opacity-50'
              }`}>
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-5xl md:text-6xl">{sector.icon}</div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                          {sector.ja}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600">
                          {sector.id}
                        </p>
                      </div>
                    </div>
                    {sector.active ? (
                      <div className="flex items-center space-x-2">
                        <Video className="h-6 w-6 md:h-7 md:w-7 text-indigo-600" />
                        <ChevronRight className="h-7 w-7 md:h-8 md:w-8 text-gray-400" />
                      </div>
                    ) : (
                      <Badge variant="outline">準備中</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions - モバイル最適化 + 統計追加 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Link href={`/${locale}/learn`}>
          <Card className="cursor-pointer hover:shadow-lg transition-all active:scale-[0.98] border-2 border-transparent hover:border-indigo-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg md:text-xl flex items-center space-x-2">
                <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-indigo-600" />
                <span>新しいレッスン</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm md:text-base">
                新しいトピックを学習
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href={`/${locale}/exam/drill`}>
          <Card className="cursor-pointer hover:shadow-lg transition-all active:scale-[0.98] border-2 border-transparent hover:border-indigo-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg md:text-xl flex items-center space-x-2">
                <Trophy className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />
                <span>ドリル練習</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm md:text-base">
                問題を解いて試験対策
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href={`/${locale}/stats`}>
          <Card className="cursor-pointer hover:shadow-lg transition-all active:scale-[0.98] border-2 border-transparent hover:border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg md:text-xl flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                <span>学習統計</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm md:text-base">
                進捗と記録を確認
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}


