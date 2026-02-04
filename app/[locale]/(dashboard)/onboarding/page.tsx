'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Target, Clock, Briefcase } from 'lucide-react'

export default function OnboardingPage() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string || 'ja'

  const [step, setStep] = useState(1)
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  const [learningGoal, setLearningGoal] = useState<string>('')
  const [dailyGoal, setDailyGoal] = useState<number>(30)
  const [loading, setLoading] = useState(false)

  const sectors = [
    { id: 'agriculture', ja: '農業', icon: '🌾', description: '農作物の栽培・管理' },
    { id: 'livestock', ja: '畜産業', icon: '🐄', description: '家畜の飼育・管理' },
    { id: 'fishery', ja: '漁業', icon: '🐟', description: '水産物の養殖・漁獲' },
  ]

  const goals = [
    { id: 'exam_preparation', ja: '特定技能2号試験の合格', icon: <Target className="h-6 w-6" />, description: '試験に向けて集中的に学習' },
    { id: 'skill_improvement', ja: 'スキルアップ', icon: <Briefcase className="h-6 w-6" />, description: '仕事で使える知識を習得' },
    { id: 'career_change', ja: 'キャリアチェンジ', icon: <CheckCircle2 className="h-6 w-6" />, description: '新しい分野への挑戦' },
  ]

  const dailyGoals = [
    { minutes: 15, label: '15分/日', description: '忙しい方向け' },
    { minutes: 30, label: '30分/日', description: 'おすすめ' },
    { minutes: 60, label: '60分/日', description: '集中学習' },
    { minutes: 120, label: '2時間/日', description: '短期集中' },
  ]

  const toggleSector = (sectorId: string) => {
    setSelectedSectors(prev =>
      prev.includes(sectorId)
        ? prev.filter(id => id !== sectorId)
        : [...prev, sectorId]
    )
  }

  const handleComplete = async () => {
    if (selectedSectors.length === 0 || !learningGoal) {
      alert('学習したい業種と目標を選択してください')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push(`/${locale}/login`)
      return
    }

    // Save preferences
    const { error } = await supabase
      .from('profiles')
      .update({
        preferred_sectors: selectedSectors,
        learning_goal: learningGoal,
        daily_goal_minutes: dailyGoal,
        onboarding_completed: true,
      })
      .eq('id', user.id)

    if (error) {
      console.error('Error saving preferences:', error)
      alert('設定の保存に失敗しました')
      setLoading(false)
      return
    }

    // Redirect to home
    router.push(`/${locale}/home`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 w-20 rounded-full transition-all ${
                  s <= step ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">
            ステップ {step} / 3
          </p>
        </div>

        {/* Step 1: Select Sectors */}
        {step === 1 && (
          <Card className="border-2 border-indigo-200">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2">
                学習したい業種を選んでください
              </CardTitle>
              <CardDescription className="text-base">
                複数選択できます。後から変更も可能です。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {sectors.map((sector) => (
                  <Card
                    key={sector.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedSectors.includes(sector.id)
                        ? 'border-4 border-indigo-600 bg-indigo-50'
                        : 'border-2 hover:border-indigo-300'
                    }`}
                    onClick={() => toggleSector(sector.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-6xl mb-3">{sector.icon}</div>
                      <h3 className="font-bold text-xl mb-2">{sector.ja}</h3>
                      <p className="text-sm text-gray-600">{sector.description}</p>
                      {selectedSectors.includes(sector.id) && (
                        <CheckCircle2 className="h-8 w-8 text-indigo-600 mx-auto mt-3" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={selectedSectors.length === 0}
                className="w-full h-12 text-lg"
                size="lg"
              >
                次へ
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Select Goal */}
        {step === 2 && (
          <Card className="border-2 border-indigo-200">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2">
                学習の目標を教えてください
              </CardTitle>
              <CardDescription className="text-base">
                あなたに合った学習プランを提案します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                {goals.map((goal) => (
                  <Card
                    key={goal.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      learningGoal === goal.id
                        ? 'border-4 border-indigo-600 bg-indigo-50'
                        : 'border-2 hover:border-indigo-300'
                    }`}
                    onClick={() => setLearningGoal(goal.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="text-indigo-600">{goal.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{goal.ja}</h3>
                          <p className="text-sm text-gray-600">{goal.description}</p>
                        </div>
                        {learningGoal === goal.id && (
                          <CheckCircle2 className="h-8 w-8 text-indigo-600" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex space-x-4">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="w-full h-12 text-lg"
                  size="lg"
                >
                  戻る
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!learningGoal}
                  className="w-full h-12 text-lg"
                  size="lg"
                >
                  次へ
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Daily Goal */}
        {step === 3 && (
          <Card className="border-2 border-indigo-200">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2">
                1日の学習目標を設定
              </CardTitle>
              <CardDescription className="text-base">
                無理のない目標から始めましょう
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {dailyGoals.map((goal) => (
                  <Card
                    key={goal.minutes}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      dailyGoal === goal.minutes
                        ? 'border-4 border-indigo-600 bg-indigo-50'
                        : 'border-2 hover:border-indigo-300'
                    }`}
                    onClick={() => setDailyGoal(goal.minutes)}
                  >
                    <CardContent className="p-6 text-center">
                      <Clock className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                      <h3 className="font-bold text-lg mb-1">{goal.label}</h3>
                      <p className="text-xs text-gray-600">{goal.description}</p>
                      {dailyGoal === goal.minutes && (
                        <CheckCircle2 className="h-6 w-6 text-indigo-600 mx-auto mt-2" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Summary */}
              <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 mb-6">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-center">あなたの学習プラン</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">学習業種:</span>
                      <div className="flex gap-2">
                        {selectedSectors.map(id => {
                          const sector = sectors.find(s => s.id === id)
                          return (
                            <Badge key={id} className="text-base px-3 py-1">
                              {sector?.icon} {sector?.ja}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">目標:</span>
                      <Badge className="text-base px-3 py-1">
                        {goals.find(g => g.id === learningGoal)?.ja}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">1日の学習時間:</span>
                      <Badge className="text-base px-3 py-1">
                        {dailyGoals.find(g => g.minutes === dailyGoal)?.label}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="w-full h-12 text-lg"
                  size="lg"
                >
                  戻る
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={loading}
                  className="w-full h-12 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  size="lg"
                >
                  {loading ? '保存中...' : '学習を始める'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
