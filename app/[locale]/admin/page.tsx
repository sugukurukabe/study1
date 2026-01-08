import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, FileQuestion, Users, CheckCircle } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Get stats
  const { count: lessonsCount } = await supabase
    .from('lessons')
    .select('*', { count: 'exact', head: true })

  const { count: questionsCount } = await supabase
    .from('exam_questions')
    .select('*', { count: 'exact', head: true })

  const { count: usersCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const { count: pendingKYC } = await supabase
    .from('kyc_documents')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">管理ダッシュボード</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総レッスン数</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lessonsCount || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">試験問題数</CardTitle>
            <FileQuestion className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{questionsCount || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">登録ユーザー</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersCount || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">KYC審査待ち</CardTitle>
            <CheckCircle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{pendingKYC || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>クイックアクション</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <a href="/admin/lessons/new" className="block p-4 border rounded-lg hover:bg-gray-50">
              <h3 className="font-medium">新しいレッスンを追加</h3>
              <p className="text-sm text-gray-600">動画、音声、テキストコンテンツを追加</p>
            </a>
            <a href="/admin/questions/new" className="block p-4 border rounded-lg hover:bg-gray-50">
              <h3 className="font-medium">試験問題を追加</h3>
              <p className="text-sm text-gray-600">新しい試験問題を作成</p>
            </a>
            <a href="/admin/kyc" className="block p-4 border rounded-lg hover:bg-gray-50">
              <h3 className="font-medium">KYC審査</h3>
              <p className="text-sm text-gray-600">未審査の申請を確認（{pendingKYC || 0}件）</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


