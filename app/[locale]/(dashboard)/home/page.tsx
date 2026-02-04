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
        .select('id, title_ja, title_id, description_ja, duration_seconds, cloudflare_video_id_ja, cloudflare_video_id_id')
        .in('id', recentLessonIds)
    : { data: null }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ようこそ、{profile?.full_name}さん
        </h1>
        <p className="text-gray-600">
          今日も頑張りましょう！
        </p>
      </div>

      {/* Stats Grid - 改善された進捗表示 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-2 border-indigo-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              完了レッスン
            </CardTitle>
            <BookOpen className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-600">
              {progress?.filter(p => p.status === 'completed').length || 0}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              学習を続けましょう
            </p>
            {progress && progress.length > 0 && (
              <div className="mt-3">
                <Progress 
                  value={(progress.filter(p => p.status === 'completed').length / progress.length) * 100} 
                  className="h-2"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 border-amber-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              獲得バッジ
            </CardTitle>
            <Trophy className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">
              {badges?.length || 0}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {profile?.current_tier === 1 ? 'Tier 2で解放' : '素晴らしい！'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              現在のTier
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              Tier {profile?.current_tier || 1}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {profile?.current_tier !== 3 ? (
                <Link href={`/${locale}/profile/tier-upgrade`} className="text-indigo-600 hover:underline font-medium">
                  アップグレード →
                </Link>
              ) : (
                '最高レベル達成！'
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning - 最近学習したレッスン */}
      {recentLessons && recentLessons.length > 0 && (
        <Card className="mb-8 border-2 border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Video className="h-5 w-5 text-indigo-600" />
              <span>最近学習したレッスン</span>
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
                    <Card className="hover:shadow-md transition-all cursor-pointer border">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          {/* Video Thumbnail Icon */}
                          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                            {hasVideo ? (
                              <Video className="h-8 w-8 text-white" />
                            ) : (
                              <BookOpen className="h-8 w-8 text-white" />
                            )}
                          </div>
                          
                          {/* Lesson Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                              {lesson.title_ja}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                              {lesson.description_ja}
                            </p>
                            {progressPercent > 0 && (
                              <div className="flex items-center gap-2">
                                <Progress value={progressPercent} className="h-2" />
                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                  {progressPercent}%
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {/* Continue Button */}
                          <ChevronRight className="h-6 w-6 text-gray-400 flex-shrink-0" />
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

      {/* Sectors - 業種選択（モバイル最適化） */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          学習する業種を選択
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sectors.map((sector) => (
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

      {/* Quick Actions - モバイル最適化 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Link href={`/${locale}/learn`}>
          <Card className="cursor-pointer hover:shadow-lg transition-all active:scale-[0.98] border-2 border-transparent hover:border-indigo-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg md:text-xl flex items-center space-x-2">
                <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-indigo-600" />
                <span>新しいレッスンを開始</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm md:text-base">
                新しいトピックを学習して知識を広げましょう
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
                問題を解いて試験に備えましょう
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}


