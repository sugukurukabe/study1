import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { BookOpen, Trophy, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default async function HomePage() {
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <Link href="/learn">
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
          <Link href="/exam/drill">
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


