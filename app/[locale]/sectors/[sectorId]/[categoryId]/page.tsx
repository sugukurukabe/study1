import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Video, Headphones, Clock, Play, Lock, Unlock, CheckCircle2, FileQuestion } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// カテゴリとレッスンデータ（後でSupabaseから取得に変更予定）
const categoryData: Record<string, {
    sectorId: string
    sectorName: { ja: string; vi: string; id: string; en: string }
    name: { ja: string; vi: string; id: string; en: string }
    description: { ja: string; vi: string; id: string; en: string }
    color: string
    lessons: Array<{
        id: string
        title: { ja: string; vi: string; id: string; en: string }
        description: { ja: string; vi: string; id: string; en: string }
        duration: number
        hasVideo: boolean
        hasAudio: boolean
    }>
    quizQuestionCount: number
}> = {
    'agri-general': {
        sectorId: 'agriculture',
        sectorName: { ja: '農業', vi: 'Nông nghiệp', id: 'Pertanian', en: 'Agriculture' },
        name: { ja: '日本農業一般', vi: 'Nông nghiệp Nhật Bản tổng quát', id: 'Pertanian Jepang Umum', en: 'Japanese Agriculture General' },
        description: { ja: '日本の農業の特徴、農業政策、食料自給率などを学びます', vi: 'Học về đặc điểm nông nghiệp Nhật Bản', id: 'Pelajari karakteristik pertanian Jepang', en: 'Learn about Japanese agriculture characteristics' },
        color: 'green',
        lessons: [
            {
                id: 'agri-001',
                title: { ja: '日本農業の概要', vi: 'Tổng quan về nông nghiệp Nhật Bản', id: 'Gambaran Umum Pertanian Jepang', en: 'Overview of Japanese Agriculture' },
                description: { ja: '日本の農業の現状、主要な農産物、農業就業者数の推移について学びます。', vi: 'Học về tình hình nông nghiệp Nhật Bản hiện tại.', id: 'Pelajari tentang kondisi pertanian Jepang saat ini.', en: 'Learn about current state of Japanese agriculture.' },
                duration: 900,
                hasVideo: true,
                hasAudio: true,
            },
            {
                id: 'agri-002',
                title: { ja: '食料自給率と農業政策', vi: 'Tỷ lệ tự cung cấp lương thực và chính sách nông nghiệp', id: 'Rasio Swasembada Pangan dan Kebijakan Pertanian', en: 'Food Self-Sufficiency Rate and Agricultural Policy' },
                description: { ja: '日本の食料自給率の現状と、それを支える農業政策について解説します。', vi: 'Giải thích về tình hình tỷ lệ tự cung cấp lương thực.', id: 'Penjelasan tentang kondisi rasio swasembada pangan.', en: 'Explanation of food self-sufficiency rate and policies.' },
                duration: 1200,
                hasVideo: true,
                hasAudio: true,
            },
        ],
        quizQuestionCount: 5,
    },
    'agri-crop-general': {
        sectorId: 'agriculture',
        sectorName: { ja: '農業', vi: 'Nông nghiệp', id: 'Pertanian', en: 'Agriculture' },
        name: { ja: '耕種農業一般', vi: 'Nông nghiệp trồng trọt tổng quát', id: 'Pertanian Tanam Umum', en: 'Crop Agriculture General' },
        description: { ja: '耕種農業の基礎知識、土壌管理、肥料、農薬について学びます', vi: 'Học kiến thức cơ bản về nông nghiệp trồng trọt', id: 'Pelajari pengetahuan dasar pertanian tanam', en: 'Learn basics of crop agriculture' },
        color: 'green',
        lessons: [
            {
                id: 'agri-003',
                title: { ja: '土壌の基礎知識', vi: 'Kiến thức cơ bản về đất', id: 'Pengetahuan Dasar tentang Tanah', en: 'Basics of Soil' },
                description: { ja: '土壌の構成、土壌診断、土づくりの基本について学びます。', vi: 'Học về thành phần đất, chẩn đoán đất.', id: 'Pelajari tentang komposisi tanah, diagnosis tanah.', en: 'Learn about soil composition and diagnosis.' },
                duration: 900,
                hasVideo: true,
                hasAudio: true,
            },
        ],
        quizQuestionCount: 5,
    },
    'agri-safety': {
        sectorId: 'agriculture',
        sectorName: { ja: '農業', vi: 'Nông nghiệp', id: 'Pertanian', en: 'Agriculture' },
        name: { ja: '安全衛生', vi: 'An toàn vệ sinh', id: 'Keselamatan dan Kesehatan', en: 'Safety and Health' },
        description: { ja: '農作業における安全管理、衛生管理について学びます', vi: 'Học về quản lý an toàn trong công việc nông nghiệp', id: 'Pelajari tentang manajemen keselamatan dalam pekerjaan pertanian', en: 'Learn about safety management in agricultural work' },
        color: 'green',
        lessons: [
            {
                id: 'agri-004',
                title: { ja: '農作業の安全対策', vi: 'Biện pháp an toàn trong công việc nông nghiệp', id: 'Langkah Keselamatan Kerja Pertanian', en: 'Agricultural Work Safety Measures' },
                description: { ja: '農作業中の事故防止、熱中症対策、機械取扱いの注意点を学びます。', vi: 'Học về phòng ngừa tai nạn, phòng chống say nắng.', id: 'Pelajari tentang pencegahan kecelakaan, pencegahan heat stroke.', en: 'Learn about accident prevention and heat stroke prevention.' },
                duration: 1080,
                hasVideo: true,
                hasAudio: true,
            },
        ],
        quizQuestionCount: 5,
    },
    'agri-rice': {
        sectorId: 'agriculture',
        sectorName: { ja: '農業', vi: 'Nông nghiệp', id: 'Pertanian', en: 'Agriculture' },
        name: { ja: '稲作作業', vi: 'Trồng lúa', id: 'Pertanian Padi', en: 'Rice Cultivation' },
        description: { ja: '水稲栽培の技術、田植え、収穫など稲作全般を学びます', vi: 'Học kỹ thuật trồng lúa nước', id: 'Pelajari teknik budidaya padi sawah', en: 'Learn rice cultivation techniques' },
        color: 'green',
        lessons: [
            {
                id: 'agri-005',
                title: { ja: '稲作の年間スケジュール', vi: 'Lịch trình hàng năm trồng lúa', id: 'Jadwal Tahunan Budidaya Padi', en: 'Annual Rice Cultivation Schedule' },
                description: { ja: '種まきから収穫まで、稲作の1年間の流れを学びます。', vi: 'Học về quy trình trồng lúa trong 1 năm.', id: 'Pelajari alur budidaya padi selama 1 tahun.', en: 'Learn the annual rice cultivation process.' },
                duration: 1200,
                hasVideo: true,
                hasAudio: true,
            },
        ],
        quizQuestionCount: 5,
    },
    // 畜産業
    'livestock-ch1': {
        sectorId: 'livestock',
        sectorName: { ja: '畜産業', vi: 'Chăn nuôi', id: 'Peternakan', en: 'Livestock' },
        name: { ja: '第一章　畜産の特徴', vi: 'Chương 1: Đặc điểm chăn nuôi', id: 'Bab 1: Karakteristik Peternakan', en: 'Chapter 1: Characteristics of Livestock' },
        description: { ja: '畜産業の各分野の特徴を学習', vi: 'Học đặc điểm các lĩnh vực chăn nuôi', id: 'Pelajari karakteristik berbagai bidang peternakan', en: 'Learn characteristics of livestock sectors' },
        color: 'amber',
        lessons: [
            { id: 'livestock-ch1-01', title: { ja: '1. 酪農（乳用牛）', vi: '1. Chăn nuôi bò sữa', id: '1. Peternakan Sapi Perah', en: '1. Dairy Farming' }, description: { ja: '酪農の特徴と乳用牛の基礎知識', vi: 'Đặc điểm chăn nuôi bò sữa', id: 'Karakteristik peternakan sapi perah', en: 'Characteristics of dairy farming' }, duration: 1200, hasVideo: true, hasAudio: false },
            { id: 'livestock-ch1-02', title: { ja: '2. 牛肉生産（肉用牛）', vi: '2. Sản xuất thịt bò', id: '2. Produksi Daging Sapi', en: '2. Beef Production' }, description: { ja: '肉用牛の特徴と飼養管理', vi: 'Đặc điểm và quản lý bò thịt', id: 'Karakteristik dan manajemen sapi potong', en: 'Beef cattle characteristics and management' }, duration: 1080, hasVideo: true, hasAudio: false },
            { id: 'livestock-ch1-03', title: { ja: '3. 養豚', vi: '3. Chăn nuôi lợn', id: '3. Peternakan Babi', en: '3. Pig Farming' }, description: { ja: '養豚の特徴と管理方法', vi: 'Đặc điểm và phương pháp quản lý lợn', id: 'Karakteristik dan metode manajemen babi', en: 'Pig farming characteristics and methods' }, duration: 1080, hasVideo: true, hasAudio: false },
            { id: 'livestock-ch1-04', title: { ja: '4. 養鶏', vi: '4. Chăn nuôi gà', id: '4. Peternakan Ayam', en: '4. Poultry Farming' }, description: { ja: '養鶏の特徴と飼養システム', vi: 'Đặc điểm và hệ thống chăn nuôi gà', id: 'Karakteristik dan sistem peternakan ayam', en: 'Poultry farming characteristics and systems' }, duration: 1080, hasVideo: true, hasAudio: false },
            { id: 'livestock-ch1-05', title: { ja: '5. その他', vi: '5. Khác', id: '5. Lainnya', en: '5. Others' }, description: { ja: 'その他の畜産（羊、山羊など）', vi: 'Chăn nuôi khác (cừu, dê, v.v.)', id: 'Peternakan lainnya (domba, kambing, dll)', en: 'Other livestock (sheep, goats, etc.)' }, duration: 900, hasVideo: true, hasAudio: false },
        ],
        quizQuestionCount: 5,
    },
    'livestock-ch2': {
        sectorId: 'livestock',
        sectorName: { ja: '畜産業', vi: 'Chăn nuôi', id: 'Peternakan', en: 'Livestock' },
        name: { ja: '第二章　家畜と飼料に関する基礎知識', vi: 'Chương 2: Kiến thức cơ bản về gia súc và thức ăn', id: 'Bab 2: Pengetahuan Dasar tentang Ternak dan Pakan', en: 'Chapter 2: Basic Knowledge of Livestock and Feed' },
        description: { ja: '家畜の種類と飼料の基礎知識', vi: 'Kiến thức cơ bản về các loại gia súc và thức ăn', id: 'Pengetahuan dasar tentang jenis ternak dan pakan', en: 'Basic knowledge of livestock types and feed' },
        color: 'amber',
        lessons: [
            { id: 'livestock-ch2-01', title: { ja: '1. 乳用牛', vi: '1. Bò sữa', id: '1. Sapi Perah', en: '1. Dairy Cattle' }, description: { ja: '乳用牛の品種と特徴', vi: 'Giống và đặc điểm bò sữa', id: 'Jenis dan karakteristik sapi perah', en: 'Dairy cattle breeds and characteristics' }, duration: 1080, hasVideo: true, hasAudio: false },
            { id: 'livestock-ch2-02', title: { ja: '2. 肉用牛', vi: '2. Bò thịt', id: '2. Sapi Potong', en: '2. Beef Cattle' }, description: { ja: '肉用牛の品種と特徴', vi: 'Giống và đặc điểm bò thịt', id: 'Jenis dan karakteristik sapi potong', en: 'Beef cattle breeds and characteristics' }, duration: 1080, hasVideo: true, hasAudio: false },
            { id: 'livestock-ch2-03', title: { ja: '3. 豚', vi: '3. Lợn', id: '3. Babi', en: '3. Pigs' }, description: { ja: '豚の品種と特徴', vi: 'Giống và đặc điểm lợn', id: 'Jenis dan karakteristik babi', en: 'Pig breeds and characteristics' }, duration: 1080, hasVideo: true, hasAudio: false },
        ],
        quizQuestionCount: 5,
    },
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
    params: Promise<{ sectorId: string; categoryId: string; locale: string }>
}

export default async function CategoryPage({ params }: PageProps) {
    const { sectorId, categoryId, locale } = await params
    const category = categoryData[categoryId]

    if (!category || category.sectorId !== sectorId) {
        notFound()
    }

    const lang = (locale as 'ja' | 'vi' | 'id' | 'en') || 'ja'
    const colors = colorClasses[category.color] || colorClasses.green

    // 仮の進捗データ（後でSupabaseから取得）
    // ログインしていない場合は全て未完了
    const completedLessons = 0 // 実際はSupabaseから取得
    const totalLessons = category.lessons.length
    const isQuizUnlocked = completedLessons >= totalLessons
    const remainingLessons = totalLessons - completedLessons

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className={`bg-gradient-to-r ${colors.gradient} text-white py-12 px-4`}>
                <div className="max-w-6xl mx-auto">
                    <Link href={`/${locale}/sectors/${sectorId}`} className="inline-flex items-center text-white/80 hover:text-white mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        {category.sectorName[lang]}に戻る
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        {category.name[lang]}
                    </h1>
                    <p className="text-lg text-white/90">
                        {category.description[lang]}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-sm">
                        <Badge className="bg-white/20">{totalLessons} レッスン</Badge>
                        <span className="text-white/80">
                            合計: {formatDuration(category.lessons.reduce((acc, l) => acc + l.duration, 0))}
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">学習進捗</span>
                        <span className="text-sm text-gray-500">{completedLessons} / {totalLessons} 完了</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className={`${colors.bg} h-2.5 rounded-full transition-all`}
                            style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Lessons List */}
                <div className="space-y-4 mb-12">
                    <h2 className="text-xl font-bold mb-4">レッスン一覧</h2>
                    {category.lessons.map((lesson, index) => (
                        <Link key={lesson.id} href={`/${locale}/learn/${lesson.id}`}>
                            <Card className="hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01] border-2">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        {/* Lesson Number / Completion Status */}
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${index < completedLessons
                                                ? `${colors.bg} text-white`
                                                : `${colors.light} ${colors.text}`
                                            }`}>
                                            {index < completedLessons ? (
                                                <CheckCircle2 className="h-6 w-6" />
                                            ) : (
                                                index + 1
                                            )}
                                        </div>

                                        {/* Lesson Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-semibold mb-1">
                                                {lesson.title[lang]}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                {lesson.description[lang]}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span className="flex items-center">
                                                    <Clock className="h-4 w-4 mr-1" />
                                                    {formatDuration(lesson.duration)}
                                                </span>
                                                {lesson.hasVideo && (
                                                    <span className="flex items-center">
                                                        <Video className="h-4 w-4 mr-1" />
                                                        動画
                                                    </span>
                                                )}
                                                {lesson.hasAudio && (
                                                    <span className="flex items-center">
                                                        <Headphones className="h-4 w-4 mr-1" />
                                                        音声
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Play Button */}
                                        <div className="flex-shrink-0">
                                            <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center`}>
                                                <Play className="h-5 w-5 text-white ml-0.5" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Chapter Quiz Section */}
                <Card className={`border-2 ${isQuizUnlocked ? colors.border : 'border-gray-200'} overflow-hidden`}>
                    <CardHeader className={isQuizUnlocked ? colors.light : 'bg-gray-100'}>
                        <CardTitle className="flex items-center gap-3">
                            {isQuizUnlocked ? (
                                <div className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center`}>
                                    <Unlock className="h-5 w-5 text-white" />
                                </div>
                            ) : (
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                    <Lock className="h-5 w-5 text-gray-500" />
                                </div>
                            )}
                            <div>
                                <div className="flex items-center gap-2">
                                    <FileQuestion className={`h-5 w-5 ${isQuizUnlocked ? colors.text : 'text-gray-400'}`} />
                                    <span className={isQuizUnlocked ? '' : 'text-gray-500'}>章末テスト</span>
                                    <Badge variant="outline" className={isQuizUnlocked ? colors.text : 'text-gray-400'}>
                                        {category.quizQuestionCount}問
                                    </Badge>
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {isQuizUnlocked ? (
                            <div>
                                <p className="text-gray-600 mb-4">
                                    全レッスンの視聴が完了しました！章末テストに挑戦して、理解度を確認しましょう。
                                </p>
                                <Button asChild className={colors.bg}>
                                    <Link href={`/${locale}/sectors/${sectorId}/${categoryId}/quiz`}>
                                        <FileQuestion className="h-4 w-4 mr-2" />
                                        章末テストを開始
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <div className="flex items-center gap-2 text-gray-500 mb-4">
                                    <Lock className="h-4 w-4" />
                                    <span>
                                        残り<strong className={colors.text}> {remainingLessons}レッスン </strong>を視聴すると、テストが解放されます
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {category.lessons.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${index < completedLessons
                                                    ? `${colors.bg} text-white`
                                                    : 'bg-gray-200 text-gray-500'
                                                }`}
                                        >
                                            {index < completedLessons ? '✓' : index + 1}
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                        <Lock className="h-3 w-3 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Language Switch Hint */}
                <div className="mt-12 text-center">
                    <Card className="inline-block">
                        <CardContent className="p-6">
                            <p className="text-gray-600">
                                🌐 このコンテンツは日本語、ベトナム語、インドネシア語に対応しています
                            </p>
                            <div className="flex justify-center gap-2 mt-4">
                                <Badge variant="outline">日本語</Badge>
                                <Badge variant="outline">Tiếng Việt</Badge>
                                <Badge variant="outline">Bahasa Indonesia</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
