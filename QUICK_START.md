# 🚀 クイックスタートガイド

Sugu-Studyプラットフォームを最短で立ち上げるためのガイドです。

## 📋 前提条件

以下のアカウントとツールが必要です：

- ✅ GitHubアカウント
- ✅ Supabaseアカウント（無料）
- ✅ Cloudflare Streamアカウント
- ✅ Vercelアカウント（無料）
- ✅ Node.js 20以上
- ✅ Git

## ⚡ 5ステップでデプロイ

### ステップ1: リポジトリのクローン（2分）

```bash
git clone https://github.com/sugukurukabe/study1.git
cd study1
npm install
```

### ステップ2: Supabaseセットアップ（10分）

1. [Supabase](https://supabase.com)でプロジェクト作成
2. SQL Editorで以下のマイグレーションを順に実行：
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_rls_policies.sql`
   - `supabase/migrations/003_functions.sql`
   - `supabase/migrations/004_sample_data.sql`
   - `supabase/migrations/005_sectors_schema.sql`
   - `supabase/migrations/006_agriculture_data.sql`

3. Storageで`audio`バケット（Public）と`kyc-documents`バケット（Private）を作成

詳細: [SUPABASE_MIGRATION_GUIDE.md](./SUPABASE_MIGRATION_GUIDE.md)

### ステップ3: 環境変数の設定（5分）

`.env.local`ファイルを作成：

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Cloudflare Stream
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID=933b96ef9d4f85409bc15a4935369fcf

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### ステップ4: ローカル起動（1分）

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開く

### ステップ5: Vercelデプロイ（10分）

1. [Vercel](https://vercel.com)にログイン
2. 「New Project」→ GitHubリポジトリをインポート
3. 環境変数を設定（`.env.local`の内容をコピー）
4. 「Deploy」をクリック

詳細: [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)

## 🎬 コンテンツアップロード

### 動画アップロード（Cloudflare Stream）

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → Stream
2. 動画をアップロード
3. Video IDをコピー

### 音声アップロード（Supabase Storage）

1. Supabaseダッシュボード → Storage → `audio`バケット
2. `lessons/`フォルダを作成
3. 音声ファイルをアップロード

### レッスンデータ更新

Supabase SQL Editorで実行：

```sql
UPDATE lessons SET 
  cloudflare_video_id = 'YOUR_VIDEO_ID',
  audio_storage_path = 'lessons/agri-001.mp3'
WHERE id = 'agri-001';
```

詳細: [CONTENT_UPLOAD_GUIDE.md](./CONTENT_UPLOAD_GUIDE.md)

## ✅ 動作確認

以下を確認してください：

- [ ] トップページが表示される
- [ ] ログイン/サインアップが機能する
- [ ] 業種選択ページが表示される
- [ ] レッスンページが表示される
- [ ] 動画が再生できる
- [ ] 音声が再生できる

詳細: [TESTING_GUIDE.md](./TESTING_GUIDE.md)

## 📚 詳細ガイド

より詳しい情報は以下のガイドを参照してください：

- [SUPABASE_MIGRATION_GUIDE.md](./SUPABASE_MIGRATION_GUIDE.md) - データベースマイグレーション
- [CONTENT_UPLOAD_GUIDE.md](./CONTENT_UPLOAD_GUIDE.md) - コンテンツアップロード
- [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) - Vercelデプロイ
- [GCP_DEPLOYMENT_GUIDE.md](./GCP_DEPLOYMENT_GUIDE.md) - GCPデプロイ（オプション）
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - テスト手順
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 総合デプロイガイド
- [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) - コンテンツ作成ガイド

## 🆘 トラブルシューティング

### ビルドエラー

```bash
npm install
npm run build
```

### 環境変数エラー

`.env.local`ファイルが正しく設定されているか確認

### データベースエラー

Supabaseマイグレーションが正しく実行されているか確認

### 動画が再生できない

- Cloudflare Account IDが正しく設定されているか確認
- Video IDが正しいか確認

### 音声が再生できない

- Supabase Storageの`audio`バケットが公開設定になっているか確認
- ファイルパスが正しいか確認

## 📞 サポート

問題が発生した場合：

1. 各ガイドのトラブルシューティングセクションを確認
2. GitHubのIssuesで報告
3. チームに連絡

## 🎉 次のステップ

デプロイが完了したら：

1. ✅ ユーザーテストを実施
2. ✅ フィードバックを収集
3. ✅ 他の分野のコンテンツを追加
4. ✅ 機能を拡張
