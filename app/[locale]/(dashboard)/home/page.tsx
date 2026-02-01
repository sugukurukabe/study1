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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              完了レッスン
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress?.filter(p => p.status === 'completed').length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              学習を続けましょう
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              獲得バッジ
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {badges?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {profile?.current_tier === 1 ? 'Tier 2で解放' : '素晴らしい！'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              現在のTier
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Tier {profile?.current_tier || 1}
            </div>
            <p className="text-xs text-muted-foreground">
              {profile?.current_tier !== 3 && (
                <Link href="/profile/tier-upgrade" className="text-indigo-600 hover:underline">
                  アップグレード
                </Link>
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      {progress && progress.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>学習を続ける</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {progress.map((item) => (
                <div key={item.lesson_id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.lesson_id}</h3>
                    <Progress value={item.quiz_score || 0} className="mt-2" />
                  </div>
                  <Button asChild className="ml-4">
                    <Link href={`/learn/${item.lesson_id}`}>
                      続ける
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sectors - 業種選択 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
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
                  ? 'hover:shadow-lg hover:scale-[1.02] border-2 border-indigo-200' 
                  : 'opacity-50'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{sector.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {sector.ja}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {sector.id}
                        </p>
                      </div>
                    </div>
                    {sector.active ? (
                      <div className="flex items-center space-x-2">
                        <Video className="h-5 w-5 text-indigo-600" />
                        <ChevronRight className="h-6 w-6 text-gray-400" />
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <Link href={`/${locale}/learn`}>
            <CardHeader>
              <CardTitle>新しいレッスンを開始</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                新しいトピックを学習して知識を広げましょう
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <Link href={`/${locale}/exam/drill`}>
            <CardHeader>
              <CardTitle>ドリル練習</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                問題を解いて試験に備えましょう
              </p>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  )
}


