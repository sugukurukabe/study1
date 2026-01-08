import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Calendar, TrendingUp, CheckCircle2 } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function HistoryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('current_tier')
    .eq('id', user.id)
    .single()

  if (!profile || profile.current_tier < 2) {
    redirect('/profile/tier-upgrade')
  }

  // Get learning progress
  const { data: progress } = await supabase
    .from('progress')
    .select(`
      *,
      lessons(title_ja, duration_seconds)
    `)
    .eq('user_id', user.id)
    .order('last_accessed_at', { ascending: false })

  // Get exam history
  const { data: examHistory } = await supabase
    .from('user_answers')
    .select('*')
    .eq('user_id', user.id)
    .order('answered_at', { ascending: false })
    .limit(50)

  // Calculate stats
  const totalLessons = progress?.length || 0
  const completedLessons = progress?.filter(p => p.status === 'completed').length || 0
  const totalExamQuestions = examHistory?.length || 0
  const correctAnswers = examHistory?.filter(a => a.is_correct).length || 0

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          学習履歴
        </h1>
        <p className="text-gray-600">
          あなたの学習の軌跡を確認しましょう
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              完了レッスン
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedLessons}</div>
            <Progress value={(completedLessons / Math.max(totalLessons, 1)) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              全{totalLessons}レッスン中
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              問題正解率
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalExamQuestions > 0 ? Math.round((correctAnswers / totalExamQuestions) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {correctAnswers} / {totalExamQuestions} 問正解
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              学習時間
            </CardTitle>
            <Calendar className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress?.reduce((acc, p) => {
                const duration = (p.lessons as any)?.duration_seconds || 0
                return acc + (p.status === 'completed' ? duration : p.last_position || 0)
              }, 0) / 60 || 0} 分
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              累計学習時間
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Learning Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>レッスン進捗</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progress?.map((item) => (
              <div key={item.lesson_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{(item.lessons as any)?.title_ja || item.lesson_id}</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant={item.status === 'completed' ? 'default' : 'outline'}>
                      {item.status === 'completed' ? '完了' : '学習中'}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {new Date(item.last_accessed_at).toLocaleDateString('ja-JP')}
                    </span>
                  </div>
                </div>
                {item.quiz_score && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600">
                      {item.quiz_score}点
                    </div>
                    <div className="text-xs text-gray-600">クイズスコア</div>
                  </div>
                )}
              </div>
            ))}
            
            {!progress || progress.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                まだ学習履歴がありません
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


