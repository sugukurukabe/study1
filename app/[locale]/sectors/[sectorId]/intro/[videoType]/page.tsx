'use client'

import { ArrowLeft, ChevronRight, Clock, FileText, Globe, Play, Check, BookOpen, List } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'

// 動画データ（Cloudflare Stream Video IDs）
const videoData: Record<string, Record<string, {
    title: { ja: string; vi: string; id: string; en: string }
    description: { ja: string; vi: string; id: string; en: string }
    videoId: { ja: string; vi?: string; id?: string; en?: string }
    duration: number
    nextVideo?: string
    order: number
}>> = {
    agriculture: {
        overview: {
            title: {
                ja: '試験の概要',
                vi: 'Tổng quan kỳ thi',
                id: 'Gambaran Ujian',
                en: 'Exam Overview'
            },
            description: {
                ja: '試験内容・合格基準・試験時間を詳しく解説',
                vi: 'Giải thích chi tiết về nội dung, tiêu chí đạt và thời gian kỳ thi.',
                id: 'Penjelasan detail tentang isi, kriteria lulus, dan waktu ujian.',
                en: 'Detailed explanation of exam content, passing criteria, and time.'
            },
            videoId: {
                ja: '98b680e43c107cc747c55c3eb19bdac9',
                id: 'fdcdf1cc0f2672e5469a4b0c8f2bb6ea',
            },
            duration: 600,
            nextVideo: 'flow',
            order: 1,
        },
        flow: {
            title: {
                ja: '受験の流れ',
                vi: 'Quy trình thi',
                id: 'Proses Ujian',
                en: 'Exam Process'
            },
            description: {
                ja: '申し込みから合格証発行まで5ステップで解説',
                vi: 'Giải thích 5 bước từ đăng ký đến cấp chứng chỉ.',
                id: 'Penjelasan 5 langkah dari pendaftaran hingga penerbitan sertifikat.',
                en: '5 steps from application to certificate issuance.'
            },
            videoId: {
                ja: '98b680e43c107cc747c55c3eb19bdac9',
            },
            duration: 480,
            nextVideo: 'business',
            order: 2,
        },
        business: {
            title: {
                ja: '事業者向けガイド',
                vi: 'Hướng dẫn cho doanh nghiệp',
                id: 'Panduan untuk Bisnis',
                en: 'Business Guide'
            },
            description: {
                ja: '受入れ手続きや注意点を解説',
                vi: 'Giải thích thủ tục tiếp nhận và lưu ý.',
                id: 'Penjelasan prosedur penerimaan dan catatan penting.',
                en: 'Explanation of acceptance procedures and precautions.'
            },
            videoId: {
                ja: '389694a40d01509e9604534acc5137f1',
            },
            duration: 900,
            order: 3,
        },
    },
    livestock: {
        overview: {
            title: {
                ja: '試験の内容　受験の流れ',
                vi: 'Nội dung kỳ thi và quy trình',
                id: 'Isi ujian dan prosesnya',
                en: 'Exam Content and Process'
            },
            description: {
                ja: '畜産分野の特定技能2号試験の内容と受験の流れを解説します。',
                vi: 'Giải thích về nội dung kỳ thi và quy trình thi kỹ năng đặc định số 2 ngành Chăn nuôi.',
                id: 'Penjelasan tentang isi ujian dan proses ujian keterampilan khusus tingkat 2 bidang Peternakan.',
                en: 'Explanation of the exam content and process for Specified Skilled Worker Type 2 in Livestock.'
            },
            videoId: {
                ja: '7a9e093bae25f792a9e1771889b47526',
                id: '165133b59f1f82da0316b14d0a48cf5a',
            },
            duration: 600,
            order: 1,
        },
    },
}

const sectorNames: Record<string, { ja: string; vi: string; id: string; en: string }> = {
    agriculture: { ja: '農業', vi: 'Nông nghiệp', id: 'Pertanian', en: 'Agriculture' },
    livestock: { ja: '畜産業', vi: 'Chăn nuôi', id: 'Peternakan', en: 'Livestock' },
}

const languageOptions = [
    { code: 'ja', name: '日本語', flag: '🇯🇵', nativeName: '日本語' },
    { code: 'id', name: 'Indonesian', flag: '🇮🇩', nativeName: 'Bahasa Indonesia' },
    { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', nativeName: 'Tiếng Việt' },
]

const colorClasses = {
    agriculture: { bg: 'bg-green-600', gradient: 'from-green-500 to-emerald-600', light: 'bg-green-50', text: 'text-green-600', border: 'border-green-600' },
    livestock: { bg: 'bg-amber-600', gradient: 'from-amber-500 to-orange-600', light: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-600' },
}

function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    return `${minutes}分`
}

export default function VideoPlayerPage() {
    const params = useParams()
    const sectorId = params.sectorId as string
    const videoType = params.videoType as string
    const locale = (params.locale as string) || 'ja'
    const lang = locale as 'ja' | 'vi' | 'id' | 'en'

    const [showPlaylist, setShowPlaylist] = useState(false)

    const sectorVideos = videoData[sectorId]
    const video = sectorVideos?.[videoType]
    const colors = colorClasses[sectorId as keyof typeof colorClasses] || colorClasses.agriculture
    const sectorName = sectorNames[sectorId]?.[lang] || '農業'

    if (!video) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600">動画が見つかりませんでした</p>
            </div>
        )
    }

    const currentVideoId = video.videoId[lang] || video.videoId.ja
    const availableLanguages = languageOptions.filter(l => video.videoId[l.code as keyof typeof video.videoId])
    const allVideos = Object.entries(sectorVideos)
        .map(([key, v]) => ({ key, ...v }))
        .sort((a, b) => a.order - b.order)

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Compact Header */}
            <header className="bg-white border-b sticky top-0 z-20">
                <div className="flex items-center justify-between px-3 py-2">
                    <Link href={`/${locale}/sectors/${sectorId}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="h-5 w-5" />
                        <span className="hidden sm:inline text-sm">{sectorName}</span>
                    </Link>

                    {/* Language Selector - Always Visible */}
                    <div className="flex items-center gap-1">
                        {availableLanguages.map((l) => (
                            <Link key={l.code} href={`/${l.code}/sectors/${sectorId}/intro/${videoType}`}>
                                <Button
                                    variant={lang === l.code ? 'default' : 'ghost'}
                                    size="sm"
                                    className={`px-2 sm:px-3 ${lang === l.code ? colors.bg : ''}`}
                                >
                                    <span className="text-lg mr-1">{l.flag}</span>
                                    <span className="hidden sm:inline text-xs">{l.nativeName}</span>
                                </Button>
                            </Link>
                        ))}
                    </div>

                    {/* Playlist Toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPlaylist(!showPlaylist)}
                        className="sm:hidden"
                    >
                        <List className="h-5 w-5" />
                    </Button>
                </div>
            </header>

            <div className="flex-1 flex flex-col lg:flex-row">
                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Video Player - Udemy Style (16:9 but not full width on desktop) */}
                    <div className="bg-black">
                        <div className="max-w-4xl mx-auto">
                            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                                <iframe
                                    src={`https://customer-7h7i3oj7pv51qq1p.cloudflarestream.com/${currentVideoId}/iframe?poster=https%3A%2F%2Fcustomer-7h7i3oj7pv51qq1p.cloudflarestream.com%2F${currentVideoId}%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600`}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 'none',
                                    }}
                                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>

                    {/* Video Info - Below Video */}
                    <div className="p-4 border-b">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="outline" className={`${colors.text} ${colors.border}`}>
                                            {video.order} / {allVideos.length}
                                        </Badge>
                                        <span className="text-sm text-gray-500 flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {formatDuration(video.duration)}
                                        </span>
                                    </div>
                                    <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                                        {video.title[lang]}
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                        {video.description[lang]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next/Previous Buttons - Mobile friendly */}
                    <div className="p-4 bg-gray-50">
                        <div className="max-w-4xl mx-auto flex gap-3">
                            {video.nextVideo && sectorVideos[video.nextVideo] && (
                                <Link href={`/${locale}/sectors/${sectorId}/intro/${video.nextVideo}`} className="flex-1">
                                    <Button className={`w-full ${colors.bg} hover:opacity-90`} size="lg">
                                        次へ: {sectorVideos[video.nextVideo].title[lang]}
                                        <ChevronRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </Link>
                            )}
                            {!video.nextVideo && (
                                <Link href={`/${locale}/sectors/${sectorId}`} className="flex-1">
                                    <Button className={`w-full ${colors.bg} hover:opacity-90`} size="lg">
                                        学習を始める
                                        <BookOpen className="h-4 w-4 ml-2" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Playlist (Expandable) */}
                    {showPlaylist && (
                        <div className="lg:hidden border-t">
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <List className="h-4 w-4" />
                                    コンテンツ一覧
                                </h3>
                                <div className="space-y-2">
                                    {allVideos.map((v) => (
                                        <Link key={v.key} href={`/${locale}/sectors/${sectorId}/intro/${v.key}`}>
                                            <div className={`p-3 rounded-lg border ${v.key === videoType ? `${colors.light} ${colors.border} border-2` : 'hover:bg-gray-50'}`}>
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${v.key === videoType ? colors.bg + ' text-white' : 'bg-gray-100'}`}>
                                                        {v.key === videoType ? <Play className="h-4 w-4" /> : v.order}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-sm truncate">{v.title[lang]}</p>
                                                        <p className="text-xs text-gray-500">{formatDuration(v.duration)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Playlist - Desktop */}
                <div className="hidden lg:block w-80 border-l bg-gray-50 overflow-y-auto">
                    <div className="p-4 border-b bg-white sticky top-0">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            {sectorName}試験ガイド
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            {allVideos.length}本の動画
                        </p>
                    </div>
                    <div className="p-3 space-y-2">
                        {allVideos.map((v) => (
                            <Link key={v.key} href={`/sectors/${sectorId}/intro/${v.key}`}>
                                <div className={`p-3 rounded-lg transition-all ${v.key === videoType ? `${colors.light} ${colors.border} border-2` : 'bg-white border hover:shadow-md'}`}>
                                    <div className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${v.key === videoType ? colors.bg + ' text-white' : 'bg-gray-100'}`}>
                                            {v.key === videoType ? <Play className="h-4 w-4" /> : v.order}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-medium text-sm ${v.key === videoType ? colors.text : ''}`}>
                                                {v.title[lang]}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">{formatDuration(v.duration)}</p>
                                            <p className="text-xs text-gray-400 mt-1 line-clamp-2">{v.description[lang]}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Back to Learning */}
                    <div className="p-4 border-t bg-white sticky bottom-0">
                        <Link href={`/${locale}/sectors/${sectorId}`}>
                            <Button variant="outline" className="w-full">
                                <FileText className="h-4 w-4 mr-2" />
                                学習コンテンツ一覧
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
