import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, Lock } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface LearnPageProps {
  params: Promise<{ locale: string }>
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { locale } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect(`/${locale}/login`)

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // 業種データ
  const sectors = [
    { slug: 'agriculture', ja: '農業', id: 'Pertanian', icon: '🌾', color: 'green', active: true },
    { slug: 'livestock', ja: '畜産業', id: 'Peternakan', icon: '🐄', color: 'amber', active: true },
    { slug: 'fishery', ja: '漁業', id: 'Perikanan', icon: '🐟', color: 'blue', active: false },
  ]

  // 各業種のレッスン数を取得
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, category_id')

  const lessonCountBySector = lessons?.reduce((acc, lesson) => {
    const sectorId = lesson.category_id.split('-')[0]
    acc[sectorId] = (acc[sectorId] || 0) + 1
    return acc
  }, {} as Record<string, number>) || {}

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          学習コンテンツ
        </h1>
        <p className="text-gray-600">
          学習したい業種を選んでください
        </p>
      </div>

      {/* Sectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sectors.map((sector) => (
          <Link
            key={sector.slug}
            href={sector.active ? `/${locale}/sectors/${sector.slug}` : '#'}
            className={sector.active ? '' : 'pointer-events-none'}
          >
            <Card className={`cursor-pointer transition-all h-full ${
              sector.active 
                ? 'hover:shadow-lg hover:scale-[1.02] border-2 border-indigo-200' 
                : 'opacity-50'
            }`}>
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-5xl">{sector.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {sector.ja}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {sector.id}
                      </p>
                    </div>
                  </div>
                </div>
                {sector.active && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {lessonCountBySector[sector.slug] || 0} レッスン
                      </span>
                    </div>
                    <Button size="sm" className="bg-indigo-600">
                      学習開始
                    </Button>
                  </div>
                )}
                {!sector.active && (
                  <Badge variant="outline" className="mt-4">準備中</Badge>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}


