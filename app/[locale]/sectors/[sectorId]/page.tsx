import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Video, Headphones, ChevronRight, Play, Info, ClipboardList } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// 業種データ（後でSupabaseから取得に変更予定）
const sectorsData: Record<string, {
    name: { ja: string; vi: string; id: string; en: string }
    description: { ja: string; vi: string; id: string; en: string }
    introVideos: {
        overview: {
            title: { ja: string; vi: string; id: string; en: string }
            description: { ja: string; vi: string; id: string; en: string }
            duration: number
            videoId?: string
        }
        flow: {
            title: { ja: string; vi: string; id: string; en: string }
            description: { ja: string; vi: string; id: string; en: string }
            duration: number
            videoId?: string
        }
    }
    color: string
    categories: Array<{
        id: string
        name: { ja: string; vi: string; id: string; en: string }
        description: { ja: string; vi: string; id: string; en: string }
        lessonCount: number
        quizCount: number
    }>
}> = {
    agriculture: {
        name: { ja: '農業', vi: 'Nông nghiệp', id: 'Pertanian', en: 'Agriculture' },
        description: {
            ja: '特定技能2号 農業分野の試験対策',
            vi: 'Ôn thi kỹ năng đặc định số 2 ngành Nông nghiệp',
            id: 'Persiapan ujian keterampilan khusus tingkat 2 bidang Pertanian',
            en: 'Preparation for Specified Skilled Worker Type 2 Agriculture Exam'
        },
        introVideos: {
            overview: {
                title: { ja: '試験の概要', vi: 'Tổng quan kỳ thi', id: 'Gambaran Ujian', en: 'Exam Overview' },
                description: {
                    ja: '農業分野の特定技能2号試験について、試験内容・合格基準・試験時間を詳しく解説します。',
                    vi: 'Giải thích chi tiết về kỳ thi kỹ năng đặc định số 2 ngành Nông nghiệp.',
                    id: 'Penjelasan detail tentang ujian keterampilan khusus tingkat 2 bidang Pertanian.',
                    en: 'Detailed explanation of the Specified Skilled Worker Type 2 exam in Agriculture.'
                },
                duration: 600, // 10 minutes
            },
            flow: {
                title: { ja: '受験の流れ', vi: 'Quy trình thi', id: 'Proses Ujian', en: 'Exam Process' },
                description: {
                    ja: '申し込みから合格証発行まで、受験の流れを5つのステップで解説します。',
                    vi: 'Giải thích quy trình thi từ đăng ký đến cấp chứng chỉ.',
                    id: 'Penjelasan proses ujian dari pendaftaran hingga penerbitan sertifikat.',
                    en: 'Explanation of the exam process from application to certificate issuance.'
                },
                duration: 480, // 8 minutes
            }
        },
        color: 'green',
        categories: [
            { id: 'agri-general', name: { ja: '日本農業一般', vi: 'Nông nghiệp Nhật Bản tổng quát', id: 'Pertanian Jepang Umum', en: 'Japanese Agriculture General' }, description: { ja: '日本の農業の特徴、農業政策、食料自給率などを学びます', vi: 'Học về đặc điểm nông nghiệp Nhật Bản', id: 'Pelajari karakteristik pertanian Jepang', en: 'Learn about Japanese agriculture characteristics' }, lessonCount: 2, quizCount: 5 },
            { id: 'agri-crop-general', name: { ja: '耕種農業一般', vi: 'Nông nghiệp trồng trọt tổng quát', id: 'Pertanian Tanam Umum', en: 'Crop Agriculture General' }, description: { ja: '耕種農業の基礎知識、土壌管理、肥料、農薬について学びます', vi: 'Học kiến thức cơ bản về nông nghiệp trồng trọt', id: 'Pelajari pengetahuan dasar pertanian tanam', en: 'Learn basics of crop agriculture' }, lessonCount: 1, quizCount: 5 },
            { id: 'agri-safety', name: { ja: '安全衛生', vi: 'An toàn vệ sinh', id: 'Keselamatan dan Kesehatan', en: 'Safety and Health' }, description: { ja: '農作業における安全管理、衛生管理について学びます', vi: 'Học về quản lý an toàn trong công việc nông nghiệp', id: 'Pelajari tentang manajemen keselamatan dalam pekerjaan pertanian', en: 'Learn about safety management in agricultural work' }, lessonCount: 1, quizCount: 5 },
            { id: 'agri-rice', name: { ja: '稲作作業', vi: 'Trồng lúa', id: 'Pertanian Padi', en: 'Rice Cultivation' }, description: { ja: '水稲栽培の技術、田植え、収穫など稲作全般を学びます', vi: 'Học kỹ thuật trồng lúa nước', id: 'Pelajari teknik budidaya padi sawah', en: 'Learn rice cultivation techniques' }, lessonCount: 1, quizCount: 5 },
            { id: 'agri-field', name: { ja: '畑作・野菜作業', vi: 'Trồng rau màu', id: 'Pertanian Ladang dan Sayuran', en: 'Field and Vegetable Cultivation' }, description: { ja: '畑作物、野菜の栽培技術を学びます', vi: 'Học kỹ thuật trồng cây màu và rau', id: 'Pelajari teknik budidaya tanaman ladang', en: 'Learn field crop and vegetable cultivation' }, lessonCount: 0, quizCount: 5 },
            { id: 'agri-greenhouse', name: { ja: '施設園芸作業', vi: 'Làm vườn trong nhà kính', id: 'Hortikultura Fasilitas', en: 'Greenhouse Horticulture' }, description: { ja: 'ビニールハウスなど施設での園芸作業を学びます', vi: 'Học công việc làm vườn trong nhà kính', id: 'Pelajari pekerjaan hortikultura di rumah kaca', en: 'Learn greenhouse and facility horticulture' }, lessonCount: 0, quizCount: 5 },
            { id: 'agri-fruit', name: { ja: '果樹栽培作業', vi: 'Trồng cây ăn quả', id: 'Budidaya Buah', en: 'Fruit Tree Cultivation' }, description: { ja: '果樹園での栽培管理、収穫、剪定などを学びます', vi: 'Học về quản lý trồng trọt trong vườn cây ăn quả', id: 'Pelajari manajemen budidaya di kebun buah', en: 'Learn orchard management' }, lessonCount: 0, quizCount: 5 },
            { id: 'agri-practical', name: { ja: '実技問題特集', vi: 'Đặc biệt bài thi thực hành', id: 'Soal Praktik Khusus', en: 'Practical Exam Special' }, description: { ja: '実技試験で出題される内容を集中的に練習します', vi: 'Luyện tập tập trung nội dung trong kỳ thi thực hành', id: 'Latihan intensif konten ujian praktik', en: 'Intensive practice for practical exam' }, lessonCount: 0, quizCount: 5 },
            { id: 'agri-terms', name: { ja: '農作業の用語', vi: 'Thuật ngữ công việc nông nghiệp', id: 'Istilah Pertanian', en: 'Agricultural Terms' }, description: { ja: '農業で使われる専門用語を学びます', vi: 'Học thuật ngữ chuyên môn trong nông nghiệp', id: 'Pelajari istilah teknis dalam pertanian', en: 'Learn technical terms in agriculture' }, lessonCount: 0, quizCount: 5 },
        ]
    },
    livestock: {
        name: { ja: '畜産業', vi: 'Chăn nuôi', id: 'Peternakan', en: 'Livestock' },
        description: {
            ja: '特定技能2号 畜産分野の試験対策',
            vi: 'Ôn thi kỹ năng đặc định số 2 ngành Chăn nuôi',
            id: 'Persiapan ujian keterampilan khusus tingkat 2 bidang Peternakan',
            en: 'Preparation for Specified Skilled Worker Type 2 Livestock Exam'
        },
        introVideos: {
            overview: {
                title: { ja: '試験の概要', vi: 'Tổng quan kỳ thi', id: 'Gambaran Ujian', en: 'Exam Overview' },
                description: {
                    ja: '畜産分野の特定技能2号試験について解説します。',
                    vi: 'Giải thích về kỳ thi kỹ năng đặc định số 2 ngành Chăn nuôi.',
                    id: 'Penjelasan tentang ujian keterampilan khusus tingkat 2 bidang Peternakan.',
                    en: 'Explanation of the Specified Skilled Worker Type 2 exam in Livestock.'
                },
                duration: 600,
            },
            flow: {
                title: { ja: '受験の流れ', vi: 'Quy trình thi', id: 'Proses Ujian', en: 'Exam Process' },
                description: {
                    ja: '受験の流れを解説します。',
                    vi: 'Giải thích quy trình thi.',
                    id: 'Penjelasan proses ujian.',
                    en: 'Explanation of the exam process.'
                },
                duration: 480,
            }
        },
        color: 'amber',
        categories: [
            { id: 'livestock-general', name: { ja: '畜産業一般', vi: 'Chăn nuôi tổng quát', id: 'Peternakan Umum', en: 'Livestock General' }, description: { ja: '日本の畜産業の概要と基礎知識を学びます', vi: 'Học tổng quan và kiến thức cơ bản về ngành Chăn nuôi', id: 'Pelajari gambaran umum peternakan Jepang', en: 'Learn overview of Japanese livestock' }, lessonCount: 0, quizCount: 5 },
            { id: 'livestock-safety', name: { ja: '安全衛生', vi: 'An toàn vệ sinh', id: 'Keselamatan dan Kesehatan', en: 'Safety and Health' }, description: { ja: '畜産業における安全管理、衛生管理について学びます', vi: 'Học về quản lý an toàn trong ngành chăn nuôi', id: 'Pelajari tentang manajemen keselamatan dalam peternakan', en: 'Learn about safety management in livestock' }, lessonCount: 0, quizCount: 5 },
        ]
    }
}

const colorClasses: Record<string, { bg: string; text: string; border: string; light: string; gradient: string }> = {
    green: { bg: 'bg-green-600', text: 'text-green-600', border: 'border-green-600', light: 'bg-green-50', gradient: 'from-green-600 to-emerald-600' },
    amber: { bg: 'bg-amber-600', text: 'text-amber-600', border: 'border-amber-600', light: 'bg-amber-50', gradient: 'from-amber-600 to-orange-600' },
}

function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    return `${minutes}分`
}

interface PageProps {
    params: Promise<{ sectorId: string; locale: string }>
}

export default async function SectorPage({ params }: PageProps) {
    const { sectorId, locale } = await params
    const sector = sectorsData[sectorId]

    if (!sector) {
        notFound()
    }

    const lang = (locale as 'ja' | 'vi' | 'id' | 'en') || 'ja'
    const colors = colorClasses[sector.color] || colorClasses.green

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className={`bg-gradient-to-r ${colors.gradient} text-white py-16 px-4`}>
                <div className="max-w-6xl mx-auto">
                    <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        トップページに戻る
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {sector.name[lang]}
                    </h1>
                    <p className="text-xl text-white/90">
                        {sector.description[lang]}
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Intro Videos Section - NEW DESIGN */}
                <div className="mb-16">
                    <div className="text-center mb-8">
                        <Badge className={`${colors.bg} text-white px-4 py-1 mb-4`}>
                            はじめての方へ
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">
                            試験について動画で学ぶ
                        </h2>
                        <p className="text-gray-600">
                            まずはこちらの動画で試験の全体像を把握しましょう
                        </p>
                    </div>

                    {/* 試験の概要 - 1つの大きなカード */}
                    <Link href={`/sectors/${sectorId}/intro/overview`}>
                        <Card className="overflow-hidden border-2 hover:shadow-xl transition-all group cursor-pointer">
                            <div className={`bg-gradient-to-r ${colors.gradient} p-6 sm:p-8 text-white relative`}>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                                <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    {/* Play Button */}
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors flex-shrink-0">
                                        <Play className="h-8 w-8 sm:h-10 sm:w-10 text-white ml-1" />
                                    </div>
                                    <div className="flex-1">
                                        <Badge className="bg-white/20 mb-2">
                                            はじめに見る動画
                                        </Badge>
                                        <h3 className="text-xl sm:text-2xl font-bold mb-2">
                                            試験の概要・受験の流れ
                                        </h3>
                                        <p className="text-white/80 text-sm sm:text-base">
                                            試験内容・合格基準・申し込み方法まで、すべてわかる
                                        </p>
                                    </div>
                                    <ChevronRight className="h-6 w-6 text-white/60 hidden sm:block" />
                                </div>
                            </div>
                            <CardContent className="p-4 sm:p-6 bg-white">
                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                    <span className="flex items-center">
                                        <Video className="h-4 w-4 mr-1" />
                                        動画で解説
                                    </span>
                                    <span className="flex items-center">
                                        <span className="w-1 h-1 bg-gray-300 rounded-full mx-2" />
                                        {formatDuration(sector.introVideos.overview.duration + sector.introVideos.flow.duration)}
                                    </span>
                                    <span className="flex items-center">
                                        <span className="w-1 h-1 bg-gray-300 rounded-full mx-2" />
                                        <Headphones className="h-4 w-4 mr-1" />
                                        音声対応
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* 事業者向けガイド - コンパクト */}
                    <div className="mt-4">
                        <Link href={`/sectors/${sectorId}/intro/business`}>
                            <Card className="border hover:shadow-lg transition-all group cursor-pointer">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 ${colors.light} ${colors.text} rounded-full flex items-center justify-center`}>
                                            <Play className="h-4 w-4 ml-0.5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">企業・事業者の方へ</p>
                                            <p className="font-medium text-gray-900">受入れガイド</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>

                {/* リーダー育成コース - 特別セクション */}
                <div className="mb-16">
                    <Link href={`/sectors/${sectorId}/courses`}>
                        <Card className={`overflow-hidden border-2 ${colors.border} hover:shadow-xl transition-all group cursor-pointer`}>
                            <div className="flex flex-col sm:flex-row">
                                <div className={`bg-gradient-to-br ${colors.gradient} p-6 sm:p-8 text-white sm:w-2/5`}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-2xl">🏆</span>
                                        <Badge className="bg-yellow-400 text-yellow-900 font-bold">
                                            特別コース
                                        </Badge>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold mb-2">
                                        リーダー育成コース
                                    </h3>
                                    <p className="text-white/90 text-sm">
                                        日本の農業分野でリーダーになる人が必ず学ぶべき5コース
                                    </p>
                                </div>
                                <div className="bg-white p-6 sm:w-3/5">
                                    <div className="space-y-2 text-sm text-gray-700">
                                        <p className="flex items-center gap-2">
                                            <span className={`w-6 h-6 ${colors.bg} text-white rounded-full flex items-center justify-center text-xs font-bold`}>1</span>
                                            リーダーの心得と「安全・法律」
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className={`w-6 h-6 ${colors.bg} text-white rounded-full flex items-center justify-center text-xs font-bold`}>2</span>
                                            農業分野の「計算」完全攻略
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className={`w-6 h-6 ${colors.bg} text-white rounded-full flex items-center justify-center text-xs font-bold`}>3</span>
                                            植物が育つ仕組み
                                        </p>
                                        <p className="flex items-center gap-2 text-gray-400">
                                            <span className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">+2</span>
                                            他2コース...
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                                        <div className="text-xs text-gray-500">
                                            5コース・19レッスン・約3時間
                                        </div>
                                        <span className={`${colors.text} font-medium text-sm flex items-center group-hover:underline`}>
                                            詳しく見る
                                            <ChevronRight className="h-4 w-4" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                </div>

                {/* Divider */}
                <div className="relative mb-16">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-gray-50 px-6 text-gray-500 text-sm">
                            学習コンテンツ
                        </span>
                    </div>
                </div>

                {/* Learning Content Section */}
                <div className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">学習コンテンツ</h2>
                    <p className="text-gray-600 mb-8">章を選んで学習を始めましょう。全レッスン視聴後に章末テストが解放されます。</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sector.categories.map((category, index) => (
                            <Link
                                key={category.id}
                                href={category.lessonCount > 0 ? `/sectors/${sectorId}/${category.id}` : '#'}
                                className={category.lessonCount === 0 ? 'pointer-events-none' : ''}
                            >
                                <Card className={`h-full hover:shadow-lg transition-all ${category.lessonCount > 0 ? 'cursor-pointer hover:scale-[1.02]' : 'opacity-60'} border-2`}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <Badge variant="outline" className={colors.text}>
                                                第{index + 1}章
                                            </Badge>
                                            {category.lessonCount > 0 ? (
                                                <div className="flex gap-2">
                                                    <Badge className={colors.bg}>
                                                        {category.lessonCount} レッスン
                                                    </Badge>
                                                    <Badge variant="outline" className="text-gray-500">
                                                        {category.quizCount}問テスト
                                                    </Badge>
                                                </div>
                                            ) : (
                                                <Badge variant="outline" className="text-gray-400">
                                                    準備中
                                                </Badge>
                                            )}
                                        </div>
                                        <CardTitle className="text-lg mt-2">
                                            {category.name[lang]}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {category.description[lang]}
                                        </p>
                                        {category.lessonCount > 0 && (
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Video className="h-4 w-4 mr-1" />
                                                動画
                                                <Headphones className="h-4 w-4 ml-3 mr-1" />
                                                音声
                                                <ChevronRight className="h-4 w-4 ml-auto" />
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className={`${colors.light} rounded-2xl p-8 text-center border-2 ${colors.border}`}>
                    <h3 className="text-xl font-bold mb-4">学習を始めましょう</h3>
                    <p className="text-gray-600 mb-6">
                        特定技能2号{sector.name.ja}試験に合格するために、今すぐ学習を始めましょう。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className={colors.bg}>
                            <Link href="/signup">
                                無料で登録する
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/preview">
                                コンテンツをプレビュー
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
