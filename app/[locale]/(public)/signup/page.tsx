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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    
    // Sign up
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })

    if (authError) {
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
        setError(profileError.message)
        setLoading(false)
        return
      }

      router.push('/home')
      router.refresh()
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
            <a href="/login" className="text-indigo-600 hover:underline">
              {t('auth.login')}
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


