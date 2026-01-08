import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getTierName, getTierColor, getNextTierRequirements } from '@/lib/utils/tierCheck'
import Link from 'next/link'
import { User, MapPin, Briefcase, Share2, Award } from 'lucide-react'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/login')

  const currentTier = (profile.current_tier || 1) as 1 | 2 | 3
  const nextRequirements = getNextTierRequirements(currentTier)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-20 w-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {profile.full_name?.charAt(0) || user.email?.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {profile.full_name}
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge className={`${getTierColor(currentTier)} text-lg px-4 py-2`}>
            {getTierName(currentTier, 'ja')}
          </Badge>
          {currentTier < 3 && (
            <Button asChild>
              <Link href="/profile/tier-upgrade">
                Tier {currentTier + 1}にアップグレード
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>基本情報</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="text-sm text-gray-600">国籍</span>
              <p className="font-medium">{profile.nationality || '未設定'}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">居住地</span>
              <p className="font-medium">{profile.prefecture || '未設定'}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">現在の職種</span>
              <p className="font-medium">{profile.current_job || '未設定'}</p>
            </div>
          </CardContent>
        </Card>

        {profile.current_tier >= 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Share2 className="h-5 w-5" />
                <span>紹介コード</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-2xl font-mono font-bold text-indigo-600">
                  {profile.referral_code}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  友達を招待して双方に7日間の広告なしを獲得！
                </p>
              </div>
              <Button asChild className="w-full mt-4">
                <Link href="/referral">
                  詳細を見る
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Tier Upgrade Requirements */}
      {currentTier < 3 && nextRequirements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>次のTierの要件</CardTitle>
            <CardDescription>
              以下の情報を登録してTier {currentTier + 1}にアップグレードしましょう
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {nextRequirements.map((req, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-indigo-600" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="w-full mt-6">
              <Link href="/profile/tier-upgrade">
                アップグレードを開始
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Ad-Free Status */}
      {profile.ad_free_until && new Date(profile.ad_free_until) > new Date() && (
        <Card className="mt-6 bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-900">広告なし期間中</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-800">
              {new Date(profile.ad_free_until).toLocaleDateString('ja-JP')} まで広告なしで学習できます
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


