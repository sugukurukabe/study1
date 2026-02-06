'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const nationalities = [
  { code: 'VN', name: 'Vietnam', nameJa: 'ベトナム' },
  { code: 'ID', name: 'Indonesia', nameJa: 'インドネシア' },
  { code: 'PH', name: 'Philippines', nameJa: 'フィリピン' },
  { code: 'TH', name: 'Thailand', nameJa: 'タイ' },
  { code: 'MM', name: 'Myanmar', nameJa: 'ミャンマー' },
  { code: 'NP', name: 'Nepal', nameJa: 'ネパール' },
  { code: 'CN', name: 'China', nameJa: '中国' },
  { code: 'OTHER', name: 'Other', nameJa: 'その他' },
]

export default function SignupPage() {
  const t = useTranslations()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    nationality: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // URLからリダイレクト先を取得
  const getRedirectPath = () => {
    if (typeof window === 'undefined') return null
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get('redirect')
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()
      
      // Sign up
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: formData.fullName,
            nationality: formData.nationality,
          }
        }
      })

      if (authError) {
        console.error('Signup error:', authError)
        setError(authError.message)
        setLoading(false)
        return
      }

      if (authData.user) {
        // Create profile
        const { error: profileError } = await supabase.from('profiles').insert({
          id: authData.user.id,
          email: formData.email,
          full_name: formData.fullName,
          nationality: formData.nationality,
          current_tier: 1,
        })

        if (profileError) {
          console.error('Profile creation error:', profileError)
          // プロファイル作成エラーは無視（トリガーで作成される可能性があるため）
        }

        // Check if email confirmation is required
        if (authData.session) {
          // Logged in immediately
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
        } else {
          // Email confirmation required
          setError('確認メールを送信しました。メールを確認してアカウントを有効化してください。')
          setLoading(false)
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      setError('登録に失敗しました。もう一度お試しください。')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">
            Sugu-Study
          </CardTitle>
          <CardDescription className="text-center">
            {t('auth.signup')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">{t('auth.fullName')}</Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">{t('auth.nationality')}</Label>
              <Select
                value={formData.nationality}
                onValueChange={(value) => setFormData({ ...formData, nationality: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  {nationalities.map((nat) => (
                    <SelectItem key={nat.code} value={nat.code}>
                      {nat.nameJa} ({nat.name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
              />
            </div>
            {error && (
              <div className="text-sm text-red-500">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t('common.loading') : t('auth.signup')}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <Link href={`/${locale}/login`} className="text-indigo-600 hover:underline">
              {t('auth.login')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


