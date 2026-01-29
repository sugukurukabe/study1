# 🚀 Vercelデプロイガイド

このガイドでは、Sugu-StudyをVercelにデプロイする手順を説明します。

## 📋 前提条件

- ✅ GitHubアカウント
- ✅ Vercelアカウント（無料で作成可能）
- ✅ GitHubリポジトリ: `https://github.com/sugukurukabe/study1.git`
- ✅ Supabaseマイグレーション完了
- ✅ 環境変数の準備

## 🎯 ステップ1: Vercelアカウントの作成

1. ブラウザで以下のURLを開く:
   ```
   https://vercel.com/signup
   ```

2. 「Continue with GitHub」をクリック

3. GitHubアカウントで認証

## 📦 ステップ2: プロジェクトのインポート

### 2.1 新規プロジェクト作成

1. Vercelダッシュボードで「Add New...」→「Project」をクリック

2. 「Import Git Repository」セクションで`study1`リポジトリを探す

3. 「Import」をクリック

### 2.2 プロジェクト設定

**Configure Project**画面で以下を設定:

- **Project Name**: `sugu-study`（または任意の名前）
- **Framework Preset**: Next.js（自動検出）
- **Root Directory**: `./`（デフォルト）
- **Build Command**: `npm run build`（自動設定）
- **Output Directory**: `.next`（自動設定）

## 🔐 ステップ3: 環境変数の設定

「Environment Variables」セクションで以下の環境変数を追加します：

### 必須の環境変数

| 変数名 | 値 | 説明 |
|--------|-----|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://tvvvwyrtakruwaylwmyb.supabase.co` | Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Supabase匿名キー |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Supabaseサービスロールキー |
| `NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID` | `933b96ef9d4f85409bc15a4935369fcf` | Cloudflare Account ID |
| `NEXT_PUBLIC_APP_URL` | `https://sugu-study.vercel.app` | アプリケーションURL |

### オプションの環境変数

| 変数名 | 値 | 説明 |
|--------|-----|------|
| `CLOUDFLARE_STREAM_API_TOKEN` | `[Your Token]` | Cloudflare Stream APIトークン |
| `GOOGLE_VISION_API_KEY` | `[Your Key]` | Google Vision APIキー（KYC用） |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | `[Your Client ID]` | Google AdSense Client ID |

### 環境変数の追加方法

1. 「Key」フィールドに変数名を入力
2. 「Value」フィールドに値を入力
3. 「Add」をクリック
4. すべての環境変数を追加

**重要:** `.env.local`ファイルから値をコピーしてください。

## 🚀 ステップ4: デプロイ実行

1. すべての設定を確認

2. 「Deploy」ボタンをクリック

3. ビルドプロセスを監視:
   - Installing dependencies...
   - Building...
   - Deploying...

4. デプロイ完了を待つ（通常2-5分）

## ✅ ステップ5: デプロイ確認

### 5.1 URLの確認

デプロイ完了後、以下のようなURLが表示されます:
```
https://sugu-study.vercel.app
```

または
```
https://sugu-study-xxx.vercel.app
```

### 5.2 動作確認

1. デプロイされたURLをブラウザで開く

2. 以下の機能を確認:
   - [ ] トップページが表示される
   - [ ] ログイン/サインアップページが表示される
   - [ ] 業種選択ページが表示される（/sectors/agriculture）
   - [ ] レッスンページが表示される（/learn/agri-001）
   - [ ] 動画が再生できる
   - [ ] 音声が再生できる

### 5.3 エラーチェック

ブラウザのDevToolsを開き（F12）、以下を確認:
- Consoleタブにエラーがないか
- Networkタブで404エラーがないか

## 🔄 ステップ6: 自動デプロイの設定

Vercelは自動的にGitHubと連携されており、以下の動作をします:

- **mainブランチへのプッシュ** → 本番環境に自動デプロイ
- **他のブランチへのプッシュ** → プレビュー環境に自動デプロイ
- **Pull Request作成** → プレビューURLが自動生成

## 🌐 ステップ7: カスタムドメインの設定（オプション）

独自ドメインを使用する場合:

1. Vercelダッシュボードで「Settings」→「Domains」を開く

2. 「Add Domain」をクリック

3. ドメイン名を入力（例: `sugu-study.com`）

4. DNS設定の指示に従う:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

5. DNS設定が反映されるまで待つ（最大48時間）

## 📊 ステップ8: 監視とメンテナンス

### Vercel Analytics（推奨）

1. プロジェクトダッシュボードで「Analytics」タブを開く

2. 「Enable Analytics」をクリック

3. 以下の情報を確認できます:
   - ページビュー
   - ユニークビジター
   - トップページ
   - デバイス分布

### Speed Insights（推奨）

1. プロジェクトダッシュボードで「Speed Insights」タブを開く

2. 「Enable Speed Insights」をクリック

3. パフォーマンスメトリクスを確認:
   - First Contentful Paint (FCP)
   - Largest Contentful Paint (LCP)
   - Cumulative Layout Shift (CLS)

## 🔧 トラブルシューティング

### ビルドエラー: "Module not found"

**原因:** 依存関係のインストール失敗

**解決方法:**
1. ローカルで`npm install`を実行
2. `package-lock.json`をコミット
3. 再度プッシュ

### ビルドエラー: "Type error"

**原因:** TypeScriptの型エラー

**解決方法:**
1. ローカルで`npm run type-check`を実行
2. エラーを修正
3. コミット・プッシュ

### 環境変数が反映されない

**原因:** 環境変数の設定ミス

**解決方法:**
1. Vercelダッシュボード→「Settings」→「Environment Variables」
2. 変数名と値を再確認
3. 「Redeploy」をクリック

### 動画が再生できない

**原因:** Cloudflare Account IDの設定ミス

**解決方法:**
1. `NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID`が正しく設定されているか確認
2. 値の前後にスペースがないか確認
3. 再デプロイ

### 音声が再生できない

**原因:** Supabase Storageの設定ミス

**解決方法:**
1. Supabaseダッシュボード→Storage→`audio`バケット
2. バケットが「Public」になっているか確認
3. ファイルパスが正しいか確認

## 📝 デプロイ後のチェックリスト

- [ ] デプロイ成功（緑のチェックマーク）
- [ ] 本番URLにアクセス可能
- [ ] トップページが正常に表示
- [ ] ログイン機能が動作
- [ ] 業種選択ページが表示
- [ ] レッスンページが表示
- [ ] 動画再生が動作
- [ ] 音声再生が動作
- [ ] モバイル表示が正常
- [ ] PWAインストールが可能
- [ ] Vercel Analyticsが有効
- [ ] Speed Insightsが有効

## 🎉 次のステップ

デプロイが完了したら:

1. ✅ チームメンバーにURLを共有
2. ✅ ユーザーテストを実施
3. ✅ フィードバックを収集
4. ✅ 改善を継続

## 📞 サポート

問題が発生した場合:

1. Vercelドキュメント: https://vercel.com/docs
2. Vercelサポート: https://vercel.com/support
3. Next.jsドキュメント: https://nextjs.org/docs
