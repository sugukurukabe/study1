import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, Lock } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function LearnPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .order('order_index', { ascending: true })

  const { data: progress } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', user.id)

  const progressMap = new Map(progress?.map(p => [p.lesson_id, p]) || [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          学習コンテンツ
        </h1>
        <p className="text-gray-600">
          特定技能2号試験に必要な知識を学びましょう
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons?.map((lesson) => {
          const userProgress = progressMap.get(lesson.id)
          const hasAccess = (profile?.current_tier || 1) >= lesson.required_tier
          const isCompleted = userProgress?.status === 'completed'
          const isInProgress = userProgress?.status === 'in_progress'

          return (
            <Card
              key={lesson.id}
              className={`hover:shadow-lg transition-shadow ${
                !hasAccess ? 'opacity-60' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="line-clamp-2">
                      {lesson.title_ja}
                    </CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">
                      {lesson.description_ja}
                    </CardDescription>
                  </div>
                  {!hasAccess && (
                    <Lock className="h-5 w-5 text-gray-400 ml-2" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>
                      {lesson.duration_seconds
                        ? `${Math.floor(lesson.duration_seconds / 60)}分`
                        : '時間未設定'}
                    </span>
                  </div>
                  {isCompleted && (
                    <Badge className="bg-green-100 text-green-800">
                      完了
                    </Badge>
                  )}
                  {isInProgress && (
                    <Badge className="bg-blue-100 text-blue-800">
                      学習中
                    </Badge>
                  )}
                  {!hasAccess && (
                    <Badge variant="outline">
                      Tier {lesson.required_tier}
                    </Badge>
                  )}
                </div>

                {hasAccess ? (
                  <Button asChild className="w-full">
                    <Link href={`/learn/${lesson.id}`}>
                      {isInProgress ? '続きから' : isCompleted ? '復習する' : '開始'}
                    </Link>
                  </Button>
                ) : (
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/profile/tier-upgrade">
                      <Lock className="h-4 w-4 mr-2" />
                      アップグレード
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {(!lessons || lessons.length === 0) && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            レッスンがまだありません
          </h3>
          <p className="text-gray-600">
            近日中にコンテンツが追加されます
          </p>
        </div>
      )}
    </div>
  )
}


