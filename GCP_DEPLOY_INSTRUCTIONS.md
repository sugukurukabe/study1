# GCP Cloud Run デプロイ手順

## 📋 前提条件

- GCPプロジェクト: `sugu-study`
- リージョン: `asia-northeast1` (東京)
- サービス名: `sugu-study`

---

## 🚀 デプロイ方法

### 方法1: Google Cloud Console（推奨）

#### ステップ1: Cloud Buildの設定

1. **Google Cloud Consoleにアクセス**
   ```
   https://console.cloud.google.com/cloud-build/builds?project=sugu-study
   ```

2. **GitHubリポジトリを接続**
   - 左メニューから「トリガー」を選択
   - 「トリガーを作成」をクリック
   - リポジトリを接続: `sugukurukabe/study1`
   - トリガー設定:
     - 名前: `deploy-main`
     - イベント: `ブランチにプッシュ`
     - ブランチ: `^main$`
     - 構成: `Cloud Build構成ファイル（yaml または json）`
     - 場所: `リポジトリ`
     - Cloud Build構成ファイルの場所: `/cloudbuild.yaml`

3. **トリガーを保存**

#### ステップ2: 手動でビルドを実行

1. **Cloud Build トリガーページ**
   ```
   https://console.cloud.google.com/cloud-build/triggers?project=sugu-study
   ```

2. 作成したトリガーの右側にある「実行」ボタンをクリック

3. ビルドの進行状況を確認
   ```
   https://console.cloud.google.com/cloud-build/builds?project=sugu-study
   ```

---

### 方法2: ターミナルから手動デプロイ

#### ステップ1: GCP認証

```bash
# GCPにログイン
gcloud auth login

# プロジェクトを設定
gcloud config set project sugu-study

# Application Default Credentialsを設定
gcloud auth application-default login
```

#### ステップ2: Cloud Buildを実行

```bash
# プロジェクトディレクトリに移動
cd /Users/kabe/sugustudy

# Cloud Buildを実行
gcloud builds submit --config cloudbuild.yaml .
```

**デプロイ時間:** 約5〜10分

---

## 🔧 環境変数の設定

Cloud Runサービスに以下の環境変数が設定されます（`cloudbuild.yaml`で自動設定）:

```yaml
NEXT_PUBLIC_SUPABASE_URL: https://tvvvwyrtakruwaylwmyb.supabase.co
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID: 933b96ef9d4f85409bc15a4935369fcf
```

### 追加の環境変数が必要な場合

Cloud Runコンソールから手動で追加:

```
https://console.cloud.google.com/run/detail/asia-northeast1/sugu-study/revisions?project=sugu-study
```

1. 「新しいリビジョンの編集とデプロイ」をクリック
2. 「変数とシークレット」タブを選択
3. 環境変数を追加:
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `CLOUDFLARE_STREAM_API_TOKEN`
   - `GOOGLE_VISION_API_KEY`
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`

---

## 📊 デプロイ後の確認

### 1. Cloud Runサービスの確認

```
https://console.cloud.google.com/run?project=sugu-study
```

- サービス名: `sugu-study`
- リージョン: `asia-northeast1`
- URL: 表示されているURLをクリック

### 2. 本番環境にアクセス

Cloud RunのURLからアプリケーションにアクセスして確認:

- [ ] トップページが表示される
- [ ] 「2号とは？」の動画が再生される
- [ ] 畜産業セクターが表示される
- [ ] 言語切り替えが機能する

### 3. ログの確認

```
https://console.cloud.google.com/logs/query?project=sugu-study
```

エラーがないか確認してください。

---

## 🔄 自動デプロイの設定（推奨）

### Cloud Build トリガーを設定すると:

✅ `main`ブランチにプッシュすると自動デプロイ
✅ ビルド履歴が記録される
✅ ロールバックが簡単

### 設定手順:

1. **Cloud Build APIを有効化**
   ```
   https://console.cloud.google.com/apis/library/cloudbuild.googleapis.com?project=sugu-study
   ```

2. **GitHubアプリをインストール**
   ```
   https://console.cloud.google.com/cloud-build/triggers/connect?project=sugu-study
   ```

3. **トリガーを作成**（上記の「方法1」を参照）

---

## 💰 コスト管理

### Cloud Runの料金

- **無料枠**: 月間200万リクエスト、36万vCPU秒、18万GiB秒
- **料金**: 無料枠を超えた分のみ課金

### 現在の設定:

```yaml
メモリ: 2Gi
CPU: 2
最小インスタンス: 0（コスト削減）
最大インスタンス: 10
```

### コスト削減のヒント:

- 最小インスタンスを0に設定（コールドスタート許容）
- 不要な時はサービスを停止
- Cloud Buildの履歴を定期的にクリーンアップ

---

## 🐛 トラブルシューティング

### ビルドが失敗する場合

1. **ログを確認**
   ```
   https://console.cloud.google.com/cloud-build/builds?project=sugu-study
   ```

2. **よくあるエラー:**
   - `npm install` エラー → `package-lock.json` を確認
   - `npm run build` エラー → ローカルで `npm run build` を実行して確認
   - 環境変数エラー → `.env.production` を確認

### デプロイは成功するが起動しない場合

1. **Cloud Runログを確認**
   ```
   https://console.cloud.google.com/logs/query?project=sugu-study
   ```

2. **よくある原因:**
   - ポート設定（Dockerfileで `PORT=3000` を確認）
   - 環境変数の不足
   - データベース接続エラー

### 認証エラーが出る場合

```bash
# 再ログイン
gcloud auth login

# Application Default Credentialsを再設定
gcloud auth application-default login

# プロジェクトを確認
gcloud config get-value project
```

---

## 📝 デプロイチェックリスト

### デプロイ前
- [ ] GitHubにすべての変更をプッシュ済み
- [ ] Supabaseマイグレーションを実行済み
- [ ] 環境変数を確認済み
- [ ] ローカルで `npm run build` が成功する

### デプロイ中
- [ ] Cloud Buildが実行中
- [ ] ビルドログにエラーがない
- [ ] Cloud Runにデプロイ中

### デプロイ後
- [ ] Cloud RunのURLにアクセス可能
- [ ] トップページが表示される
- [ ] 動画が再生される
- [ ] データベースからデータが取得できる
- [ ] エラーログがない

---

## 🌐 本番環境URL

デプロイ完了後、以下のURLで確認できます:

```
https://sugu-study-[RANDOM-HASH]-an.a.run.app
```

実際のURLはCloud Runコンソールで確認してください:
```
https://console.cloud.google.com/run/detail/asia-northeast1/sugu-study?project=sugu-study
```

---

## 📞 サポート

問題が発生した場合:

1. Cloud Buildのログを確認
2. Cloud Runのログを確認
3. ローカル環境でビルドを試す
4. 環境変数を再確認

---

## 🔄 次回以降のデプロイ

自動デプロイを設定した場合:

```bash
# コードを変更
git add .
git commit -m "Update feature"
git push

# 自動的にCloud Buildが実行され、Cloud Runにデプロイされます
```

手動デプロイの場合:

```bash
gcloud builds submit --config cloudbuild.yaml .
```

---

**今すぐデプロイを開始しましょう！** 🚀
