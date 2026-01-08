# 🔗 Supabase セットアップガイド

## ステップ1: Supabaseプロジェクトの作成

### 1-1. Supabaseにサインアップ

1. https://supabase.com にアクセス
2. 「Start your project」をクリック
3. GitHubアカウントでサインイン

### 1-2. 新しいプロジェクトを作成

1. 「New Project」をクリック
2. 以下を入力:
   - **Name**: `sugu-study` (任意)
   - **Database Password**: 強力なパスワードを設定（保存してください！）
   - **Region**: `Northeast Asia (Tokyo)` を選択（日本に近い）
   - **Pricing Plan**: Free プランでOK
3. 「Create new project」をクリック
4. プロジェクトの作成を待つ（2-3分）

## ステップ2: APIキーの取得

### 2-1. Project Settings を開く

1. 左サイドバーの **⚙️ Settings** をクリック
2. **API** セクションを開く

### 2-2. 必要な情報をコピー

以下の3つの情報が表示されます：

```
Project URL: https://xxxxxxxxxxx.supabase.co
anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**🚨 重要**: `service_role` キーは絶対に公開しないでください！

## ステップ3: 環境変数の設定

### 3-1. .env.localファイルを編集

```bash
cd /Users/kabe/sugustudy
```

`.env.local` ファイルを開いて、以下を書き換えます：

```bash
# Supabase（実際の値に置き換え）
NEXT_PUBLIC_SUPABASE_URL=https://あなたのプロジェクトID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...（anon public キー）
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...（service_role キー）

# その他はそのままでOK
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_STREAM_API_TOKEN=
GOOGLE_VISION_API_KEY=
NEXT_PUBLIC_ADSENSE_CLIENT_ID=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3-2. 保存して確認

保存したら、ターミナルで確認：

```bash
cat .env.local | grep SUPABASE
```

## ステップ4: データベースの初期化

### 4-1. SQL Editorを開く

1. Supabase Dashboard → 左サイドバーの **SQL Editor**
2. 「New query」をクリック

### 4-2. マイグレーションを順に実行

#### マイグレーション1: 基本スキーマ

```sql
-- supabase/migrations/001_initial_schema.sql の内容を全てコピペして実行
-- 「Run」ボタンをクリック
```

#### マイグレーション2: RLSポリシー

```sql
-- supabase/migrations/002_rls_policies.sql の内容を全てコピペして実行
-- 「Run」ボタンをクリック
```

#### マイグレーション3: 関数

```sql
-- supabase/migrations/003_functions.sql の内容を全てコピペして実行
-- 「Run」ボタンをクリック
```

#### マイグレーション4: サンプルデータ（オプション）

```sql
-- supabase/migrations/004_sample_data.sql の内容を全てコピペして実行
-- 5つのレッスンと5つの試験問題が追加されます
-- 「Run」ボタンをクリック
```

### 4-3. 実行結果の確認

- エラーが出なければ成功！
- 左サイドバーの **Table Editor** で `profiles`, `lessons` などのテーブルが作成されていることを確認

## ステップ5: Storageバケットの作成

### 5-1. audio バケット（音声ファイル用）

1. Supabase Dashboard → **Storage**
2. 「New bucket」をクリック
3. 設定:
   - **Name**: `audio`
   - **Public bucket**: ✅ ON
4. 「Create bucket」をクリック

### 5-2. kyc-documents バケット（在留カード用）

1. 「New bucket」をクリック
2. 設定:
   - **Name**: `kyc-documents`
   - **Public bucket**: ❌ OFF（プライベート）
3. 「Create bucket」をクリック

## ステップ6: 認証プロバイダーの設定

### 6-1. Email認証を有効化（デフォルトで有効）

1. Supabase Dashboard → **Authentication** → **Providers**
2. **Email** が有効になっていることを確認

### 6-2. Google OAuth（オプション）

1. **Providers** → **Google**
2. 「Enable」をON
3. Google Cloud Consoleで OAuth クライアントを作成
4. Client IDとSecretを入力
5. 「Save」をクリック

## ステップ7: アプリケーションの再起動

```bash
# 開発サーバーを再起動
# 既存のプロセスを停止
pkill -f "next dev"

# 再起動
npm run dev
```

## ✅ 接続確認

### 7-1. ブラウザでアクセス

```
http://localhost:3000
```

### 7-2. 新規登録を試す

1. 「今すぐ始める」または「無料登録」をクリック
2. フォームに入力:
   - 氏名: テストユーザー
   - 国籍: ベトナム（VN）
   - メール: test@example.com
   - パスワード: test1234
3. 「新規登録」をクリック

### 7-3. 成功の確認

- エラーが出ずにホーム画面に遷移すれば成功！
- Supabase Dashboard → **Authentication** → **Users** で登録されたユーザーを確認

## 🎉 接続完了！

これでSupabaseとの接続が完了しました！

## 📊 確認チェックリスト

- [ ] Supabaseプロジェクト作成完了
- [ ] APIキーを.env.localに設定
- [ ] マイグレーション実行完了
- [ ] Storageバケット作成完了
- [ ] 認証プロバイダー設定完了
- [ ] 開発サーバー再起動
- [ ] 新規登録テスト成功
- [ ] Supabase Dashboardでユーザー確認

## 🔧 トラブルシューティング

### エラー: "Invalid API key"

```bash
# .env.localの内容を確認
cat .env.local | grep SUPABASE

# APIキーを再確認
# Supabase Dashboard → Settings → API
```

### エラー: "relation does not exist"

```sql
-- マイグレーションが実行されていない
-- SQL Editorで001, 002, 003のマイグレーションを順に実行
```

### ユーザー登録時にエラー

```
-- profilesテーブルのRLSポリシーを確認
-- 002_rls_policies.sqlが正しく実行されているか確認
```

## 📞 次のステップ

接続が完了したら：

1. ✅ コンテンツをアップロード（`CONTENT_UPLOAD_QUICK_START.md`参照）
2. ✅ サンプルデータを投入（`004_sample_data.sql`）
3. ✅ 実際にレッスンを追加
4. ✅ ユーザー登録 → 学習を試す

---

困ったことがあれば、Supabaseのログを確認してください：
**Dashboard → Logs → API**


