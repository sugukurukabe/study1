# Sugu-Study - SSW Tier 2 Learning Platform

日本で働く外国人向けの特定技能2号試験対策PWA（Progressive Web App）

## 🎯 プロジェクト概要

Sugu-StudyはUdemy級のユーザー体験を提供する、モバイルファースト学習プラットフォームです。段階的なデータ収集を促す3段階のTierシステムを採用しています。

## 🚀 技術スタック

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend/DB:** Supabase (Auth, PostgreSQL, Storage, Edge Functions)
- **PWA:** next-pwa
- **State Management:** Zustand
- **I18n:** next-intl (日本語、ベトナム語、インドネシア語、英語)
- **Media:** Cloudflare Stream (動画), Supabase Storage (音声)
- **Forms:** React Hook Form + Zod

## 📋 必要な環境変数

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Cloudflare Stream
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_STREAM_API_TOKEN=your_cloudflare_stream_token

# Google Vision API (KYC OCR用)
GOOGLE_VISION_API_KEY=your_google_vision_api_key

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=your_adsense_client_id

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🏗️ セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Supabaseプロジェクトの設定

1. [Supabase](https://supabase.com)でプロジェクトを作成
2. `supabase/migrations/`内のSQLファイルを順に実行
3. Supabase URLとAPIキーを`.env.local`に設定

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## 🔐 Tierシステム

### Tier 1 (ゲスト)
- **要件:** メールアドレス、氏名、国籍
- **アクセス:** 動画講義、基本音声ポッドキャスト

### Tier 2 (学習者)
- **要件:** 居住都道府県、現在の職種、SNSアカウント（任意）
- **アクセス:** 学習履歴、バッジシステム、紹介システム

### Tier 3 (認証済み)
- **要件:** 在留カード画像（表・裏）、運転免許証の有無
- **アクセス:** 本番CBTシミュレーション、修了証発行、スカウト機能

## 📁 プロジェクト構造

```
app/
├── [locale]/              # 多言語ルーティング
│   ├── (public)/          # 未認証ページ (login, signup)
│   ├── (dashboard)/       # 認証済みページ (home, learn, exam, profile)
│   └── admin/             # 管理画面
components/
├── ui/                    # shadcn/ui基本コンポーネント
├── layouts/               # ナビゲーション
├── learning/              # 学習関連コンポーネント
├── exam/                  # 試験関連コンポーネント
├── kyc/                   # KYC関連コンポーネント
└── gamification/          # バッジ・紹介システム
lib/
├── supabase/              # Supabase設定
├── stores/                # Zustandストア
├── hooks/                 # カスタムフック
└── utils/                 # ユーティリティ関数
supabase/
├── migrations/            # データベースマイグレーション
└── functions/             # Edge Functions
```

## 🌐 多言語対応

サポート言語：
- 日本語 (`ja`) - デフォルト
- ベトナム語 (`vi`)
- インドネシア語 (`id`)
- 英語 (`en`)

翻訳ファイルは`messages/`ディレクトリにあります。

## 📱 PWA機能

- オフライン対応（Service Worker）
- プログレッシブダウンロード（音声コンテンツ）
- Add to Home Screen
- プッシュ通知（今後実装予定）

## 🚢 デプロイ

### Vercel

```bash
npm install -g vercel
vercel
```

### 環境変数の設定

Vercelダッシュボードで、すべての環境変数を設定してください。

## 📊 主要機能

- ✅ 3段階Tierシステム
- ✅ 多言語対応（4言語）
- ✅ PWA（オフライン学習）
- ✅ 動画・音声・テキスト学習
- ✅ ドリル練習
- ✅ CBTシミュレーション
- ✅ KYC（在留カード認証）
- ✅ バッジシステム
- ✅ 紹介コード
- ✅ AdSense統合

## 📝 ライセンス

Proprietary - All rights reserved

## 👥 開発者

Sugu-Study Development Team
