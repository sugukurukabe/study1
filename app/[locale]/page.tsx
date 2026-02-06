import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Video, Headphones, FileText, Trophy, Users, Globe, Zap, Award, Target, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { getLocale, getTranslations } from 'next-intl/server'
import { FadeInUp, SlideInLeft, SlideInRight, ScaleIn, MotionDiv } from '@/components/ui/AnimatedSection'
import LandingVideoPlayer from '@/components/learning/LandingVideoPlayer'
import { HoverCard } from '@/components/ui/HoverCard'
import { FloatingElement, ParticleField, GlowBreath } from '@/components/ui/FloatingElement'
import { EducationalOrganizationSchema, WebSiteSchema } from '@/components/StructuredData'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  
  const metadata = {
    ja: {
      title: '特定技能2号試験対策 | Sugu-Study - 外国人労働者向け学習プラットフォーム',
      description: '特定技能2号試験に合格するための完全学習プラットフォーム。動画・音声・テキストで効率的に学習。農業・畜産業・漁業など11分野対応。日本語・インドネシア語・ベトナム語・英語で学習可能。',
      keywords: '特定技能2号, 試験対策, 外国人労働者, 在留資格, 農業, 畜産業, 漁業, オンライン学習, インドネシア語, ベトナム語',
    },
    id: {
      title: 'Persiapan Ujian Tokutei Ginou 2 | Sugu-Study - Platform Belajar untuk Pekerja Asing',
      description: 'Platform pembelajaran lengkap untuk lulus ujian Tokutei Ginou 2. Belajar efisien dengan video, audio, dan teks. Tersedia untuk 11 bidang: pertanian, peternakan, perikanan, dll. Belajar dalam bahasa Indonesia, Jepang, Vietnam, dan Inggris.',
      keywords: 'Tokutei Ginou 2, persiapan ujian, pekerja asing Jepang, visa kerja, pertanian, peternakan, belajar online, bahasa Indonesia',
    },
    vi: {
      title: 'Luyện thi Tokutei Ginou 2 | Sugu-Study - Nền tảng học tập cho lao động nước ngoài',
      description: 'Nền tảng học tập hoàn chỉnh để đỗ kỳ thi Tokutei Ginou 2. Học hiệu quả với video, audio và văn bản. Hỗ trợ 11 lĩnh vực: nông nghiệp, chăn nuôi, ngư nghiệp, v.v. Học bằng tiếng Việt, Nhật, Indonesia và Anh.',
      keywords: 'Tokutei Ginou 2, luyện thi, lao động nước ngoài Nhật Bản, visa lao động, nông nghiệp, chăn nuôi, học online, tiếng Việt',
    },
    en: {
      title: 'Tokutei Ginou 2 Exam Prep | Sugu-Study - Learning Platform for Foreign Workers',
      description: 'Complete learning platform to pass the Tokutei Ginou 2 exam. Study efficiently with videos, audio, and text. Available for 11 fields: agriculture, livestock, fishery, etc. Learn in English, Japanese, Indonesian, and Vietnamese.',
      keywords: 'Tokutei Ginou 2, exam preparation, foreign workers Japan, work visa, agriculture, livestock, online learning, multilingual',
    },
  }

  const data = metadata[locale as keyof typeof metadata] || metadata.ja

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://sugu-study.com/${locale}`,
      siteName: 'Sugu-Study',
      locale: locale,
      type: 'website',
      images: [
        {
          url: 'https://sugu-study.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Sugu-Study - Tokutei Ginou 2 Learning Platform',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: ['https://sugu-study.com/og-image.jpg'],
    },
    alternates: {
      canonical: `https://sugu-study.com/${locale}`,
      languages: {
        'ja': 'https://sugu-study.com/ja',
        'id': 'https://sugu-study.com/id',
        'vi': 'https://sugu-study.com/vi',
        'en': 'https://sugu-study.com/en',
      },
    },
  }
}

// Cloudflare Stream 動画ID（言語別）
const VIDEO_DATA: Record<string, {
  videoId: string
  title: string
  subtitle: string
}> = {
  ja: {
    videoId: 'f2f7a67b989a45dd6b850b8462623c40',
    title: '特定技能2号 完全ガイド',
    subtitle: '3分でわかる特定技能2号のメリットと取得方法',
  },
  id: {
    videoId: 'fdf5466f16a824fe1fce0ddf6996a99d',
    title: 'Panduan Lengkap Tokutei Ginou 2',
    subtitle: 'Pahami keuntungan dan cara mendapatkan Tokutei Ginou 2 dalam 3 menit',
  },
  vi: {
    videoId: 'fdf5466f16a824fe1fce0ddf6996a99d',
    title: 'Hướng dẫn đầy đủ về Tokutei Ginou 2',
    subtitle: 'Tìm hiểu lợi ích và cách lấy Tokutei Ginou 2 trong 3 phút',
  },
  en: {
    videoId: 'f2f7a67b989a45dd6b850b8462623c40',
    title: 'Complete Guide to Tokutei Ginou 2',
    subtitle: 'Understand the benefits and how to obtain Tokutei Ginou 2 in 3 minutes',
  },
}

// セクターデータ
const sectors = [
  { slug: 'agriculture', ja: '農業', id: 'Pertanian', vi: 'Nông nghiệp', en: 'Agriculture', color: 'green', icon: '🌾', active: true },
  { slug: 'livestock', ja: '畜産業', id: 'Peternakan', vi: 'Chăn nuôi', en: 'Livestock', color: 'amber', icon: '🐄', active: true },
  { slug: 'fishery', ja: '漁業', id: 'Perikanan', vi: 'Ngư nghiệp', en: 'Fishery', icon: '🐟' },
  { slug: 'construction', ja: '建設', id: 'Konstruksi', vi: 'Xây dựng', en: 'Construction', icon: '🏗️' },
  { slug: 'shipbuilding', ja: '造船', id: 'Pembuatan Kapal', vi: 'Đóng tàu', en: 'Shipbuilding', icon: '🚢' },
  { slug: 'automobile', ja: '自動車整備', id: 'Perawatan Mobil', vi: 'Sửa ô tô', en: 'Automobile', icon: '🔧' },
  { slug: 'aviation', ja: '航空', id: 'Penerbangan', vi: 'Hàng không', en: 'Aviation', icon: '✈️' },
  { slug: 'accommodation', ja: '宿泊業', id: 'Perhotelan', vi: 'Lưu trú', en: 'Accommodation', icon: '🏨' },
  { slug: 'foodManufacturing', ja: '食品製造', id: 'Manufaktur Makanan', vi: 'Chế biến thực phẩm', en: 'Food Manufacturing', icon: '🍱' },
  { slug: 'foodService', ja: '外食', id: 'Restoran', vi: 'Nhà hàng', en: 'Food Service', icon: '🍽️' },
  { slug: 'nursing', ja: '介護', id: 'Keperawatan', vi: 'Chăm sóc', en: 'Nursing', icon: '🩺' },
]

function getSectorName(id: string, locale: string): string {
  const sector = sectors.find(s => s.slug === id)
  if (!sector) return ''
  return sector[locale as keyof typeof sector] as string || sector.ja

}

function getSectorColor(id: string): string {
  const sector = sectors.find(s => s.slug === id)
  if (!sector) return 'gray'
  return sector.color || 'gray'
}

export default async function LandingPage() {
  const locale = await getLocale()
  const t = await getTranslations('landing')

  // 構造化データ
  const structuredData = (
    <>
      <EducationalOrganizationSchema />
      <WebSiteSchema />
    </>
  )
  const lang = locale as 'ja' | 'vi' | 'id' | 'en'

  // 現在の言語の動画データ
  const videoData = VIDEO_DATA[lang] || VIDEO_DATA['ja']

  return (
    <>
      {structuredData}
      <div className="min-h-screen bg-white">
        {/* Header Navigation */}
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-indigo-600" />
                <span className="text-xl font-bold text-gray-900">Sugu-Study</span>
              </div>
              <div className="flex items-center space-x-4">
                <LanguageSwitcher currentLocale={locale} variant="default" />
                <Link href={`/${locale}/login`}>
                  <Button variant="ghost" size="sm">
                    {t('auth.login')}
                  </Button>
                </Link>
                <Link href={`/${locale}/signup`}>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    {t('auth.signup')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section - Clean and Professional */}
        <section className="bg-white py-16 md:py-24 px-4">
          <div className="max-w-6xl mx-auto text-center">

        <div className="max-w-6xl mx-auto text-center pt-8 relative z-10">
          {/* Badges - FadeInUp */}
          <FadeInUp delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <MotionDiv
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-amber-400 text-amber-900 text-sm px-4 py-2 font-bold rounded-full flex items-center"
              >
                <Award className="w-4 h-4 mr-1" />
                {t('badge1')}
              </MotionDiv>
              <MotionDiv
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full"
              >
                {t('badge2')}
              </MotionDiv>
            </div>
          </FadeInUp>

            <FadeInUp delay={0.1}>
              <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Award className="w-4 h-4" />
                <span>{t('badge1')}</span>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {t('heroTitle')}
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {t('heroDescription')}
              </p>
            </FadeInUp>

            <FadeInUp delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-6 h-auto">
                  <Link href={`/${locale}/signup`}>
                    {t('ctaSignup')}
                  </Link>
                </Button>
              </HoverCard>
            </div>
          </FadeInUp>

          {/* Feature Pills - Slide from sides */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <SlideInLeft delay={0.8}>
              <FloatingElement amplitude={5} duration={2}>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>{t('feature1')}</span>
                </div>
              </FloatingElement>
            </SlideInLeft>
            <FadeInUp delay={0.9}>
              <FloatingElement amplitude={5} duration={2.5} delay={0.5}>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>{t('feature2')}</span>
                </div>
              </FloatingElement>
            </FadeInUp>
            <SlideInRight delay={1}>
              <FloatingElement amplitude={5} duration={3} delay={1}>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>{t('feature3')}</span>
                </div>
              </FloatingElement>
            </SlideInRight>
          </div>
        </div>

        {/* -wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <FadeInUp>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-amber-100 text-amber-700 text-sm px-4 py-2">
                <Video className="w-4 h-4 mr-1 inline" />
                {t('videoSection.badge')}
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                {t('videoSection.title')}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                {t('videoSection.description')}
              </p>
            </div>
          </FadeInUp>

          {/* Video Player */}
          <ScaleIn delay={0.2}>
            <LandingVideoPlayer
              videoId={videoData.videoId}
              title={videoData.title}
              subtitle={videoData.subtitle}
            />
          </ScaleIn>

          {/* Benefits Cards - Staggered */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <FadeInUp delay={0.3}>
              <HoverCard scale={1.03} glowColor="rgba(251, 191, 36, 0.3)" className="h-full">
                <Card className="h-full bg-white shadow-lg border-t-4 border-amber-400">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                    <h4 className="font-bold text-xl mb-3">{t('videoSection.benefit1Title')}</h4>
                    <p className="text-gray-600">{t('videoSection.benefit1Desc')}</p>
                  </CardContent>
                </Card>
              </HoverCard>
            </FadeInUp>
            <FadeInUp delay={0.5}>
              <HoverCard scale={1.03} glowColor="rgba(79, 70, 229, 0.3)" className="h-full">
                <Card className="h-full bg-white shadow-lg border-t-4 border-indigo-400">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-4">🔄</div>
                    <h4 className="font-bold text-xl mb-3">{t('videoSection.benefit2Title')}</h4>
                    <p className="text-gray-600">{t('videoSection.benefit2Desc')}</p>
                  </CardContent>
                </Card>
              </HoverCard>
            </FadeInUp>
            <FadeInUp delay={0.7}>
              <HoverCard scale={1.03} glowColor="rgba(168, 85, 247, 0.3)" className="h-full">
                <Card className="h-full bg-white shadow-lg border-t-4 border-purple-400">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-4">📈</div>
                    <h4 className="font-bold text-xl mb-3">{t('videoSection.benefit3Title')}</h4>
                    <p className="text-gray-600">{t('videoSection.benefit3Desc')}</p>
                  </CardContent>
                </Card>
              </HoverCard>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Sector Selection */}
      <section id="sectors" className="py-20 px-4 bg-white scroll-mt-4">
        <div className="max-w-6xl mx-auto">
          <FadeInUp>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-indigo-100 text-indigo-700 text-sm px-4 py-2">
                {t('sectors.badge')}
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
                {t('sectors.title')}
              </h2>
              <p className="text-gray-600 text-lg">
                {t('sectors.description')}
              </p>
            </div>
          </FadeInUp>

          {/* Sector Grid - Staggered */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {sectors.map((sector, index) => (
              <FadeInUp key={sector.slug} delay={index * 0.05}>
                {sector.active ? (
                  <Link href={`/sectors/${sector.slug}`}>
                    <HoverCard
                      scale={1.05}
                      glowColor={sector.color === 'green' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(245, 158, 11, 0.3)'}
                      className="h-full"
                    >
                      <div className={`
                        ${sector.color === 'green' ? 'bg-green-50 hover:bg-green-100 border-green-200' : 'bg-amber-50 hover:bg-amber-100 border-amber-200'}
                        rounded-2xl p-4 text-center border-2 h-full flex flex-col items-center justify-center
                      `}>
                        <span className="text-4xl mb-2 block">{sector.icon}</span>
                        <span className={`text-sm font-medium ${sector.color === 'green' ? 'text-green-700' : 'text-amber-700'}`}>
                          {getSectorName(sector.slug, lang)}
                        </span>
                      </div>
                    </HoverCard>
                  </Link>
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-4 text-center opacity-60 cursor-not-allowed h-full flex flex-col items-center justify-center">
                    <span className="text-4xl mb-2 block">{sector.icon}</span>
                    <span className="text-sm font-medium text-gray-500">{getSectorName(sector.slug, lang)}</span>
                    <span className="text-[10px] text-gray-400 mt-1">{t('sectors.comingSoon')}</span>
                  </div>
                )}
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Styles */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <FadeInUp>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              {t('learningStyles.title')}
            </h2>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeInUp delay={0.1}>
              <HoverCard scale={1.03} glowColor="rgba(79, 70, 229, 0.3)">
                <Card className="border-2 hover:shadow-xl transition-all bg-white">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto bg-indigo-100 rounded-2xl flex items-center justify-center mb-4">
                      <Video className="h-10 w-10 text-indigo-600" />
                    </div>
                    <CardTitle className="text-xl">{t('learningStyles.videoTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{t('learningStyles.videoDesc')}</p>
                  </CardContent>
                </Card>
              </HoverCard>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <HoverCard scale={1.03} glowColor="rgba(168, 85, 247, 0.3)">
                <Card className="border-2 hover:shadow-xl transition-all bg-white">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                      <Headphones className="h-10 w-10 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">{t('learningStyles.audioTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{t('learningStyles.audioDesc')}</p>
                  </CardContent>
                </Card>
              </HoverCard>
            </FadeInUp>

            <FadeInUp delay={0.5}>
              <HoverCard scale={1.03} glowColor="rgba(236, 72, 153, 0.3)">
                <Card className="border-2 hover:shadow-xl transition-all bg-white">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto bg-pink-100 rounded-2xl flex items-center justify-center mb-4">
                      <FileText className="h-10 w-10 text-pink-600" />
                    </div>
                    <CardTitle className="text-xl">{t('learningStyles.textTitle')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{t('learningStyles.textDesc')}</p>
                  </CardContent>
                </Card>
              </HoverCard>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeInUp>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              {t('features.title')}
            </h2>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <SlideInLeft delay={0.1}>
              <HoverCard scale={1.02}>
                <div className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
                      <Globe className="h-8 w-8 text-indigo-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{t('features.multiLanguageTitle')}</h3>
                    <p className="text-gray-600">{t('features.multiLanguageDesc')}</p>
                  </div>
                </div>
              </HoverCard>
            </SlideInLeft>

            <SlideInRight delay={0.2}>
              <HoverCard scale={1.02}>
                <div className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                      <Zap className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{t('features.offlineTitle')}</h3>
                    <p className="text-gray-600">{t('features.offlineDesc')}</p>
                  </div>
                </div>
              </HoverCard>
            </SlideInRight>

            <SlideInLeft delay={0.3}>
              <HoverCard scale={1.02}>
                <div className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center">
                      <Trophy className="h-8 w-8 text-amber-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{t('features.gamificationTitle')}</h3>
                    <p className="text-gray-600">{t('features.gamificationDesc')}</p>
                  </div>
                </div>
              </HoverCard>
            </SlideInLeft>

            <SlideInRight delay={0.4}>
              <HoverCard scale={1.02}>
                <div className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center">
                      <Users className="h-8 w-8 text-pink-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{t('features.referralTitle')}</h3>
                    <p className="text-gray-600">{t('features.referralDesc')}</p>
                  </div>
                </div>
              </HoverCard>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <FadeInUp>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              {t('tiers.title')}
            </h2>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeInUp delay={0.1}>
              <HoverCard scale={1.02}>
                <Card className="border-2 bg-white">
                  <CardHeader className="bg-gray-100 text-center">
                    <Badge className="mb-2 mx-auto w-fit">{t('tiers.tier1')}</Badge>
                    <CardDescription>{t('tiers.tier1Desc')}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                        {t('tiers.tier1Feature1')}
                      </li>
                      <li className="flex items-center">
                        <Headphones className="h-4 w-4 mr-2 text-green-600" />
                        {t('tiers.tier1Feature2')}
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </HoverCard>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <HoverCard scale={1.05} glowColor="rgba(79, 70, 229, 0.4)">
                <Card className="border-2 border-indigo-300 shadow-xl bg-white transform md:-translate-y-4">
                  <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 text-center">
                    <Badge className="mb-2 mx-auto w-fit bg-indigo-600">{t('tiers.tier2')}</Badge>
                    <CardDescription>{t('tiers.tier2Desc')}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                        {t('tiers.tier2Feature1')}
                      </li>
                      <li className="flex items-center">
                        <Award className="h-4 w-4 mr-2 text-green-600" />
                        {t('tiers.tier2Feature2')}
                      </li>
                      <li className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-green-600" />
                        {t('tiers.tier2Feature3')}
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </HoverCard>
            </FadeInUp>

            <FadeInUp delay={0.5}>
              <HoverCard scale={1.02}>
                <Card className="border-2 bg-white">
                  <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100 text-center">
                    <Badge className="mb-2 mx-auto w-fit bg-amber-600">{t('tiers.tier3')}</Badge>
                    <CardDescription>{t('tiers.tier3Desc')}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <Trophy className="h-4 w-4 mr-2 text-green-600" />
                        {t('tiers.tier3Feature1')}
                      </li>
                      <li className="flex items-center">
                        <Award className="h-4 w-4 mr-2 text-green-600" />
                        {t('tiers.tier3Feature2')}
                      </li>
                      <li className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-green-600" />
                        {t('tiers.tier3Feature3')}
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </HoverCard>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-4 bg-indigo-600 text-white relative">

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeInUp>
            <Badge className="mb-6 bg-amber-400 text-amber-900 font-bold text-sm px-4 py-2">
              <Award className="w-4 h-4 mr-1 inline" />
              {t('cta.badge')}
            </Badge>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t('cta.title')}
            </h2>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <p className="text-xl mb-10 text-indigo-100">
              {t('cta.description')}
            </p>
          </FadeInUp>

          <FadeInUp delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <HoverCard scale={1.05} glowColor="rgba(255,255,255,0.3)">
                <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-10 py-6 rounded-xl shadow-xl">
                  <a href="#sectors">
                    {t('cta.buttonPreview')}
                  </a>
                </Button>
              </HoverCard>
              <HoverCard scale={1.05} glowColor="rgba(251, 191, 36, 0.5)">
                <Button asChild size="lg" className="bg-amber-400 text-amber-900 hover:bg-amber-300 text-lg px-10 py-6 rounded-xl shadow-xl font-bold">
                  <Link href="/signup">
                    {t('cta.buttonSignup')}
                  </Link>
                </Button>
              </HoverCard>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <FadeInUp>
            <h3 className="text-2xl font-bold text-white mb-4">Sugu-Study</h3>
            <p className="mb-4">{t('footer.tagline')}</p>
            <p className="text-amber-400 font-semibold mb-6">{t('footer.specialist')}</p>
            <div className="flex justify-center space-x-6 mb-6">
              <Link href="/login" className="hover:text-white transition-colors">{t('footer.login')}</Link>
              <Link href="/signup" className="hover:text-white transition-colors">{t('footer.signup')}</Link>
              <Link href="/preview" className="hover:text-white transition-colors">{t('footer.content')}</Link>
            </div>
            <div className="border-t border-gray-700 pt-6 mt-6">
              <p className="text-sm text-gray-400 mb-2">
                運営会社:{' '}
                <a
                  href="https://sugu-kuru.co.jp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 hover:underline"
                >
                  スグクル株式会社
                </a>
              </p>
              <p className="text-sm text-gray-500">
                {t('footer.copyright')}
              </p>
            </div>
          </FadeInUp>
        </div>
      </footer>
      </div>
    </>
  )
}
