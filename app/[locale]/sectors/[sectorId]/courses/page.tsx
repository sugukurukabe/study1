'use client'

import { ArrowLeft, ChevronRight, Clock, Play, BookOpen, Award, Shield, Calculator, Leaf, Wrench, Users, Lock, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

// リーダー育成コースデータ
const leaderCoursesData: Record<string, {
    sectorName: { ja: string; vi: string; id: string; en: string }
    title: { ja: string; vi: string; id: string; en: string }
    subtitle: { ja: string; vi: string; id: string; en: string }
    courses: Array<{
        id: string
        icon: string
        title: { ja: string; vi: string; id: string; en: string }
        description: { ja: string; vi: string; id: string; en: string }
        lessons: Array<{
            id: string
            title: { ja: string; vi: string; id: string; en: string }
            duration: number
            videoId?: string
        }>
        totalDuration: number
    }>
}> = {
    agriculture: {
        sectorName: { ja: '農業', vi: 'Nông nghiệp', id: 'Pertanian', en: 'Agriculture' },
        title: {
            ja: 'リーダー育成コース',
            vi: 'Khóa đào tạo Lãnh đạo',
            id: 'Kursus Pengembangan Pemimpin',
            en: 'Leader Development Course'
        },
        subtitle: {
            ja: '日本の農業分野でリーダーになる人は必ず学ぶべき5コース',
            vi: '5 khóa học bắt buộc cho người muốn trở thành lãnh đạo trong ngành nông nghiệp Nhật Bản',
            id: '5 kursus wajib untuk menjadi pemimpin di bidang pertanian Jepang',
            en: '5 essential courses for becoming a leader in Japanese agriculture'
        },
        courses: [
            {
                id: 'leader-mindset',
                icon: 'shield',
                title: {
                    ja: 'リーダーの心得と「安全・法律」',
                    vi: 'Tư duy lãnh đạo và "An toàn & Pháp luật"',
                    id: 'Pola Pikir Pemimpin dan "Keselamatan & Hukum"',
                    en: 'Leader Mindset and "Safety & Law"'
                },
                description: {
                    ja: '現場を任される前に知っておくべき、リーダーとしての責任と安全管理・労働法の基礎',
                    vi: 'Trách nhiệm lãnh đạo và kiến thức cơ bản về quản lý an toàn, luật lao động trước khi được giao phụ trách hiện trường',
                    id: 'Tanggung jawab sebagai pemimpin dan dasar manajemen keselamatan serta hukum ketenagakerjaan sebelum ditugaskan mengelola lapangan',
                    en: 'Leader responsibilities and basics of safety management and labor law before managing the field'
                },
                lessons: [
                    { id: 'leader-1-1', title: { ja: 'リーダーに求められる役割とは', vi: 'Vai trò của người lãnh đạo', id: 'Peran yang dibutuhkan pemimpin', en: 'The role required of a leader' }, duration: 600 },
                    { id: 'leader-1-2', title: { ja: '農作業における安全管理の基本', vi: 'Cơ bản về quản lý an toàn trong nông nghiệp', id: 'Dasar manajemen keselamatan dalam pertanian', en: 'Basics of safety management in agriculture' }, duration: 720 },
                    { id: 'leader-1-3', title: { ja: '労働基準法の基礎知識', vi: 'Kiến thức cơ bản về Luật Tiêu chuẩn Lao động', id: 'Pengetahuan dasar Undang-Undang Standar Ketenagakerjaan', en: 'Basics of Labor Standards Act' }, duration: 900 },
                    { id: 'leader-1-4', title: { ja: '外国人雇用に関する法律', vi: 'Luật về tuyển dụng người nước ngoài', id: 'Hukum tentang mempekerjakan orang asing', en: 'Laws regarding employment of foreigners' }, duration: 780 },
                ],
                totalDuration: 3000,
            },
            {
                id: 'agri-calculation',
                icon: 'calculator',
                title: {
                    ja: '農業分野の「計算」完全攻略',
                    vi: 'Hoàn toàn làm chủ "Tính toán" trong nông nghiệp',
                    id: 'Menguasai Sepenuhnya "Perhitungan" di Bidang Pertanian',
                    en: 'Complete Mastery of "Calculations" in Agriculture'
                },
                description: {
                    ja: '面積計算、肥料計算、農薬希釈など、現場で必須の計算スキルをマスター',
                    vi: 'Làm chủ các kỹ năng tính toán cần thiết tại hiện trường: diện tích, phân bón, pha loãng thuốc trừ sâu',
                    id: 'Kuasai keterampilan perhitungan yang diperlukan di lapangan: luas, pupuk, pengenceran pestisida',
                    en: 'Master essential field calculation skills: area, fertilizer, pesticide dilution'
                },
                lessons: [
                    { id: 'calc-2-1', title: { ja: '面積計算の基本（a・ha・㎡）', vi: 'Cơ bản tính diện tích (a・ha・㎡)', id: 'Dasar perhitungan luas (a・ha・㎡)', en: 'Basics of area calculation (a・ha・㎡)' }, duration: 540 },
                    { id: 'calc-2-2', title: { ja: '肥料の計算（施肥量・成分量）', vi: 'Tính toán phân bón (lượng bón・thành phần)', id: 'Perhitungan pupuk (jumlah aplikasi・kandungan)', en: 'Fertilizer calculation (application amount・components)' }, duration: 720 },
                    { id: 'calc-2-3', title: { ja: '農薬の希釈計算', vi: 'Tính toán pha loãng thuốc trừ sâu', id: 'Perhitungan pengenceran pestisida', en: 'Pesticide dilution calculation' }, duration: 660 },
                    { id: 'calc-2-4', title: { ja: '収量予測と出荷計算', vi: 'Dự đoán sản lượng và tính toán xuất hàng', id: 'Prediksi hasil panen dan perhitungan pengiriman', en: 'Yield prediction and shipping calculation' }, duration: 600 },
                    { id: 'calc-2-5', title: { ja: '計算問題 実践演習', vi: 'Bài tập thực hành tính toán', id: 'Latihan praktis perhitungan', en: 'Calculation practice exercises' }, duration: 480 },
                ],
                totalDuration: 3000,
            },
            {
                id: 'plant-science',
                icon: 'leaf',
                title: {
                    ja: '植物が育つ仕組み',
                    vi: 'Cơ chế sinh trưởng của thực vật',
                    id: 'Mekanisme Pertumbuhan Tanaman',
                    en: 'How Plants Grow'
                },
                description: {
                    ja: '光合成から土壌環境まで、植物の生育に必要な科学的知識を学ぶ',
                    vi: 'Học kiến thức khoa học cần thiết cho sự sinh trưởng của thực vật, từ quang hợp đến môi trường đất',
                    id: 'Pelajari pengetahuan ilmiah yang diperlukan untuk pertumbuhan tanaman, dari fotosintesis hingga lingkungan tanah',
                    en: 'Learn the scientific knowledge necessary for plant growth, from photosynthesis to soil environment'
                },
                lessons: [
                    { id: 'plant-3-1', title: { ja: '光合成と植物の成長', vi: 'Quang hợp và sự sinh trưởng của thực vật', id: 'Fotosintesis dan pertumbuhan tanaman', en: 'Photosynthesis and plant growth' }, duration: 600 },
                    { id: 'plant-3-2', title: { ja: '水と養分の吸収', vi: 'Hấp thụ nước và chất dinh dưỡng', id: 'Penyerapan air dan nutrisi', en: 'Water and nutrient absorption' }, duration: 540 },
                    { id: 'plant-3-3', title: { ja: '土壌環境と根の働き', vi: 'Môi trường đất và hoạt động của rễ', id: 'Lingkungan tanah dan fungsi akar', en: 'Soil environment and root function' }, duration: 660 },
                ],
                totalDuration: 1800,
            },
            {
                id: 'crop-master',
                icon: 'users',
                title: {
                    ja: '作物別マスター',
                    vi: 'Làm chủ từng loại cây trồng',
                    id: 'Master Berdasarkan Jenis Tanaman',
                    en: 'Crop-Specific Master'
                },
                description: {
                    ja: '稲作・野菜・果樹など、作物ごとの特性と栽培のポイントを理解する',
                    vi: 'Hiểu đặc điểm và điểm quan trọng trong canh tác của từng loại cây trồng: lúa, rau, cây ăn quả',
                    id: 'Pahami karakteristik dan poin penting budidaya setiap tanaman: padi, sayuran, buah-buahan',
                    en: 'Understand characteristics and cultivation points for each crop: rice, vegetables, fruits'
                },
                lessons: [
                    { id: 'crop-4-1', title: { ja: '稲作の年間管理', vi: 'Quản lý trồng lúa hàng năm', id: 'Manajemen tahunan budidaya padi', en: 'Annual rice cultivation management' }, duration: 900 },
                    { id: 'crop-4-2', title: { ja: '野菜栽培の基本', vi: 'Cơ bản về trồng rau', id: 'Dasar budidaya sayuran', en: 'Basics of vegetable cultivation' }, duration: 720 },
                    { id: 'crop-4-3', title: { ja: '果樹の管理と収穫', vi: 'Quản lý và thu hoạch cây ăn quả', id: 'Manajemen dan panen buah-buahan', en: 'Fruit tree management and harvesting' }, duration: 780 },
                    { id: 'crop-4-4', title: { ja: '施設園芸のポイント', vi: 'Điểm quan trọng trong làm vườn nhà kính', id: 'Poin penting hortikultura fasilitas', en: 'Key points of greenhouse horticulture' }, duration: 660 },
                ],
                totalDuration: 3060,
            },
            {
                id: 'machinery-safety',
                icon: 'wrench',
                title: {
                    ja: '機械と道具の安全',
                    vi: 'An toàn máy móc và dụng cụ',
                    id: 'Keselamatan Mesin dan Alat',
                    en: 'Machinery and Tool Safety'
                },
                description: {
                    ja: 'トラクター、刈払機など農業機械の安全な使い方と日常点検',
                    vi: 'Cách sử dụng an toàn và kiểm tra hàng ngày các máy nông nghiệp như máy kéo, máy cắt cỏ',
                    id: 'Cara penggunaan yang aman dan pemeriksaan harian mesin pertanian seperti traktor, mesin pemotong rumput',
                    en: 'Safe use and daily inspection of agricultural machinery such as tractors and brush cutters'
                },
                lessons: [
                    { id: 'machine-5-1', title: { ja: 'トラクターの安全運転', vi: 'Lái máy kéo an toàn', id: 'Mengemudi traktor dengan aman', en: 'Safe tractor operation' }, duration: 720 },
                    { id: 'machine-5-2', title: { ja: '刈払機の正しい使い方', vi: 'Cách sử dụng đúng máy cắt cỏ', id: 'Cara penggunaan yang benar mesin pemotong rumput', en: 'Correct use of brush cutter' }, duration: 540 },
                    { id: 'machine-5-3', title: { ja: '日常点検と整備', vi: 'Kiểm tra và bảo dưỡng hàng ngày', id: 'Pemeriksaan dan pemeliharaan harian', en: 'Daily inspection and maintenance' }, duration: 600 },
                ],
                totalDuration: 1860,
            },
        ],
    },
}

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
    shield: Shield,
    calculator: Calculator,
    leaf: Leaf,
    users: Users,
    wrench: Wrench,
}

const colorClasses = {
    agriculture: { bg: 'bg-green-600', gradient: 'from-green-500 to-emerald-600', light: 'bg-green-50', text: 'text-green-600', border: 'border-green-500' },
    livestock: { bg: 'bg-amber-600', gradient: 'from-amber-500 to-orange-600', light: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-500' },
}

function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
        return `${hours}時間${minutes}分`
    }
    return `${minutes}分`
}

export default function CoursesPage() {
    const params = useParams()
    const sectorId = params.sectorId as string
    const locale = (params.locale as string) || 'ja'
    const lang = locale as 'ja' | 'vi' | 'id' | 'en'

    const data = leaderCoursesData[sectorId]
    const colors = colorClasses[sectorId as keyof typeof colorClasses] || colorClasses.agriculture

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600">コースが見つかりませんでした</p>
            </div>
        )
    }

    const totalLessons = data.courses.reduce((sum, c) => sum + c.lessons.length, 0)
    const totalDuration = data.courses.reduce((sum, c) => sum + c.totalDuration, 0)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className={`bg-gradient-to-r ${colors.gradient} text-white py-12 px-4`}>
                <div className="max-w-4xl mx-auto">
                    <Link href={`/sectors/${sectorId}`} className="inline-flex items-center text-white/80 hover:text-white mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        {data.sectorName[lang]}に戻る
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                        <Award className="h-10 w-10" />
                        <Badge className="bg-white/20 text-white px-3 py-1">
                            特別コース
                        </Badge>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                        {data.title[lang]}
                    </h1>
                    <p className="text-white/90 text-lg">
                        {data.subtitle[lang]}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-6 text-sm">
                        <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full">
                            <BookOpen className="h-4 w-4" />
                            <span>{data.courses.length}コース</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full">
                            <Play className="h-4 w-4" />
                            <span>{totalLessons}レッスン</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full">
                            <Clock className="h-4 w-4" />
                            <span>約{formatDuration(totalDuration)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course List */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="space-y-4">
                    {data.courses.map((course, index) => {
                        const IconComponent = iconComponents[course.icon] || BookOpen
                        return (
                            <Link key={course.id} href={`/sectors/${sectorId}/courses/${course.id}`}>
                                <Card className="hover:shadow-lg transition-all group cursor-pointer border-2 hover:border-green-300">
                                    <CardContent className="p-0">
                                        <div className="flex flex-col sm:flex-row">
                                            {/* Left: Number & Icon */}
                                            <div className={`${colors.light} p-6 flex items-center justify-center sm:w-32 flex-shrink-0`}>
                                                <div className="flex flex-col items-center">
                                                    <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center text-white text-xl font-bold mb-2`}>
                                                        {index + 1}
                                                    </div>
                                                    <IconComponent className={`h-6 w-6 ${colors.text}`} />
                                                </div>
                                            </div>

                                            {/* Right: Content */}
                                            <div className="flex-1 p-6">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-2">
                                                            {course.title[lang]}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                            {course.description[lang]}
                                                        </p>
                                                        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                                                            <span className="flex items-center gap-1">
                                                                <Play className="h-3 w-3" />
                                                                {course.lessons.length}レッスン
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Clock className="h-3 w-3" />
                                                                {formatDuration(course.totalDuration)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors flex-shrink-0" />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </div>

                {/* Back Button */}
                <div className="mt-8">
                    <Link href={`/sectors/${sectorId}`}>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {data.sectorName[lang]}トップに戻る
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
