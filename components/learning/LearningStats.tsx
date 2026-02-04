'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Trophy, Target, Clock, TrendingUp, Flame } from 'lucide-react'

interface LearningStatsProps {
  totalLessons: number
  completedLessons: number
  inProgressLessons: number
  totalMinutes: number
  weeklyMinutes: number
  streak: number
  currentTier: number
  locale: string
}

export default function LearningStats({
  totalLessons,
  completedLessons,
  inProgressLessons,
  totalMinutes,
  weeklyMinutes,
  streak,
  currentTier,
  locale,
}: LearningStatsProps) {
  const completionRate = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <div className="space-y-6">
      {/* 学習統計サマリー */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span>学習統計</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* 完了率 */}
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {Math.round(completionRate)}%
              </div>
              <p className="text-xs text-gray-600 mt-1">完了率</p>
            </div>

            {/* 総学習時間 */}
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">
                {Math.round(totalMinutes / 60)}h
              </div>
              <p className="text-xs text-gray-600 mt-1">総学習時間</p>
            </div>

            {/* 今週の学習時間 */}
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {Math.round(weeklyMinutes)}分
              </div>
              <p className="text-xs text-gray-600 mt-1">今週</p>
            </div>

            {/* 連続学習日数 */}
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 flex items-center justify-center">
                <Flame className="h-6 w-6 mr-1" />
                {streak}
              </div>
              <p className="text-xs text-gray-600 mt-1">連続日数</p>
            </div>
          </div>

          {/* 進捗バー */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                レッスン進捗
              </span>
              <span className="text-sm text-gray-600">
                {completedLessons} / {totalLessons}
              </span>
            </div>
            <Progress value={completionRate} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* 今週の目標 */}
      <Card className="border-2 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Target className="h-5 w-5 text-green-600" />
            <span>今週の目標</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 週間学習時間目標 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">週間学習時間</span>
                <span className="text-sm font-bold text-green-700">
                  {Math.round(weeklyMinutes)} / 210分
                </span>
              </div>
              <Progress value={(weeklyMinutes / 210) * 100} className="h-2" />
              <p className="text-xs text-gray-600 mt-1">
                1日30分 × 7日 = 210分
              </p>
            </div>

            {/* レッスン完了目標 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">進行中のレッスン</span>
                <Badge variant="outline" className="text-blue-600">
                  {inProgressLessons}件
                </Badge>
              </div>
              <p className="text-xs text-gray-600">
                完了してバッジを獲得しましょう！
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* モチベーションメッセージ */}
      {streak >= 7 && (
        <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-orange-600" />
              <div>
                <p className="font-bold text-orange-900">
                  {streak}日連続学習達成！
                </p>
                <p className="text-sm text-orange-700">
                  素晴らしい継続力です！この調子で頑張りましょう！
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
