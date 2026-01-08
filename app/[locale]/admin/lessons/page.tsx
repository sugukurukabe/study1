import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash } from 'lucide-react'
import Link from 'next/link'

export default async function LessonsManagementPage() {
  const supabase = await createClient()

  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .order('order_index', { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">レッスン管理</h1>
        <Button asChild>
          <Link href="/admin/lessons/new">
            <Plus className="h-4 w-4 mr-2" />
            新しいレッスンを追加
          </Link>
        </Button>
      </div>

      {lessons && lessons.length > 0 ? (
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <Card key={lesson.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{lesson.title_ja}</CardTitle>
                    <p className="text-sm text-gray-600 mt-2">
                      {lesson.description_ja}
                    </p>
                  </div>
                  <Badge>Tier {lesson.required_tier}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>ID: {lesson.id}</span>
                    <span>時間: {lesson.duration_seconds ? `${Math.floor(lesson.duration_seconds / 60)}分` : '未設定'}</span>
                    <span>順序: {lesson.order_index || '-'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/lessons/${lesson.id}/edit`}>
                        <Edit className="h-4 w-4 mr-1" />
                        編集
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="mb-4">レッスンがまだ登録されていません</p>
            <Button asChild>
              <Link href="/admin/lessons/new">
                最初のレッスンを追加
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


