'use client'

import { ArrowLeft, ChevronRight, Clock, Play, BookOpen, Award, Shield, Calculator, Leaf, Wrench, Users, Lock, CheckCircle, List } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

// リーダー育成コースデータ（courses/page.tsxと共通化する予定）
const leaderCoursesData: Record<string, {
    sectorName: { ja: string; vi: string; id: string; en: string }
    courses: Record<string, {
        id: string
        icon: string
        title: { ja: string; vi: string; id: string; en: string }
        description: { ja: string; vi: string; id: string; en: string }
        lessons: Array<{
            id: string
            title: { ja: string; vi: string; id: string; en: string }
            description: { ja: string; vi: string; id: string; en: string }
            duration: number
            videoId?: { ja?: string; id?: string; vi?: string }
        }>
        totalDuration: number
        order: number
    }>
}> = {
    agriculture: {
        sectorName: { ja: '農業', vi: 'Nông nghiệp', id: 'Pertanian', en: 'Agriculture' },
        courses: {
            'leader-mindset': {
                id: 'leader-mindset',
                icon: 'shield',
                order: 1,
                title: {
                    ja: 'リーダーの心得と「安全・法律」',
                    vi: 'Tư duy lãnh đạo và "An toàn & Pháp luật"',
                    id: 'Pola Pikir Pemimpin dan "Keselamatan & Hukum"',
                    en: 'Leader Mindset and "Safety & Law"'
                },
                description: {
                    ja: '現場を任される前に知っておくべき、リーダーとしての責任と安全管理・労働法の基礎',
                    vi: 'Trách nhiệm lãnh đạo và kiến thức cơ bản về quản lý an toàn, luật lao động',
                    id: 'Tanggung jawab sebagai pemimpin dan dasar manajemen keselamatan serta hukum ketenagakerjaan',
                    en: 'Leader responsibilities and basics of safety management and labor law'
                },
                lessons: [
                    { id: 'leader-1-1', title: { ja: 'リーダーに求められる役割とは', vi: 'Vai trò của người lãnh đạo', id: 'Peran yang dibutuhkan pemimpin', en: 'The role required of a leader' }, description: { ja: 'チームをまとめ、現場を管理するリーダーの基本的な役割と責任について学びます', vi: 'Học về vai trò và trách nhiệm cơ bản của người lãnh đạo quản lý nhóm và hiện trường', id: 'Pelajari peran dan tanggung jawab dasar pemimpin yang mengelola tim dan lapangan', en: 'Learn the basic roles and responsibilities of a leader who manages a team and field' }, duration: 600 },
                    { id: 'leader-1-2', title: { ja: '農作業における安全管理の基本', vi: 'Cơ bản về quản lý an toàn trong nông nghiệp', id: 'Dasar manajemen keselamatan dalam pertanian', en: 'Basics of safety management in agriculture' }, description: { ja: '熱中症対策、機械事故防止、危険作業時の注意点を解説', vi: 'Giải thích về phòng chống say nắng, ngăn ngừa tai nạn máy móc, lưu ý khi làm việc nguy hiểm', id: 'Penjelasan tentang pencegahan heat stroke, pencegahan kecelakaan mesin, perhatian saat pekerjaan berbahaya', en: 'Explanation of heat stroke prevention, machine accident prevention, precautions for dangerous work' }, duration: 720 },
                    { id: 'leader-1-3', title: { ja: '労働基準法の基礎知識', vi: 'Kiến thức cơ bản về Luật Tiêu chuẩn Lao động', id: 'Pengetahuan dasar Undang-Undang Standar Ketenagakerjaan', en: 'Basics of Labor Standards Act' }, description: { ja: '労働時間、休憩、残業など、働く上で知っておくべき法律の基礎', vi: 'Cơ bản về luật cần biết khi làm việc: giờ làm việc, nghỉ giải lao, làm thêm giờ', id: 'Dasar hukum yang perlu diketahui saat bekerja: jam kerja, istirahat, lembur', en: 'Legal basics to know when working: working hours, breaks, overtime' }, duration: 900 },
                    { id: 'leader-1-4', title: { ja: '外国人雇用に関する法律', vi: 'Luật về tuyển dụng người nước ngoài', id: 'Hukum tentang mempekerjakan orang asing', en: 'Laws regarding employment of foreigners' }, description: { ja: '特定技能制度、在留資格、就労条件についてわかりやすく解説', vi: 'Giải thích dễ hiểu về chế độ kỹ năng đặc định, tư cách lưu trú, điều kiện làm việc', id: 'Penjelasan yang mudah dipahami tentang sistem keterampilan khusus, status tinggal, kondisi kerja', en: 'Easy-to-understand explanation of specified skill system, residence status, working conditions' }, duration: 780 },
                ],
                totalDuration: 3000,
            },
            'agri-calculation': {
                id: 'agri-calculation',
                icon: 'calculator',
                order: 2,
                title: {
                    ja: '農業分野の「計算」完全攻略',
                    vi: 'Hoàn toàn làm chủ "Tính toán" trong nông nghiệp',
                    id: 'Menguasai Sepenuhnya "Perhitungan" di Bidang Pertanian',
                    en: 'Complete Mastery of "Calculations" in Agriculture'
                },
                description: {
                    ja: '面積計算、肥料計算、農薬希釈など、現場で必須の計算スキルをマスター',
                    vi: 'Làm chủ các kỹ năng tính toán cần thiết tại hiện trường',
                    id: 'Kuasai keterampilan perhitungan yang diperlukan di lapangan',
                    en: 'Master essential field calculation skills'
                },
                lessons: [
                    { id: 'calc-2-1', title: { ja: '面積計算の基本（a・ha・㎡）', vi: 'Cơ bản tính diện tích', id: 'Dasar perhitungan luas', en: 'Basics of area calculation' }, description: { ja: 'アール、ヘクタール、平方メートルの換算方法と実践問題', vi: 'Phương pháp chuyển đổi và bài tập thực hành', id: 'Metode konversi dan latihan praktis', en: 'Conversion methods and practice problems' }, duration: 540 },
                    { id: 'calc-2-2', title: { ja: '肥料の計算（施肥量・成分量）', vi: 'Tính toán phân bón', id: 'Perhitungan pupuk', en: 'Fertilizer calculation' }, description: { ja: '10aあたりの施肥量、成分計算の方法を学ぶ', vi: 'Học phương pháp tính lượng bón trên 10a', id: 'Pelajari metode perhitungan jumlah aplikasi per 10a', en: 'Learn calculation method for application amount per 10a' }, duration: 720 },
                    { id: 'calc-2-3', title: { ja: '農薬の希釈計算', vi: 'Tính toán pha loãng thuốc trừ sâu', id: 'Perhitungan pengenceran pestisida', en: 'Pesticide dilution calculation' }, description: { ja: '1000倍希釈などの計算方法と安全な使用量', vi: 'Phương pháp tính pha loãng 1000 lần và liều lượng an toàn', id: 'Metode perhitungan pengenceran 1000 kali dan dosis aman', en: '1000x dilution calculation method and safe dosage' }, duration: 660 },
                    { id: 'calc-2-4', title: { ja: '収量予測と出荷計算', vi: 'Dự đoán sản lượng và tính toán xuất hàng', id: 'Prediksi hasil panen dan perhitungan pengiriman', en: 'Yield prediction and shipping calculation' }, description: { ja: '収穫量の見積もりと出荷計画の立て方', vi: 'Cách ước tính sản lượng và lập kế hoạch xuất hàng', id: 'Cara memperkirakan hasil dan membuat rencana pengiriman', en: 'How to estimate yield and create shipping plans' }, duration: 600 },
                    { id: 'calc-2-5', title: { ja: '計算問題 実践演習', vi: 'Bài tập thực hành', id: 'Latihan praktis', en: 'Practice exercises' }, description: { ja: '試験でよく出る計算問題を実際に解いてみましょう', vi: 'Hãy giải các bài toán thường xuất hiện trong kỳ thi', id: 'Mari pecahkan soal perhitungan yang sering muncul di ujian', en: "Let's solve calculation problems that often appear in exams" }, duration: 480 },
                ],
                totalDuration: 3000,
            },
            'plant-science': {
                id: 'plant-science',
                icon: 'leaf',
                order: 3,
                title: {
                    ja: '植物が育つ仕組み',
                    vi: 'Cơ chế sinh trưởng của thực vật',
                    id: 'Mekanisme Pertumbuhan Tanaman',
                    en: 'How Plants Grow'
                },
                description: {
                    ja: '光合成から土壌環境まで、植物の生育に必要な科学的知識を学ぶ',
                    vi: 'Học kiến thức khoa học cần thiết cho sự sinh trưởng của thực vật',
                    id: 'Pelajari pengetahuan ilmiah yang diperlukan untuk pertumbuhan tanaman',
                    en: 'Learn the scientific knowledge necessary for plant growth'
                },
                lessons: [
                    { id: 'plant-3-1', title: { ja: '光合成と植物の成長', vi: 'Quang hợp và sự sinh trưởng', id: 'Fotosintesis dan pertumbuhan', en: 'Photosynthesis and growth' }, description: { ja: '光・水・二酸化炭素から養分を作る仕組み', vi: 'Cơ chế tạo chất dinh dưỡng từ ánh sáng, nước, CO2', id: 'Mekanisme pembuatan nutrisi dari cahaya, air, CO2', en: 'Mechanism of nutrient production from light, water, CO2' }, duration: 600 },
                    { id: 'plant-3-2', title: { ja: '水と養分の吸収', vi: 'Hấp thụ nước và chất dinh dưỡng', id: 'Penyerapan air dan nutrisi', en: 'Water and nutrient absorption' }, description: { ja: '根から吸い上げる水と養分の流れ', vi: 'Dòng chảy nước và chất dinh dưỡng hấp thụ từ rễ', id: 'Aliran air dan nutrisi yang diserap dari akar', en: 'Flow of water and nutrients absorbed from roots' }, duration: 540 },
                    { id: 'plant-3-3', title: { ja: '土壌環境と根の働き', vi: 'Môi trường đất và hoạt động của rễ', id: 'Lingkungan tanah dan fungsi akar', en: 'Soil environment and root function' }, description: { ja: '良い土の条件と根が健康に育つ環境', vi: 'Điều kiện đất tốt và môi trường để rễ phát triển khỏe mạnh', id: 'Kondisi tanah yang baik dan lingkungan untuk akar tumbuh sehat', en: 'Good soil conditions and environment for healthy root growth' }, duration: 660 },
                ],
                totalDuration: 1800,
            },
            'crop-master': {
                id: 'crop-master',
                icon: 'users',
                order: 4,
                title: {
                    ja: '作物別マスター',
                    vi: 'Làm chủ từng loại cây trồng',
                    id: 'Master Berdasarkan Jenis Tanaman',
                    en: 'Crop-Specific Master'
                },
                description: {
                    ja: '稲作・野菜・果樹など、作物ごとの特性と栽培のポイントを理解する',
                    vi: 'Hiểu đặc điểm và điểm quan trọng trong canh tác của từng loại cây trồng',
                    id: 'Pahami karakteristik dan poin penting budidaya setiap tanaman',
                    en: 'Understand characteristics and cultivation points for each crop'
                },
                lessons: [
                    { id: 'crop-4-1', title: { ja: '稲作の年間管理', vi: 'Quản lý trồng lúa hàng năm', id: 'Manajemen tahunan budidaya padi', en: 'Annual rice management' }, description: { ja: '種まきから収穫まで、稲作の1年間の流れ', vi: 'Quy trình trồng lúa 1 năm từ gieo hạt đến thu hoạch', id: 'Alur budidaya padi 1 tahun dari penyemaian hingga panen', en: 'One-year rice cultivation flow from sowing to harvest' }, duration: 900 },
                    { id: 'crop-4-2', title: { ja: '野菜栽培の基本', vi: 'Cơ bản về trồng rau', id: 'Dasar budidaya sayuran', en: 'Vegetable cultivation basics' }, description: { ja: '葉菜・根菜・果菜の違いと栽培のコツ', vi: 'Sự khác biệt và mẹo trồng rau lá, rau củ, rau quả', id: 'Perbedaan dan tips menanam sayuran daun, umbi, buah', en: 'Differences and tips for growing leafy, root, and fruit vegetables' }, duration: 720 },
                    { id: 'crop-4-3', title: { ja: '果樹の管理と収穫', vi: 'Quản lý và thu hoạch cây ăn quả', id: 'Manajemen dan panen buah', en: 'Fruit tree management' }, description: { ja: '剪定、摘果、収穫のタイミングと方法', vi: 'Thời điểm và phương pháp cắt tỉa, tỉa quả, thu hoạch', id: 'Waktu dan metode pemangkasan, penjarangan buah, panen', en: 'Timing and methods for pruning, thinning, and harvesting' }, duration: 780 },
                    { id: 'crop-4-4', title: { ja: '施設園芸のポイント', vi: 'Điểm quan trọng làm vườn nhà kính', id: 'Poin penting hortikultura fasilitas', en: 'Greenhouse horticulture points' }, description: { ja: 'ハウス栽培での温度・湿度管理と病害虫対策', vi: 'Quản lý nhiệt độ, độ ẩm và phòng trừ sâu bệnh trong nhà kính', id: 'Manajemen suhu, kelembaban, dan pengendalian hama penyakit di rumah kaca', en: 'Temperature, humidity management and pest control in greenhouses' }, duration: 660 },
                ],
                totalDuration: 3060,
            },
            'machinery-safety': {
                id: 'machinery-safety',
                icon: 'wrench',
                order: 5,
                title: {
                    ja: '機械と道具の安全',
                    vi: 'An toàn máy móc và dụng cụ',
                    id: 'Keselamatan Mesin dan Alat',
                    en: 'Machinery and Tool Safety'
                },
                description: {
                    ja: 'トラクター、刈払機など農業機械の安全な使い方と日常点検',
                    vi: 'Cách sử dụng an toàn và kiểm tra hàng ngày các máy nông nghiệp',
                    id: 'Cara penggunaan yang aman dan pemeriksaan harian mesin pertanian',
                    en: 'Safe use and daily inspection of agricultural machinery'
                },
                lessons: [
                    { id: 'machine-5-1', title: { ja: 'トラクターの安全運転', vi: 'Lái máy kéo an toàn', id: 'Mengemudi traktor dengan aman', en: 'Safe tractor operation' }, description: { ja: '発進・停止・旋回の基本と転倒防止', vi: 'Cơ bản về khởi động, dừng, quay và phòng chống lật', id: 'Dasar memulai, berhenti, berputar dan pencegahan terguling', en: 'Basics of starting, stopping, turning and rollover prevention' }, duration: 720 },
                    { id: 'machine-5-2', title: { ja: '刈払機の正しい使い方', vi: 'Cách sử dụng đúng máy cắt cỏ', id: 'Cara penggunaan yang benar mesin pemotong', en: 'Correct brush cutter use' }, description: { ja: '姿勢、振り方、飛散物からの防護', vi: 'Tư thế, cách vung và bảo vệ khỏi vật bay', id: 'Postur, cara mengayun, dan perlindungan dari benda terbang', en: 'Posture, swinging method, and protection from flying objects' }, duration: 540 },
                    { id: 'machine-5-3', title: { ja: '日常点検と整備', vi: 'Kiểm tra và bảo dưỡng hàng ngày', id: 'Pemeriksaan dan pemeliharaan harian', en: 'Daily inspection and maintenance' }, description: { ja: '作業前チェックリストとメンテナンスの基本', vi: 'Danh sách kiểm tra trước khi làm việc và cơ bản về bảo dưỡng', id: 'Checklist sebelum bekerja dan dasar pemeliharaan', en: 'Pre-work checklist and maintenance basics' }, duration: 600 },
                ],
                totalDuration: 1860,
            },
        },
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
        return `${hours}時間${minutes > 0 ? minutes + '分' : ''}`
    }
    return `${minutes}分`
}

export default function CourseDetailPage() {
    const params = useParams()
    const sectorId = params.sectorId as string
    const courseId = params.courseId as string
    const locale = (params.locale as string) || 'ja'
    const lang = locale as 'ja' | 'vi' | 'id' | 'en'

    const sectorData = leaderCoursesData[sectorId]
    const course = sectorData?.courses[courseId]
    const colors = colorClasses[sectorId as keyof typeof colorClasses] || colorClasses.agriculture

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600">コースが見つかりませんでした</p>
            </div>
        )
    }

    const IconComponent = iconComponents[course.icon] || BookOpen
    const completedLessons = 0 // TODO: 実際の進捗データから取得
    const progressPercent = (completedLessons / course.lessons.length) * 100

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className={`bg-gradient-to-r ${colors.gradient} text-white py-10 px-4`}>
                <div className="max-w-4xl mx-auto">
                    <Link href={`/${locale}/sectors/${sectorId}/courses`} className="inline-flex items-center text-white/80 hover:text-white mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        コース一覧に戻る
                    </Link>

                    <div className="flex items-start gap-4">
                        <div className={`w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <Badge className="bg-white/20 text-white mb-2">
                                コース {course.order}
                            </Badge>
                            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                                {course.title[lang]}
                            </h1>
                            <p className="text-white/90 text-sm sm:text-base">
                                {course.description[lang]}
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6 bg-white/20 rounded-full p-1">
                        <div className="bg-white/10 rounded-full h-2">
                            <div
                                className="bg-white rounded-full h-2 transition-all"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-white/80">
                        <span>{completedLessons} / {course.lessons.length} レッスン完了</span>
                        <span>約 {formatDuration(course.totalDuration)}</span>
                    </div>
                </div>
            </div>

            {/* Lesson List */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <List className="h-5 w-5" />
                    レッスン一覧
                </h2>

                <div className="space-y-3">
                    {course.lessons.map((lesson, index) => {
                        const isCompleted = index < completedLessons
                        const isLocked = false // TODO: 有料コンテンツのロック

                        return (
                            <Card
                                key={lesson.id}
                                className={`overflow-hidden border-2 ${isCompleted ? 'border-green-300 bg-green-50/50' : 'hover:border-green-300'} transition-all`}
                            >
                                <CardContent className="p-0">
                                    <Link
                                        href={isLocked ? '#' : `/sectors/${sectorId}/courses/${courseId}/${lesson.id}`}
                                        className={isLocked ? 'cursor-not-allowed' : ''}
                                    >
                                        <div className="flex items-center p-4">
                                            {/* Lesson Number */}
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4 ${isCompleted
                                                    ? 'bg-green-600 text-white'
                                                    : isLocked
                                                        ? 'bg-gray-200 text-gray-400'
                                                        : `${colors.light} ${colors.text}`
                                                }`}>
                                                {isCompleted ? (
                                                    <CheckCircle className="h-5 w-5" />
                                                ) : isLocked ? (
                                                    <Lock className="h-4 w-4" />
                                                ) : (
                                                    <span className="font-bold">{index + 1}</span>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className={`font-medium ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
                                                    {lesson.title[lang]}
                                                </h3>
                                                <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">
                                                    {lesson.description[lang]}
                                                </p>
                                                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {formatDuration(lesson.duration)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Play className="h-3 w-3" />
                                                        動画
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Play Button */}
                                            {!isLocked && (
                                                <div className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0 ml-3`}>
                                                    <Play className="h-4 w-4 text-white ml-0.5" />
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Start Learning Button */}
                <div className="mt-8 sticky bottom-4">
                    <Link href={`/${locale}/sectors/${sectorId}/courses/${courseId}/${course.lessons[0].id}`}>
                        <Button className={`w-full ${colors.bg} hover:opacity-90 shadow-lg`} size="lg">
                            <Play className="h-5 w-5 mr-2" />
                            学習を始める
                        </Button>
                    </Link>
                </div>

                {/* Back Button */}
                <div className="mt-4">
                    <Link href={`/${locale}/sectors/${sectorId}/courses`}>
                        <Button variant="outline" className="w-full">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            コース一覧に戻る
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
