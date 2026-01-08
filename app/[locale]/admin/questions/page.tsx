import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit } from 'lucide-react'
import Link from 'next/link'

export default async function QuestionsManagementPage() {
  const supabase = await createClient()

  const { data: questions } = await supabase
    .from('exam_questions')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">試験問題管理</h1>
        <Button asChild>
          <Link href="/admin/questions/new">
            <Plus className="h-4 w-4 mr-2" />
            新しい問題を追加
          </Link>
        </Button>
      </div>

      {questions && questions.length > 0 ? (
        <div className="space-y-4">
          {questions.map((question) => (
            <Card key={question.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">
                      {question.question_ja}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {question.category && (
                        <Badge variant="outline">{question.category}</Badge>
                      )}
                      {question.difficulty && (
                        <Badge
                          className={
                            question.difficulty === 'easy'
                              ? 'bg-green-100 text-green-800'
                              : question.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }
                        >
                          {question.difficulty}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/questions/${question.id}/edit`}>
                      <Edit className="h-4 w-4 mr-1" />
                      編集
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  <p>正解: {question.correct_answer}</p>
                  <p>ID: {question.id}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            <p className="mb-4">試験問題がまだ登録されていません</p>
            <Button asChild>
              <Link href="/admin/questions/new">
                最初の問題を追加
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


