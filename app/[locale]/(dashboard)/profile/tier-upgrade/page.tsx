'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, Circle } from 'lucide-react'

const prefectures = [
  '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
  '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
  '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
  '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
  '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
  '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
  '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
]

const jobs = [
  '建設', '製造', '農業', '介護', '宿泊', 'サービス',
  '飲食', '自動車整備', '造船', '航空', 'ビルクリーニング', 'その他'
]

export default function TierUpgradePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [currentTier, setCurrentTier] = useState(1)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    prefecture: '',
    currentJob: '',
    facebookUrl: '',
    zaloId: '',
  })

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profile) {
      setCurrentTier(profile.current_tier)
      setFormData({
        prefecture: profile.prefecture || '',
        currentJob: profile.current_job || '',
        facebookUrl: profile.sns_info?.facebook || '',
        zaloId: profile.sns_info?.zalo || '',
      })
      
      // 既に入力済みの場合は次のステップへ
      if (profile.current_tier === 1) {
        if (profile.prefecture && profile.current_job) {
          setStep(3) // SNS入力へ
        } else if (profile.prefecture) {
          setStep(2) // 職種入力へ
        }
      }
    }
    
    setLoading(false)
  }

  const handleNext = async () => {
    if (currentTier === 1) {
      if (step === 1) {
        if (!formData.prefecture) return
        setStep(2)
      } else if (step === 2) {
        if (!formData.currentJob) return
        setStep(3)
      } else if (step === 3) {
        await saveAndUpgrade()
      }
    } else if (currentTier === 2) {
      router.push('/profile/kyc')
    }
  }

  const saveAndUpgrade = async () => {
    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return

    const snsInfo: Record<string, string> = {}
    if (formData.facebookUrl) snsInfo.facebook = formData.facebookUrl
    if (formData.zaloId) snsInfo.zalo = formData.zaloId

    const { error } = await supabase
      .from('profiles')
      .update({
        prefecture: formData.prefecture,
        current_job: formData.currentJob,
        sns_info: snsInfo,
        current_tier: 2,
      })
      .eq('id', user.id)

    if (!error) {
      router.push('/profile')
      router.refresh()
    }
    
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">読み込み中...</div>
      </div>
    )
  }

  if (currentTier === 1) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Tier 2へアップグレード</CardTitle>
            <CardDescription>
              あなたの情報を入力して、より多くの機能を解放しましょう
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Progress */}
            <div className="mb-8">
              <Progress value={(step / 3) * 100} className="mb-4" />
              <div className="flex justify-between text-sm">
                <div className="flex items-center space-x-2">
                  {step >= 1 ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                  <span>居住地</span>
                </div>
                <div className="flex items-center space-x-2">
                  {step >= 2 ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                  <span>職種</span>
                </div>
                <div className="flex items-center space-x-2">
                  {step >= 3 ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                  <span>SNS (任意)</span>
                </div>
              </div>
            </div>

            {/* Step 1: Prefecture */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="prefecture">都道府県 *</Label>
                  <Select
                    value={formData.prefecture}
                    onValueChange={(value) => setFormData({ ...formData, prefecture: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {prefectures.map((pref) => (
                        <SelectItem key={pref} value={pref}>
                          {pref}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleNext}
                  disabled={!formData.prefecture}
                  className="w-full"
                >
                  次へ
                </Button>
              </div>
            )}

            {/* Step 2: Job */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentJob">現在の職種 *</Label>
                  <Select
                    value={formData.currentJob}
                    onValueChange={(value) => setFormData({ ...formData, currentJob: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobs.map((job) => (
                        <SelectItem key={job} value={job}>
                          {job}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    戻る
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!formData.currentJob}
                    className="flex-1"
                  >
                    次へ
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: SNS (Optional) */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="facebookUrl">Facebook URL (任意)</Label>
                  <Input
                    id="facebookUrl"
                    type="url"
                    placeholder="https://facebook.com/..."
                    value={formData.facebookUrl}
                    onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="zaloId">Zalo ID (任意)</Label>
                  <Input
                    id="zaloId"
                    type="text"
                    placeholder="Zalo ID"
                    value={formData.zaloId}
                    onChange={(e) => setFormData({ ...formData, zaloId: e.target.value })}
                  />
                </div>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1"
                  >
                    戻る
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? '保存中...' : '完了'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentTier === 2) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Tier 3へアップグレード</CardTitle>
            <CardDescription>
              在留カードを提出して本人確認を完了し、すべての機能を解放しましょう
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-700">
              Tier 3では以下の機能が利用できます：
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              <li>本番CBTシミュレーション</li>
              <li>修了証発行</li>
              <li>企業からのスカウト機能</li>
            </ul>
            <Button asChild className="w-full">
              <a href="/profile/kyc">
                本人確認を開始
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>最高Tier達成！</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            おめでとうございます！すべての機能が利用可能です。
          </p>
          <Button asChild className="w-full mt-4">
            <a href="/profile">
              プロフィールに戻る
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}


