import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Video, Headphones, FileText, Trophy, Users, Globe, Zap, Award, Target, CheckCircle, Play } from 'lucide-react'
import Link from 'next/link'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { getLocale, getTranslations } from 'next-intl/server'
import LandingVideoPlayer from '@/components/learning/LandingVideoPlayer'

// Cloudflare Stream 動画ID（言語別）
const VIDEO_DATA: Record<string, {
  videoId: string
  title: string
  subtitle: string
}> = {
  ja: {
    videoId: '54ed79e74656e84f7f19e4311be4530b',
    title: '特定技能2号 完全ガイド',
    subtitle: '3分でわかる特定技能2号のメリットと取得方法',
  },
  id: {
    videoId: 'ee20949a41588f8317b0226c09a3d676',
    title: 'Panduan Lengkap Tokutei Ginou 2',
    subtitle: 'Pahami keuntungan dan cara mendapatkan Tokutei Ginou 2 dalam 3 menit',
  },
  vi: {
    videoId: '54ed79e74656e84f7f19e4311be4530b', // 一時的に日本語を使用
    title: 'Hướng dẫn đầy đủ về Tokutei Ginou 2',
    subtitle: 'Tìm hiểu lợi ích và cách lấy Tokutei Ginou 2 trong 3 phút',
  },
  en: {
    videoId: '54ed79e74656e84f7f19e4311be4530b', // 一時的に日本語を使用
    title: 'Complete Guide to Tokutei Ginou 2',
    subtitle: 'Understand the benefits and how to obtain Tokutei Ginou 2 in 3 minutes',
  },
}

export default async function LandingPage() {
  const locale = await getLocale()
  const t = await getTranslations('landing')

  // 現在の言語の動画データ
  const videoData = VIDEO_DATA[locale] || VIDEO_DATA['ja']

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-16 px-4">
        {/* Language Switcher */}
        <div className="absolute top-4 right-4 z-10">
          <LanguageSwitcher currentLocale={locale} variant="hero" />
        </div>

        <div className="max-w-6xl mx-auto text-center pt-8">
          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Badge className="bg-amber-400 text-amber-900 text-sm px-4 py-2 font-bold">
              <Award className="w-4 h-4 mr-1" />
              {t('badge1')}
            </Badge>
            <Badge className="bg-white text-indigo-600 text-sm px-4 py-2">
              {t('badge2')}
            </Badge>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {t('heroTitle')}
          </h1>

          {/* Hero Subtitle Box */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 flex items-center justify-center gap-2">
              <Target className="w-8 h-8 text-amber-300" />
              {t('heroSubtitle')}
            </h2>
            <p className="text-lg md:text-xl text-indigo-100">
              {t('heroDescription')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-6">
              <a href="#sectors">
                {t('ctaPreview')}
              </a>
            </Button>
            <Button asChild size="lg" className="bg-amber-400 text-amber-900 hover:bg-amber-300 text-lg px-8 py-6 font-bold">
              <Link href="/signup">
                {t('ctaSignup')}
              </Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>{t('feature1')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>{t('feature2')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>{t('feature3')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - 言語別動画 */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-amber-100 text-amber-700 text-sm px-4 py-2">
              <Video className="w-4 h-4 mr-1 inline" />
              {t('videoSection.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('videoSection.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('videoSection.description')}
            </p>
          </div>

          {/* Video Player - Cloudflare Stream対応 */}
          <LandingVideoPlayer
            videoId={videoData.videoId}
            title={videoData.title}
            subtitle={videoData.subtitle}
          />

          {/* Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-amber-400">
              <h4 className="font-bold text-lg mb-2">👨‍👩‍👧‍👦 {t('videoSection.benefit1Title')}</h4>
              <p className="text-gray-600 text-sm">{t('videoSection.benefit1Desc')}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-indigo-400">
              <h4 className="font-bold text-lg mb-2">🔄 {t('videoSection.benefit2Title')}</h4>
              <p className="text-gray-600 text-sm">{t('videoSection.benefit2Desc')}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-400">
              <h4 className="font-bold text-lg mb-2">📈 {t('videoSection.benefit3Title')}</h4>
              <p className="text-gray-600 text-sm">{t('videoSection.benefit3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sector Selection */}
      <section id="sectors" className="py-16 px-4 bg-white scroll-mt-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-indigo-100 text-indigo-700 text-sm px-4 py-2">
              {t('sectors.badge')}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('sectors.title')}
            </h2>
            <p className="text-gray-600">
              {t('sectors.description')}
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {/* 農業 - Active */}
            <Link href="/sectors/agriculture" className="block">
              <div className="bg-green-50 hover:bg-green-100 rounded-2xl p-4 text-center transition-all hover:shadow-lg cursor-pointer border-2 border-green-200">
                <span className="text-3xl mb-2 block">🌾</span>
                <span className="text-sm font-medium text-green-700">{t('sectors.agriculture')}</span>
              </div>
            </Link>

            {/* 畜産業 - Active */}
            <Link href="/sectors/livestock" className="block">
              <div className="bg-amber-50 hover:bg-amber-100 rounded-2xl p-4 text-center transition-all hover:shadow-lg cursor-pointer border-2 border-amber-200">
                <span className="text-3xl mb-2 block">🐄</span>
                <span className="text-sm font-medium text-amber-700">{t('sectors.livestock')}</span>
              </div>
            </Link>

            {/* Coming soon sectors */}
            {[
              { icon: '🐟', key: 'fishery' },
              { icon: '🏗️', key: 'construction' },
              { icon: '🚢', key: 'shipbuilding' },
              { icon: '🔧', key: 'automobile' },
              { icon: '✈️', key: 'aviation' },
              { icon: '🏨', key: 'accommodation' },
              { icon: '🍱', key: 'foodManufacturing' },
              { icon: '🍽️', key: 'foodService' },
              { icon: '🩺', key: 'nursing' },
            ].map((sector) => (
              <div key={sector.key} className="bg-gray-50 rounded-2xl p-4 text-center opacity-60 cursor-not-allowed">
                <span className="text-3xl mb-2 block">{sector.icon}</span>
                <span className="text-sm font-medium text-gray-500">{t(`sectors.${sector.key}`)}</span>
                <span className="block text-[10px] text-gray-400">{t('sectors.comingSoon')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Styles */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('learningStyles.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-xl transition-shadow">
              <CardHeader>
                <Video className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>{t('learningStyles.videoTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t('learningStyles.videoDesc')}</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-xl transition-shadow">
              <CardHeader>
                <Headphones className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>{t('learningStyles.audioTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t('learningStyles.audioDesc')}</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-xl transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-pink-600 mb-4" />
                <CardTitle>{t('learningStyles.textTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t('learningStyles.textDesc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('features.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Globe className="h-10 w-10 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{t('features.multiLanguageTitle')}</h3>
                <p className="text-gray-600">{t('features.multiLanguageDesc')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Zap className="h-10 w-10 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{t('features.offlineTitle')}</h3>
                <p className="text-gray-600">{t('features.offlineDesc')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Trophy className="h-10 w-10 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{t('features.gamificationTitle')}</h3>
                <p className="text-gray-600">{t('features.gamificationDesc')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Users className="h-10 w-10 text-pink-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{t('features.referralTitle')}</h3>
                <p className="text-gray-600">{t('features.referralDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('tiers.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2">
              <CardHeader className="bg-gray-100">
                <CardTitle className="text-center">
                  <Badge className="mb-2">{t('tiers.tier1')}</Badge>
                </CardTitle>
                <CardDescription className="text-center text-sm">
                  {t('tiers.tier1Desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                    {t('tiers.tier1Feature1')}
                  </li>
                  <li className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                    {t('tiers.tier1Feature2')}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-indigo-300 shadow-lg scale-105">
              <CardHeader className="bg-blue-100">
                <CardTitle className="text-center">
                  <Badge className="mb-2 bg-blue-600">{t('tiers.tier2')}</Badge>
                </CardTitle>
                <CardDescription className="text-center text-sm">
                  {t('tiers.tier2Desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                    {t('tiers.tier2Feature1')}
                  </li>
                  <li className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                    {t('tiers.tier2Feature2')}
                  </li>
                  <li className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                    {t('tiers.tier2Feature3')}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100">
                <CardTitle className="text-center">
                  <Badge className="mb-2 bg-amber-600">{t('tiers.tier3')}</Badge>
                </CardTitle>
                <CardDescription className="text-center text-sm">
                  {t('tiers.tier3Desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                    {t('tiers.tier3Feature1')}
                  </li>
                  <li className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                    {t('tiers.tier3Feature2')}
                  </li>
                  <li className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                    {t('tiers.tier3Feature3')}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-amber-400 text-amber-900 font-bold">
            <Award className="w-4 h-4 mr-1 inline" />
            {t('cta.badge')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-6">
              <a href="#sectors">
                {t('cta.buttonPreview')}
              </a>
            </Button>
            <Button asChild size="lg" className="bg-amber-400 text-amber-900 hover:bg-amber-300 text-lg px-8 py-6 font-bold">
              <Link href="/signup">
                {t('cta.buttonSignup')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Sugu-Study</h3>
          <p className="mb-4">{t('footer.tagline')}</p>
          <p className="text-amber-400 font-semibold mb-6">{t('footer.specialist')}</p>
          <div className="flex justify-center space-x-6 mb-6">
            <Link href="/login" className="hover:text-white">{t('footer.login')}</Link>
            <Link href="/signup" className="hover:text-white">{t('footer.signup')}</Link>
            <Link href="/preview" className="hover:text-white">{t('footer.content')}</Link>
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
        </div>
      </footer>
    </div>
  )
}
