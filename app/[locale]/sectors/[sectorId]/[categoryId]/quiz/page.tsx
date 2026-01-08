'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle2, XCircle, Trophy, RotateCcw, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// クイズデータ（後でSupabaseから取得に変更予定）
const quizData: Record<string, {
    categoryName: { ja: string; vi: string; id: string; en: string }
    questions: Array<{
        id: string
        question: { ja: string; vi: string; id: string; en: string }
        options: { ja: string[]; vi: string[]; id: string[]; en: string[] }
        correctIndex: number
        explanation: { ja: string; vi: string; id: string; en: string }
    }>
}> = {
    'agri-general': {
        categoryName: { ja: '日本農業一般', vi: 'Nông nghiệp Nhật Bản', id: 'Pertanian Jepang Umum', en: 'Japanese Agriculture General' },
        questions: [
            {
                id: 'q1',
                question: { ja: '日本の食料自給率（カロリーベース）は約何%ですか？', vi: 'Tỷ lệ tự cung cấp lương thực của Nhật Bản là khoảng bao nhiêu %?', id: 'Berapa persen rasio swasembada pangan Jepang?', en: 'What is Japan\'s food self-sufficiency rate?' },
                options: {
                    ja: ['約38%', '約50%', '約65%', '約80%'],
                    vi: ['Khoảng 38%', 'Khoảng 50%', 'Khoảng 65%', 'Khoảng 80%'],
                    id: ['Sekitar 38%', 'Sekitar 50%', 'Sekitar 65%', 'Sekitar 80%'],
                    en: ['About 38%', 'About 50%', 'About 65%', 'About 80%']
                },
                correctIndex: 0,
                explanation: { ja: '日本の食料自給率（カロリーベース）は約38%で、先進国の中では低い水準です。', vi: 'Tỷ lệ tự cung cấp lương thực của Nhật Bản khoảng 38%, thấp trong số các nước phát triển.', id: 'Rasio swasembada pangan Jepang sekitar 38%, termasuk rendah di antara negara maju.', en: 'Japan\'s food self-sufficiency rate is about 38%, which is low among developed countries.' }
            },
            {
                id: 'q2',
                question: { ja: '日本の農業就業者数の傾向として正しいものは？', vi: 'Xu hướng đúng của số lượng lao động nông nghiệp Nhật Bản là?', id: 'Tren yang benar tentang jumlah pekerja pertanian Jepang?', en: 'What is the correct trend in agricultural workers in Japan?' },
                options: {
                    ja: ['増加傾向', '減少傾向', '横ばい', '急増傾向'],
                    vi: ['Xu hướng tăng', 'Xu hướng giảm', 'Ổn định', 'Tăng mạnh'],
                    id: ['Tren meningkat', 'Tren menurun', 'Stabil', 'Meningkat tajam'],
                    en: ['Increasing', 'Decreasing', 'Stable', 'Rapidly increasing']
                },
                correctIndex: 1,
                explanation: { ja: '日本の農業就業者数は年々減少傾向にあり、高齢化も進んでいます。', vi: 'Số lượng lao động nông nghiệp Nhật Bản đang giảm dần mỗi năm.', id: 'Jumlah pekerja pertanian Jepang terus menurun setiap tahun.', en: 'The number of agricultural workers in Japan is decreasing year by year.' }
            },
            {
                id: 'q3',
                question: { ja: '日本で最も生産量が多い穀物は？', vi: 'Loại ngũ cốc được sản xuất nhiều nhất ở Nhật Bản?', id: 'Biji-bijian yang paling banyak diproduksi di Jepang?', en: 'What is the most produced grain in Japan?' },
                options: {
                    ja: ['小麦', '米', '大豆', 'とうもろこし'],
                    vi: ['Lúa mì', 'Gạo', 'Đậu nành', 'Ngô'],
                    id: ['Gandum', 'Beras', 'Kedelai', 'Jagung'],
                    en: ['Wheat', 'Rice', 'Soy', 'Corn']
                },
                correctIndex: 1,
                explanation: { ja: '日本では米が最も多く生産されており、主食として重要な位置を占めています。', vi: 'Gạo được sản xuất nhiều nhất ở Nhật Bản và là lương thực chính quan trọng.', id: 'Beras adalah yang paling banyak diproduksi di Jepang dan merupakan makanan pokok penting.', en: 'Rice is the most produced grain in Japan and is the staple food.' }
            },
            {
                id: 'q4',
                question: { ja: '日本の農業政策で「6次産業化」とは何を指しますか？', vi: '"Công nghiệp hóa sơ 6" trong chính sách nông nghiệp Nhật Bản là gì?', id: '"Industrialisasi ke-6" dalam kebijakan pertanian Jepang adalah?', en: 'What does "6th industrialization" mean in Japanese agricultural policy?' },
                options: {
                    ja: ['6つの県で農業を推進すること', '農業の生産・加工・販売を一体化すること', '6種類の作物を育てること', '6年ごとに政策を見直すこと'],
                    vi: ['Thúc đẩy nông nghiệp ở 6 tỉnh', 'Kết hợp sản xuất, chế biến và bán hàng', 'Trồng 6 loại cây', 'Xem xét lại chính sách 6 năm một lần'],
                    id: ['Promosi pertanian di 6 prefektur', 'Integrasi produksi, pengolahan, dan penjualan', 'Menanam 6 jenis tanaman', 'Review kebijakan setiap 6 tahun'],
                    en: ['Promoting agriculture in 6 prefectures', 'Integrating production, processing, and sales', 'Growing 6 types of crops', 'Reviewing policy every 6 years']
                },
                correctIndex: 1,
                explanation: { ja: '6次産業化とは、1次（生産）×2次（加工）×3次（販売）=6次として、農業の付加価値を高める取り組みです。', vi: 'Công nghiệp hóa sơ 6 = 1 (sản xuất) × 2 (chế biến) × 3 (bán hàng) = 6, nâng cao giá trị gia tăng.', id: 'Industrialisasi ke-6 = 1 (produksi) × 2 (pengolahan) × 3 (penjualan) = 6, meningkatkan nilai tambah.', en: '6th industrialization = 1 (production) × 2 (processing) × 3 (sales) = 6, adding value to agriculture.' }
            },
            {
                id: 'q5',
                question: { ja: '日本の農地面積の傾向は？', vi: 'Xu hướng diện tích đất nông nghiệp của Nhật Bản?', id: 'Tren luas lahan pertanian Jepang?', en: 'What is the trend in Japan\'s agricultural land area?' },
                options: {
                    ja: ['増加している', '減少している', '変化していない', '倍増している'],
                    vi: ['Đang tăng', 'Đang giảm', 'Không thay đổi', 'Đang tăng gấp đôi'],
                    id: ['Meningkat', 'Menurun', 'Tidak berubah', 'Meningkat dua kali'],
                    en: ['Increasing', 'Decreasing', 'No change', 'Doubling']
                },
                correctIndex: 1,
                explanation: { ja: '日本の農地面積は年々減少しており、耕作放棄地の増加が課題となっています。', vi: 'Diện tích đất nông nghiệp Nhật Bản đang giảm hàng năm.', id: 'Luas lahan pertanian Jepang terus menurun setiap tahun.', en: 'Japan\'s agricultural land area is decreasing year by year.' }
            },
        ]
    },
    // 他のカテゴリも同様に追加可能
}

const colorClasses = {
    green: { bg: 'bg-green-600', text: 'text-green-600', light: 'bg-green-50', gradient: 'from-green-600 to-emerald-600' },
}

export default function QuizPage() {
    const params = useParams()
    const sectorId = params.sectorId as string
    const categoryId = params.categoryId as string
    const locale = (params.locale as string) || 'ja'
    const lang = locale as 'ja' | 'vi' | 'id' | 'en'

    const quiz = quizData[categoryId] || quizData['agri-general']
    const colors = colorClasses.green

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [showResult, setShowResult] = useState(false)
    const [answers, setAnswers] = useState<number[]>([])
    const [isFinished, setIsFinished] = useState(false)

    const question = quiz.questions[currentQuestion]
    const totalQuestions = quiz.questions.length
    const isCorrect = selectedAnswer === question.correctIndex

    const handleSelectAnswer = (index: number) => {
        if (showResult) return
        setSelectedAnswer(index)
    }

    const handleConfirm = () => {
        if (selectedAnswer === null) return
        setShowResult(true)
        setAnswers([...answers, selectedAnswer])
    }

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1)
            setSelectedAnswer(null)
            setShowResult(false)
        } else {
            setIsFinished(true)
        }
    }

    const handleRetry = () => {
        setCurrentQuestion(0)
        setSelectedAnswer(null)
        setShowResult(false)
        setAnswers([])
        setIsFinished(false)
    }

    const correctCount = answers.filter((ans, i) => ans === quiz.questions[i].correctIndex).length
    const score = Math.round((correctCount / totalQuestions) * 100)

    if (isFinished) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="max-w-2xl mx-auto">
                    <Card className="border-2 overflow-hidden">
                        <div className={`bg-gradient-to-r ${colors.gradient} text-white p-8 text-center`}>
                            <Trophy className="h-16 w-16 mx-auto mb-4" />
                            <h1 className="text-3xl font-bold mb-2">テスト完了！</h1>
                            <p className="text-white/80">{quiz.categoryName[lang]}</p>
                        </div>
                        <CardContent className="p-8 text-center">
                            <div className="mb-8">
                                <div className="text-6xl font-bold mb-2" style={{ color: score >= 80 ? '#16a34a' : score >= 60 ? '#ca8a04' : '#dc2626' }}>
                                    {score}%
                                </div>
                                <p className="text-gray-600">
                                    {correctCount} / {totalQuestions} 問正解
                                </p>
                            </div>

                            <div className="space-y-2 mb-8">
                                {quiz.questions.map((q, i) => (
                                    <div key={q.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-sm">問題 {i + 1}</span>
                                        {answers[i] === q.correctIndex ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-red-500" />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button onClick={handleRetry} variant="outline" className="flex items-center">
                                    <RotateCcw className="h-4 w-4 mr-2" />
                                    もう一度挑戦
                                </Button>
                                <Button asChild className={colors.bg}>
                                    <Link href={`/sectors/${sectorId}/${categoryId}`}>
                                        <ChevronRight className="h-4 w-4 mr-2" />
                                        章に戻る
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className={`bg-gradient-to-r ${colors.gradient} text-white py-6 px-4`}>
                <div className="max-w-2xl mx-auto">
                    <Link href={`/sectors/${sectorId}/${categoryId}`} className="inline-flex items-center text-white/80 hover:text-white mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        章に戻る
                    </Link>
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold">章末テスト</h1>
                        <Badge className="bg-white/20">
                            {currentQuestion + 1} / {totalQuestions}
                        </Badge>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-4 w-full bg-white/20 rounded-full h-2">
                        <div
                            className="bg-white h-2 rounded-full transition-all"
                            style={{ width: `${((currentQuestion + (showResult ? 1 : 0)) / totalQuestions) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-8">
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle className="text-lg">
                            問題 {currentQuestion + 1}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg mb-6 font-medium">
                            {question.question[lang]}
                        </p>

                        <div className="space-y-3 mb-6">
                            {question.options[lang].map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelectAnswer(index)}
                                    disabled={showResult}
                                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${showResult
                                            ? index === question.correctIndex
                                                ? 'border-green-600 bg-green-50'
                                                : index === selectedAnswer
                                                    ? 'border-red-500 bg-red-50'
                                                    : 'border-gray-200'
                                            : selectedAnswer === index
                                                ? `${colors.text} border-green-600 bg-green-50`
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${showResult
                                                ? index === question.correctIndex
                                                    ? 'bg-green-600 text-white'
                                                    : index === selectedAnswer
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-gray-100'
                                                : selectedAnswer === index
                                                    ? `${colors.bg} text-white`
                                                    : 'bg-gray-100'
                                            }`}>
                                            {String.fromCharCode(65 + index)}
                                        </div>
                                        <span>{option}</span>
                                        {showResult && index === question.correctIndex && (
                                            <CheckCircle2 className="h-5 w-5 text-green-600 ml-auto" />
                                        )}
                                        {showResult && index === selectedAnswer && index !== question.correctIndex && (
                                            <XCircle className="h-5 w-5 text-red-500 ml-auto" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {showResult && (
                            <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    {isCorrect ? (
                                        <>
                                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                                            <span className="font-bold text-green-700">正解！</span>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="h-5 w-5 text-red-500" />
                                            <span className="font-bold text-red-600">不正解</span>
                                        </>
                                    )}
                                </div>
                                <p className="text-gray-700 text-sm">
                                    {question.explanation[lang]}
                                </p>
                            </div>
                        )}

                        <div className="flex justify-end">
                            {!showResult ? (
                                <Button
                                    onClick={handleConfirm}
                                    disabled={selectedAnswer === null}
                                    className={colors.bg}
                                >
                                    回答を確認
                                </Button>
                            ) : (
                                <Button onClick={handleNext} className={colors.bg}>
                                    {currentQuestion < totalQuestions - 1 ? '次の問題' : '結果を見る'}
                                    <ChevronRight className="h-4 w-4 ml-2" />
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
