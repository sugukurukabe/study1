'use client'

import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Clock, BookOpen } from 'lucide-react'

interface ProgressTrackerProps {
  totalLessons: number
  completedLessons: number
  inProgressLessons: number
  totalMinutes?: number
  completedMinutes?: number
}

export default function ProgressTracker({
  totalLessons,
  completedLessons,
  inProgressLessons,
  totalMinutes = 0,
  completedMinutes = 0,
}: ProgressTrackerProps) {
  const completionRate = totalLessons > 0
    ? (completedLessons / totalLessons) * 100
    : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-indigo-600" />
          <span>学習進捗</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Overall Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">全体の進捗</span>
              <span className="text-gray-600">
                {completedLessons} / {totalLessons} レッスン
              </span>
            </div>
            <Progress value={completionRate} />
            <p className="text-sm text-gray-600 mt-1">
              {Math.round(completionRate)}% 完了
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {completedLessons}
              </div>
              <div className="text-xs text-gray-600">完了</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {inProgressLessons}
              </div>
              <div className="text-xs text-gray-600">学習中</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <BookOpen className="h-5 w-5 text-gray-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {totalLessons - completedLessons - inProgressLessons}
              </div>
              <div className="text-xs text-gray-600">未開始</div>
            </div>
          </div>

          {/* Time Stats */}
          {totalMinutes > 0 && (
            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">学習時間</span>
                <span className="font-medium">
                  {Math.round(completedMinutes)} / {Math.round(totalMinutes)} 分
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}


