# SEO対策 完全戦略プラン

## 🎯 ターゲットユーザー
- 日本在住のインドネシア人・ベトナム人
- 特定技能2号試験を受験予定の外国人労働者
- 農業・畜産業・漁業などの分野で働く外国人

---

## 📊 現状分析

### ✅ 現在実装済み
1. **多言語対応**
   - 日本語、インドネシア語、ベトナム語、英語
   - next-intlによる国際化

2. **PWA対応**
   - オフライン学習可能
   - モバイルファースト設計

3. **Google Analytics**
   - トラッキングコード設置済み

4. **Google AdSense**
   - 広告収益化準備完了

### ❌ 未実装（緊急）
1. **メタタグ不足**
   - title、description、OGPタグがない
   - 各言語版のメタデータがない

2. **robots.txt / sitemap.xml**
   - 検索エンジンクローラー向けファイルがない

3. **構造化データ（Schema.org）**
   - 教育コンテンツのマークアップがない

4. **hreflang タグ**
   - 多言語ページの関連付けがない

5. **パフォーマンス最適化**
   - 画像最適化、遅延読み込みの余地あり

---

## 🚀 SEO対策実装計画

### 【優先度1】緊急実装（今週中）

#### 1. メタタグの完全実装

**各ページに追加するメタタグ：**

```typescript
// app/[locale]/page.tsx (ランディングページ)
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  
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
```

#### 2. robots.txt の作成

```txt
# app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
    ],
    sitemap: 'https://sugu-study.com/sitemap.xml',
  }
}
```

#### 3. sitemap.xml の動的生成

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sugu-study.com'
  const locales = ['ja', 'id', 'vi', 'en']
  const sectors = ['agriculture', 'livestock', 'fishery']
  
  const routes: MetadataRoute.Sitemap = []

  // ホームページ（各言語）
  locales.forEach(locale => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          ja: `${baseUrl}/ja`,
          id: `${baseUrl}/id`,
          vi: `${baseUrl}/vi`,
          en: `${baseUrl}/en`,
        },
      },
    })
  })

  // 業種ページ（各言語）
  locales.forEach(locale => {
    sectors.forEach(sector => {
      routes.push({
        url: `${baseUrl}/${locale}/sectors/${sector}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    })
  })

  // 静的ページ
  const staticPages = ['login', 'signup']
  locales.forEach(locale => {
    staticPages.forEach(page => {
      routes.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    })
  })

  return routes
}
```

#### 4. 構造化データ（JSON-LD）

```typescript
// components/StructuredData.tsx
export function EducationalOrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Sugu-Study',
    description: '特定技能2号試験対策のためのオンライン学習プラットフォーム',
    url: 'https://sugu-study.com',
    logo: 'https://sugu-study.com/logo.png',
    sameAs: [
      // SNSリンク（今後追加）
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      availableLanguage: ['Japanese', 'Indonesian', 'Vietnamese', 'English'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function CourseSchema({ 
  name, 
  description, 
  provider = 'Sugu-Study',
  inLanguage 
}: {
  name: string
  description: string
  provider?: string
  inLanguage: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: 'https://sugu-study.com',
    },
    educationalLevel: 'Professional',
    inLanguage,
    availableLanguage: ['ja', 'id', 'vi', 'en'],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT30M', // 30分/日
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

---

### 【優先度2】重要実装（今月中）

#### 5. パフォーマンス最適化

**画像最適化：**
- Next.js Image コンポーネントの活用
- WebP形式への変換
- 遅延読み込み（lazy loading）

**コード分割：**
- 動的インポート（dynamic import）の活用
- 不要なJavaScriptの削減

**Core Web Vitals 改善：**
- LCP (Largest Contentful Paint) < 2.5秒
- FID (First Input Delay) < 100ms
- CLS (Cumulative Layout Shift) < 0.1

#### 6. コンテンツSEO

**ブログ/記事セクション追加：**
- 「特定技能2号とは？完全ガイド」
- 「農業分野での特定技能2号取得方法」
- 「インドネシア人が日本で働くメリット」
- 「ベトナム人向け：特定技能試験対策」

**各言語でのコンテンツ充実：**
- インドネシア語のSEOキーワード調査
- ベトナム語のSEOキーワード調査
- ロングテールキーワード対策

#### 7. 外部リンク・被リンク戦略

**ターゲット：**
- 在日外国人向けコミュニティサイト
- 技能実習生支援団体
- 人材派遣会社
- 日本語学校

---

### 【優先度3】長期施策（3ヶ月以内）

#### 8. ローカルSEO

**Google ビジネスプロフィール：**
- オンラインサービスとして登録
- 多言語での説明文

#### 9. SNS連携

**ソーシャルメディア展開：**
- Facebook（インドネシア人・ベトナム人コミュニティ）
- Instagram（学習コンテンツのシェア）
- YouTube（動画コンテンツの公開）
- TikTok（短い学習動画）

#### 10. ユーザー生成コンテンツ

**レビュー・体験談：**
- 合格者の体験談
- 学習者のレビュー
- 評価システム

---

## 🎯 キーワード戦略

### 日本語キーワード
**メインキーワード：**
- 特定技能2号
- 特定技能2号 試験
- 特定技能2号 勉強
- 特定技能 農業
- 特定技能 畜産

**ロングテールキーワード：**
- 特定技能2号 インドネシア人
- 特定技能2号 ベトナム人
- 特定技能2号 オンライン学習
- 特定技能2号 無料
- 特定技能2号 合格率

### インドネシア語キーワード
- Tokutei Ginou 2
- Ujian Tokutei Ginou
- Kerja di Jepang
- Visa kerja Jepang
- Belajar bahasa Jepang pertanian
- Peternakan Jepang
- Pekerja asing Jepang

### ベトナム語キーワード
- Tokutei Ginou 2
- Thi Tokutei Ginou
- Làm việc tại Nhật
- Visa lao động Nhật Bản
- Học tiếng Nhật nông nghiệp
- Chăn nuôi Nhật Bản
- Lao động nước ngoài Nhật Bản

---

## 📈 測定指標（KPI）

### 検索エンジン
- オーガニック検索流入数
- キーワードランキング
- インプレッション数
- クリック率（CTR）

### ユーザー行動
- 直帰率
- 平均セッション時間
- ページビュー/セッション
- コンバージョン率（登録率）

### 技術指標
- Core Web Vitals スコア
- ページ読み込み速度
- モバイルフレンドリースコア

---

## 🛠️ 実装の優先順位

### 今週（Week 1）
1. ✅ メタタグ実装（全ページ）
2. ✅ robots.txt 作成
3. ✅ sitemap.xml 生成
4. ✅ 構造化データ追加

### 来週（Week 2）
5. ✅ hreflang タグ実装
6. ✅ OG画像作成・設定
7. ✅ パフォーマンス最適化（初期）
8. ✅ Google Search Console 設定

### 今月中（Week 3-4）
9. ✅ ブログセクション追加
10. ✅ コンテンツSEO（記事10本）
11. ✅ SNSアカウント開設
12. ✅ 被リンク獲得開始

---

## 💡 インドネシア人・ベトナム人向け特別施策

### 1. コミュニティ連携
- Facebook グループでの情報発信
- LINE オープンチャット
- WhatsApp グループ

### 2. 文化的配慮
- イスラム教徒向けコンテンツ（インドネシア）
- 旧正月コンテンツ（ベトナム）
- 母国語での丁寧な説明

### 3. 現地パートナーシップ
- インドネシア・ベトナムの送り出し機関との連携
- 現地日本語学校との提携
- 人材紹介会社との協業

---

## 🎯 期待される効果

### 3ヶ月後
- オーガニック検索流入：月間1,000人
- 新規登録ユーザー：月間300人
- 主要キーワードでTop 10入り

### 6ヶ月後
- オーガニック検索流入：月間5,000人
- 新規登録ユーザー：月間1,500人
- 主要キーワードでTop 3入り

### 1年後
- オーガニック検索流入：月間20,000人
- 新規登録ユーザー：月間6,000人
- 業界No.1の認知度

---

**このSEO戦略で、日本在住の外国人労働者に最高の学習プラットフォームを届けます！** 🚀
