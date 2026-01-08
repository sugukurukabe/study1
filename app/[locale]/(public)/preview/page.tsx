import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Video, Headphones, Lock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// サンプルレッスンデータ
const sampleLessons = [
  {
    id: 'sample-1',
    title: '特定技能制度とは？',
    description: '特定技能制度の基礎知識を学びます。制度の概要、Tier 1とTier 2の違い、取得のメリットについて解説します。',
    duration: '15分',
    tier: 1,
    hasVideo: true,
    hasAudio: true,
    category: '基礎知識',
  },
  {
    id: 'sample-2',
    title: '日本の労働法の基礎',
    description: '日本で働く上で知っておくべき労働法の基礎を学びます。労働時間、休暇、給与に関する基本的なルールを解説します。',
    duration: '20分',
    tier: 1,
    hasVideo: true,
    hasAudio: true,
    category: '労働法',
  },
  {
    id: 'sample-3',
    title: '職場でのコミュニケーション',
    description: '日本の職場で円滑にコミュニケーションを取るためのポイントを学びます。報告・連絡・相談の基本について解説します。',
    duration: '18分',
    tier: 1,
    hasVideo: true,
    hasAudio: true,
    category: 'ビジネスマナー',
  },
  {
    id: 'advanced-1',
    title: '建設業の専門知識',
    description: '建設業界で必要な専門知識を学びます。安全管理、品質管理、工程管理について詳しく解説します。',
    duration: '30分',
    tier: 2,
    hasVideo: true,
    hasAudio: true,
    category: '専門知識',
  },
  {
    id: 'simulation-1',
    title: 'CBT模擬試験',
    description: '本番と同じ形式の模擬試験を体験できます。時間制限付きで、実際の試験環境を再現しています。',
    duration: '60分',
    tier: 3,
    hasVideo: false,
    hasAudio: false,
    category: '試験対策',
  },
]

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            Sugu-Study
          </Link>
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost">
              <Link href="/login">ログイン</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">無料登録</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Intro Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">学習コンテンツプレビュー</h1>
          <p className="text-xl text-gray-600 mb-6">
            Sugu-Studyでどのようなコンテンツが学べるのか、実際に確認してみましょう
          </p>
          <Card className="max-w-2xl mx-auto bg-indigo-50 border-indigo-200">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-700">
                💡 <strong>無料で始められます！</strong><br />
                メールアドレスだけで登録すれば、すぐに学習を開始できます。
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Free Content Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">無料コンテンツ</h2>
              <p className="text-gray-600">登録後すぐに学習できます</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Tier 1で利用可能</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleLessons.filter(lesson => lesson.tier === 1).map((lesson) => (
              <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline">{lesson.category}</Badge>
                    <span className="text-sm text-gray-500">{lesson.duration}</span>
                  </div>
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    {lesson.hasVideo && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Video className="h-4 w-4 mr-1" />
                        動画
                      </div>
                    )}
                    {lesson.hasAudio && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Headphones className="h-4 w-4 mr-1" />
                        音声
                      </div>
                    )}
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/signup">
                      登録して学習開始
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Premium Content Preview */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">プレミアムコンテンツ</h2>
              <p className="text-gray-600">より詳しい情報を登録して解放</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Tier 2で利用可能</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleLessons.filter(lesson => lesson.tier === 2).map((lesson) => (
              <Card key={lesson.id} className="relative opacity-90">
                <div className="absolute top-4 right-4 z-10">
                  <Lock className="h-6 w-6 text-gray-400" />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline">{lesson.category}</Badge>
                    <span className="text-sm text-gray-500">{lesson.duration}</span>
                  </div>
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>Tier 2で解放：</strong> 居住地と職種を登録すると利用できます
                    </p>
                  </div>
                  <Button variant="outline" className="w-full" disabled>
                    <Lock className="h-4 w-4 mr-2" />
                    Tier 2が必要
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Advanced Content Preview */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">上級コンテンツ</h2>
              <p className="text-gray-600">本人確認完了で全機能を利用</p>
            </div>
            <Badge className="bg-amber-100 text-amber-800">Tier 3で利用可能</Badge>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {sampleLessons.filter(lesson => lesson.tier === 3).map((lesson) => (
              <Card key={lesson.id} className="relative opacity-90">
                <div className="absolute top-4 right-4 z-10">
                  <Lock className="h-6 w-6 text-gray-400" />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline">{lesson.category}</Badge>
                    <span className="text-sm text-gray-500">{lesson.duration}</span>
                  </div>
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-amber-50 border border-amber-200 rounded p-3 mb-4">
                    <p className="text-sm text-amber-800">
                      <strong>Tier 3で解放：</strong> 在留カードで本人確認を完了すると利用できます
                    </p>
                  </div>
                  <Button variant="outline" className="w-full" disabled>
                    <Lock className="h-4 w-4 mr-2" />
                    Tier 3が必要
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-12 text-white text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">準備はできましたか？</h2>
          <p className="text-xl mb-8 text-indigo-100">
            今すぐ無料で登録して、学習を始めましょう
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              <Link href="/signup">
                無料で始める
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-indigo-600">
              <Link href="/login">
                ログイン
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}


