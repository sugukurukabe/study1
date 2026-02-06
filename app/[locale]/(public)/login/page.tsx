'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const t = useTranslations()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // URLからリダイレクト先を取得
  const getRedirectPath = () => {
    if (typeof window === 'undefined') return null
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get('redirect')
  }

  // Supabase設定チェック
  const hasSupabaseConfig = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                           process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!hasSupabaseConfig) {
      setError('Supabaseの設定が必要です。DEPLOYMENT.mdを参照してください。')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Login error:', error)
        setError(error.message)
        setLoading(false)
      } else {
        const locale = window.location.pathname.split('/')[1] || 'ja'
        const redirectTo = getRedirectPath()
        
        if (redirectTo) {
          // リダイレクト先が指定されている場合はそこに遷移
          router.push(redirectTo)
        } else {
          // デフォルトはホームページ
          router.push(`/${locale}/home`)
        }
        router.refresh()
      }
    } catch (err) {
      setError('ログインに失敗しました')
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    if (!hasSupabaseConfig) {
      setError('Supabaseの設定が必要です')
      return
    }

    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
    } catch (err) {
      setError('Google認証に失敗しました')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {!hasSupabaseConfig && (
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-amber-900">
                <AlertCircle className="h-5 w-5" />
                <span>セットアップが必要です</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-amber-800 space-y-2">
              <p><strong>このアプリケーションは正常にビルドされました！</strong></p>
              <p>完全に機能させるには、以下の設定が必要です：</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Supabaseプロジェクトを作成</li>
                <li>環境変数を設定（.env.local）</li>
                <li>データベースマイグレーションを実行</li>
              </ol>
              <p className="mt-3">
                詳細は <code className="bg-amber-100 px-2 py-1 rounded">DEPLOYMENT.md</code> をご覧ください。
              </p>
            </CardContent>
          </Card>
        )}
        
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center">
              Sugu-Study
            </CardTitle>
            <CardDescription className="text-center">
              {t('auth.login')}
            </CardDescription>
          </CardHeader>
          <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-sm text-red-500">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t('common.loading') : t('auth.login')}
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </Button>

          <div className="mt-4 text-center text-sm">
            <Link href={`/${locale}/signup`} className="text-indigo-600 hover:underline">
              {t('auth.signup')}
            </Link>
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
  )
}

