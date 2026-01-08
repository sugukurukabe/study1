'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Trophy, TrendingUp, RefreshCw, Home } from 'lucide-react'

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const correct = parseInt(searchParams.get('correct') || '0')
  const total = parseInt(searchParams.get('total') || '0')
  const isSimulation = searchParams.get('simulation') === 'true'
  
  const percentage = total > 0 ? (correct / total) * 100 : 0
  const passed = percentage >= 70 // 70% to pass

  const getMessage = () => {
    if (passed) {
      if (percentage >= 90) return { title: '素晴らしい！', message: '非常に高い理解度です。この調子で続けましょう！', emoji: '🎉' }
      if (percentage >= 80) return { title: '合格！', message: '良い成績です。更なる向上を目指しましょう。', emoji: '🎊' }
      return { title: '合格', message: '合格ラインに達しました。復習を続けて知識を定着させましょう。', emoji: '✅' }
    }
    if (percentage >= 60) return { title: 'もう少し！', message: 'あと少しで合格です。間違えた問題を復習しましょう。', emoji: '💪' }
    return { title: '要復習', message: 'もう一度基礎から学習することをお勧めします。', emoji: '📚' }
  }

  const result = getMessage()

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Result Card */}
      <Card className="mb-6">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">{result.emoji}</div>
          <CardTitle className="text-3xl mb-2">{result.title}</CardTitle>
          <p className="text-gray-600">{result.message}</p>
        </CardHeader>
        <CardContent>
          {/* Score */}
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-indigo-600 mb-2">
              {Math.round(percentage)}%
            </div>
            <p className="text-gray-600">
              {correct} / {total} 問正解
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>正解率</span>
              <span className={passed ? 'text-green-600' : 'text-red-600'}>
                {passed ? '合格' : '不合格'}（合格ライン: 70%）
              </span>
            </div>
            <Progress value={percentage} className="h-3" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {correct}
              </div>
              <div className="text-sm text-gray-600">正解</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600">
                {total - correct}
              </div>
              <div className="text-sm text-gray-600">不正解</div>
            </div>
          </div>

          {/* Badge Notification */}
          {passed && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
              <div className="flex items-center space-x-3">
                <Trophy className="h-6 w-6 text-amber-600" />
                <div>
                  <p className="font-medium text-amber-900">
                    おめでとうございます！
                  </p>
                  <p className="text-sm text-amber-800">
                    {isSimulation ? '模擬試験合格バッジを獲得しました' : 'ドリル練習完了バッジを獲得しました'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={() => router.push(isSimulation ? '/exam/simulation' : '/exam/drill')}
              className="w-full"
              size="lg"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              もう一度挑戦
            </Button>
            
            <Button
              onClick={() => router.push('/learn')}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              学習に戻る
            </Button>
            
            <Button
              onClick={() => router.push('/home')}
              variant="ghost"
              className="w-full"
            >
              <Home className="h-4 w-4 mr-2" />
              ホームに戻る
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {!passed && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">学習のヒント</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>動画レッスンを繰り返し視聴しましょう</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>音声コンテンツを通勤時間に聞きましょう</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>間違えた問題の解説を しっかり読みましょう</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>毎日少しずつでも継続して学習しましょう</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


