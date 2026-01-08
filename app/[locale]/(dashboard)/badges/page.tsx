import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Star, Target, Zap, Award, BookOpen } from 'lucide-react'
import { redirect } from 'next/navigation'

const BADGE_TYPES = {
  first_lesson: {
    icon: BookOpen,
    title: '初めての一歩',
    description: '最初のレッスンを完了',
    color: 'text-blue-600 bg-blue-100'
  },
  '10_lessons': {
    icon: Target,
    title: '継続は力なり',
    description: '10レッスンを完了',
    color: 'text-green-600 bg-green-100'
  },
  '50_lessons': {
    icon: Zap,
    title: '学習マスター',
    description: '50レッスンを完了',
    color: 'text-purple-600 bg-purple-100'
  },
  drill_complete: {
    icon: Target,
    title: 'ドリルチャンピオン',
    description: 'ドリル練習で80%以上獲得',
    color: 'text-amber-600 bg-amber-100'
  },
  simulation_pass: {
    icon: Trophy,
    title: '模擬試験合格',
    description: 'CBTシミュレーションで合格',
    color: 'text-red-600 bg-red-100'
  },
  perfect_score: {
    icon: Star,
    title: 'パーフェクト',
    description: '試験で満点獲得',
    color: 'text-yellow-600 bg-yellow-100'
  },
  '7_day_streak': {
    icon: Zap,
    title: '7日連続',
    description: '7日連続で学習',
    color: 'text-indigo-600 bg-indigo-100'
  },
  referral_master: {
    icon: Award,
    title: '紹介マスター',
    description: '5人の友達を招待',
    color: 'text-pink-600 bg-pink-100'
  }
}

export default async function BadgesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('current_tier')
    .eq('id', user.id)
    .single()

  if (!profile || profile.current_tier < 2) {
    redirect('/profile/tier-upgrade')
  }

  const { data: badges } = await supabase
    .from('badges')
    .select('*')
    .eq('user_id', user.id)
    .order('earned_at', { ascending: false })

  const earnedBadges = new Set(badges?.map(b => b.badge_type) || [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          バッジコレクション
        </h1>
        <p className="text-gray-600">
          獲得: {badges?.length || 0} / {Object.keys(BADGE_TYPES).length}
        </p>
      </div>

      {/* Earned Badges */}
      {badges && badges.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            獲得済みバッジ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge) => {
              const badgeInfo = BADGE_TYPES[badge.badge_type as keyof typeof BADGE_TYPES]
              if (!badgeInfo) return null

              const Icon = badgeInfo.icon

              return (
                <Card key={badge.id} className="overflow-hidden">
                  <CardHeader className={`${badgeInfo.color}`}>
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-white rounded-full">
                        <Icon className="h-8 w-8" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{badgeInfo.title}</CardTitle>
                        <CardDescription className="text-xs">
                          {new Date(badge.earned_at).toLocaleDateString('ja-JP')}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-700">
                      {badgeInfo.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* All Badges */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          すべてのバッジ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(BADGE_TYPES).map(([type, badgeInfo]) => {
            const earned = earnedBadges.has(type)
            const Icon = badgeInfo.icon

            return (
              <Card 
                key={type} 
                className={`overflow-hidden ${earned ? '' : 'opacity-50 grayscale'}`}
              >
                <CardHeader className={badgeInfo.color}>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-white rounded-full">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {badgeInfo.title}
                      </CardTitle>
                      {!earned && (
                        <Badge variant="outline" className="mt-1">
                          未獲得
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-700">
                    {badgeInfo.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}


