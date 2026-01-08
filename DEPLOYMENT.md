# Sugu-Study デプロイメントガイド

## 📋 デプロイ前のチェックリスト

### 1. Supabase セットアップ

1. [Supabase](https://supabase.com)でプロジェクトを作成
2. SQL Editorで以下のマイグレーションを順に実行:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_rls_policies.sql`
   - `supabase/migrations/003_functions.sql`

3. Storage Bucketsを作成:
   - `audio` (public)
   - `kyc-documents` (private)

4. Authentication Providersを有効化:
   - Email
   - Google OAuth (オプション)
   - Facebook OAuth (オプション)

5. プロジェクトURLとAPIキーを取得

### 2. Cloudflare Stream セットアップ

1. [Cloudflare](https://cloudflare.com)アカウントを作成
2. Stream製品を有効化
3. Account IDとAPI Tokenを取得
4. 動画をアップロード

### 3. Google Vision API セットアップ

1. [Google Cloud Console](https://console.cloud.google.com)でプロジェクトを作成
2. Vision APIを有効化
3. APIキーを作成
4. キーを保存

### 4. Google AdSense セットアップ

1. [Google AdSense](https://www.google.com/adsense/)でアカウントを作成
2. サイトを登録
3. Client IDを取得
4. 広告ユニットを作成してスロットIDを取得

## 🚀 Vercelへのデプロイ

### ステップ 1: Vercel CLIのインストール

```bash
npm install -g vercel
```

### ステップ 2: プロジェクトのリンク

```bash
cd /Users/kabe/sugustudy
vercel link
```

### ステップ 3: 環境変数の設定

Vercelダッシュボードで以下の環境変数を設定:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_STREAM_API_TOKEN=your_cloudflare_stream_token
GOOGLE_VISION_API_KEY=your_google_vision_api_key
NEXT_PUBLIC_ADSENSE_CLIENT_ID=your_adsense_client_id
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### ステップ 4: デプロイ

```bash
vercel --prod
```

## 🔍 デプロイ後の確認

### Lighthouse 監査

```bash
# Chrome DevToolsで実行
# Performance: 90+
# Accessibility: 90+
# Best Practices: 90+
# SEO: 90+
# PWA: 90+
```

### 動作確認

- [ ] ログイン/サインアップ
- [ ] Tier昇格フロー
- [ ] 学習コンテンツ再生
- [ ] ドリル練習
- [ ] CBTシミュレーション (Tier 3)
- [ ] KYCアップロード
- [ ] 紹介システム
- [ ] バッジ獲得
- [ ] オフラインモード
- [ ] PWAインストール

## 📱 PWA インストールテスト

### Android (Chrome)

1. サイトにアクセス
2. メニュー → 「ホーム画面に追加」
3. アイコンが表示されることを確認
4. アプリとして起動できることを確認

### iOS (Safari)

1. サイトにアクセス
2. 共有ボタン → 「ホーム画面に追加」
3. アイコンが表示されることを確認
4. アプリとして起動できることを確認

## 🔧 Supabase Edge Functions のデプロイ

```bash
# Supabase CLIのインストール
npm install -g supabase

# ログイン
supabase login

# Edge Functionsのデプロイ
cd supabase/functions
supabase functions deploy kyc-ocr
supabase functions deploy referral-processor
```

## 🌐 カスタムドメインの設定

1. Vercelダッシュボードで「Domains」を開く
2. カスタムドメインを追加
3. DNSレコードを設定:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

## 📊 監視とメンテナンス

### エラー監視

- Vercel Analytics を有効化
- Supabase Logs を定期的に確認

### パフォーマンス監視

- Vercel Speed Insights を有効化
- Lighthouse CI を GitHub Actions に統合（推奨）

### バックアップ

- Supabase の自動バックアップを有効化
- 定期的に手動バックアップを実行

## 🚨 トラブルシューティング

### ビルドエラー

```bash
# 型チェック
npm run type-check

# Lint
npm run lint:fix

# ローカルビルドテスト
npm run build
```

### 環境変数エラー

- `.env.local.example` と実際の `.env.local` を比較
- Vercel ダッシュボードで環境変数が正しく設定されているか確認

### PWAが動作しない

- HTTPSで配信されているか確認
- `manifest.json` が正しく配信されているか確認
- Service Worker が登録されているか DevTools で確認

## 📈 スケーリング

### データベース

- Supabase Pro プランへのアップグレード
- Read Replicas の追加（大規模時）

### メディア配信

- Cloudflare Stream の帯域幅プランを確認
- CDNキャッシュ設定の最適化

### Edge Functions

- 使用量に応じてプラン変更
- レート制限の設定

## 🔐 セキュリティ

- [ ] Supabase RLS ポリシーを再確認
- [ ] API Keys を定期的にローテーション
- [ ] CORS設定を確認
- [ ] CSP (Content Security Policy) を設定
- [ ] Rate Limiting を実装

## ✅ ローンチチェックリスト

- [ ] すべての環境変数が設定済み
- [ ] Supabase マイグレーション実行済み
- [ ] カスタムドメイン設定済み
- [ ] SSL証明書有効
- [ ] Lighthouse スコア 90+ 達成
- [ ] PWA 動作確認済み
- [ ] 全機能のテスト完了
- [ ] エラー監視設定済み
- [ ] バックアップ設定済み
- [ ] 利用規約・プライバシーポリシー掲載


