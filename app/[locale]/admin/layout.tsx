import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, FileQuestion, Users, Settings } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 簡易的な管理者チェック（実際はis_adminカラムなどを使用）
  const { data: profile } = await supabase
    .from('profiles')
    .select('current_tier')
    .eq('id', user.id)
    .single()

  if (!profile || profile.current_tier < 3) {
    redirect('/home')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="text-2xl font-bold">
              Sugu-Study 管理画面
            </Link>
            <Button asChild variant="ghost" className="text-white">
              <Link href="/home">ユーザー画面へ</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Admin Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 py-4">
            <Link
              href="/admin"
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
            >
              <Settings className="h-5 w-5" />
              <span>ダッシュボード</span>
            </Link>
            <Link
              href="/admin/lessons"
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
            >
              <BookOpen className="h-5 w-5" />
              <span>レッスン管理</span>
            </Link>
            <Link
              href="/admin/questions"
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
            >
              <FileQuestion className="h-5 w-5" />
              <span>試験問題管理</span>
            </Link>
            <Link
              href="/admin/kyc"
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
            >
              <Users className="h-5 w-5" />
              <span>KYC審査</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}


