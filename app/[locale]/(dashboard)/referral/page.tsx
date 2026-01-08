'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Copy, Check, Users, Gift } from 'lucide-react'

export default function ReferralPage() {
  const [profile, setProfile] = useState<any>(null)
  const [referrals, setReferrals] = useState<any[]>([])
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    const { data: referralsData } = await supabase
      .from('referrals')
      .select(`
        *,
        referred:profiles!referrals_referred_id_fkey(full_name, created_at)
      `)
      .eq('referrer_id', user.id)

    setProfile(profileData)
    setReferrals(referralsData || [])
    setLoading(false)
  }

  const copyReferralCode = () => {
    if (profile?.referral_code) {
      navigator.clipboard.writeText(profile.referral_code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/signup?ref=${profile?.referral_code}`

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          紹介プログラム
        </h1>
        <p className="text-gray-600">
          友達を招待して、お互いに7日間の広告なし体験を獲得しましょう！
        </p>
      </div>

      {/* Referral Code Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gift className="h-6 w-6 text-indigo-600" />
            <span>あなたの紹介コード</span>
          </CardTitle>
          <CardDescription>
            このコードを友達に共有してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Input
              value={profile?.referral_code || ''}
              readOnly
              className="text-2xl font-mono text-center"
            />
            <Button onClick={copyReferralCode} size="lg">
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </Button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">共有リンク:</p>
            <div className="flex items-center space-x-2">
              <Input value={shareUrl} readOnly className="text-sm" />
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl)
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral Stats */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-indigo-600" />
            <span>紹介実績</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600">
                {referrals.length}
              </div>
              <p className="text-sm text-gray-600 mt-1">総紹介数</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">
                {referrals.length * 7}
              </div>
              <p className="text-sm text-gray-600 mt-1">獲得した広告なし日数</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600">
                {profile?.ad_free_until && new Date(profile.ad_free_until) > new Date()
                  ? Math.ceil((new Date(profile.ad_free_until).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                  : 0}
              </div>
              <p className="text-sm text-gray-600 mt-1">残り日数</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral List */}
      {referrals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>紹介履歴</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {referral.referred?.full_name || '匿名ユーザー'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(referral.created_at).toLocaleDateString('ja-JP')}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    +7日間
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


