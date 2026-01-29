# ☁️ GCP Cloud Runデプロイガイド

このガイドでは、Sugu-StudyをGoogle Cloud Platform (GCP) のCloud Runにデプロイする手順を説明します。

## 📋 前提条件

- ✅ GCPアカウント（無料トライアルまたは有料アカウント）
- ✅ gcloud CLIがインストール済み
- ✅ GCPプロジェクト: `kirim3`
- ✅ 環境変数の準備
- ✅ Dockerfileとcloudbuild.yaml作成済み

## 🎯 ステップ1: GCP APIの有効化

### 1.1 Cloud Build APIの有効化

```bash
gcloud services enable cloudbuild.googleapis.com --project=kirim3
```

### 1.2 Cloud Run APIの有効化

```bash
gcloud services enable run.googleapis.com --project=kirim3
```

### 1.3 Container Registry APIの有効化

```bash
gcloud services enable containerregistry.googleapis.com --project=kirim3
```

## 🔐 ステップ2: 環境変数の設定

Cloud Runでは、環境変数を2つの方法で設定できます：

### 方法1: cloudbuild.yamlに直接記述（非推奨）

機密情報を含むため、本番環境では推奨しません。

### 方法2: Secret Managerを使用（推奨）

#### 2.1 Secret Manager APIの有効化

```bash
gcloud services enable secretmanager.googleapis.com --project=kirim3
```

#### 2.2 シークレットの作成

```bash
# Supabase URL
echo -n "https://tvvvwyrtakruwaylwmyb.supabase.co" | \
  gcloud secrets create supabase-url --data-file=- --project=kirim3

# Supabase Anon Key
echo -n "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." | \
  gcloud secrets create supabase-anon-key --data-file=- --project=kirim3

# Supabase Service Role Key
echo -n "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." | \
  gcloud secrets create supabase-service-role-key --data-file=- --project=kirim3

# Cloudflare Account ID
echo -n "933b96ef9d4f85409bc15a4935369fcf" | \
  gcloud secrets create cloudflare-account-id --data-file=- --project=kirim3

# App URL（デプロイ後に更新）
echo -n "https://sugu-study-xxx.run.app" | \
  gcloud secrets create app-url --data-file=- --project=kirim3
```

## 🏗️ ステップ3: cloudbuild.yamlの更新

現在の`cloudbuild.yaml`に環境変数設定を追加します：

```yaml
steps:
  # Build the container image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/kirim3/sugu-study:latest', '.']

  # Push the container image to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/kirim3/sugu-study:latest']

  # Deploy container image to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: 'gcloud'
    args:
      - 'run'
      - 'deploy'
      - 'sugu-study'
      - '--image'
      - 'gcr.io/kirim3/sugu-study:latest'
      - '--region'
      - 'asia-northeast1'
      - '--platform'
      - 'managed'
      - '--allow-unauthenticated'
      - '--set-env-vars'
      - 'NEXT_PUBLIC_SUPABASE_URL=https://tvvvwyrtakruwaylwmyb.supabase.co,NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID=933b96ef9d4f85409bc15a4935369fcf'
      - '--set-secrets'
      - 'NEXT_PUBLIC_SUPABASE_ANON_KEY=supabase-anon-key:latest,SUPABASE_SERVICE_ROLE_KEY=supabase-service-role-key:latest'
      - '--memory'
      - '2Gi'
      - '--cpu'
      - '2'
      - '--max-instances'
      - '10'
      - '--min-instances'
      - '0'

images:
  - 'gcr.io/kirim3/sugu-study:latest'

options:
  machineType: 'E2_HIGHCPU_8'
  logging: CLOUD_LOGGING_ONLY
```

## 🚀 ステップ4: 初回デプロイ

### 4.1 プロジェクトの設定確認

```bash
gcloud config get-value project
# 出力: kirim3
```

プロジェクトが違う場合は設定:

```bash
gcloud config set project kirim3
```

### 4.2 認証の確認

```bash
gcloud auth list
```

認証されていない場合:

```bash
gcloud auth login
```

### 4.3 Cloud Buildの実行

```bash
cd /Users/kabe/sugustudy
gcloud builds submit --config cloudbuild.yaml
```

ビルドプロセスが開始されます（通常10-15分）：

1. ソースコードのアップロード
2. Dockerイメージのビルド
3. Container Registryへのプッシュ
4. Cloud Runへのデプロイ

### 4.4 デプロイ完了の確認

デプロイが完了すると、URLが表示されます：

```
Service [sugu-study] revision [sugu-study-00001-xxx] has been deployed
and is serving 100 percent of traffic.
Service URL: https://sugu-study-xxx-an.a.run.app
```

## ✅ ステップ5: デプロイ後の設定

### 5.1 環境変数の追加設定

デプロイ後、追加の環境変数を設定する場合:

```bash
gcloud run services update sugu-study \
  --region asia-northeast1 \
  --update-env-vars NEXT_PUBLIC_APP_URL=https://sugu-study-xxx-an.a.run.app
```

### 5.2 カスタムドメインの設定

独自ドメインを使用する場合:

```bash
gcloud run domain-mappings create \
  --service sugu-study \
  --domain sugu-study.com \
  --region asia-northeast1
```

DNS設定の指示に従ってください。

### 5.3 リソースの調整

必要に応じてメモリとCPUを調整:

```bash
gcloud run services update sugu-study \
  --region asia-northeast1 \
  --memory 4Gi \
  --cpu 4
```

## 📊 ステップ6: 監視とログ

### 6.1 Cloud Runダッシュボード

ブラウザで以下のURLを開く:

```
https://console.cloud.google.com/run?project=kirim3
```

以下の情報を確認できます:
- リクエスト数
- レスポンスタイム
- エラー率
- コンテナインスタンス数

### 6.2 ログの確認

```bash
gcloud run services logs read sugu-study \
  --region asia-northeast1 \
  --limit 50
```

リアルタイムログの表示:

```bash
gcloud run services logs tail sugu-study \
  --region asia-northeast1
```

## 🔄 ステップ7: 継続的デプロイ

### 方法1: Cloud Build Triggerの設定

GitHubリポジトリと連携して自動デプロイを設定:

1. Cloud Consoleで「Cloud Build」→「Triggers」を開く

2. 「Create Trigger」をクリック

3. 以下を設定:
   - **Name**: `sugu-study-deploy`
   - **Event**: Push to a branch
   - **Source**: GitHub repository `sugukurukabe/study1`
   - **Branch**: `^main$`
   - **Configuration**: Cloud Build configuration file
   - **Location**: `/cloudbuild.yaml`

4. 「Create」をクリック

これで、mainブランチへのプッシュで自動デプロイされます。

### 方法2: 手動デプロイ

変更をプッシュした後、手動でデプロイ:

```bash
git push origin main
gcloud builds submit --config cloudbuild.yaml
```

## 🔧 トラブルシューティング

### ビルドエラー: "Permission denied"

**原因:** Cloud Build Service Accountの権限不足

**解決方法:**

```bash
PROJECT_NUMBER=$(gcloud projects describe kirim3 --format='value(projectNumber)')
gcloud projects add-iam-policy-binding kirim3 \
  --member=serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com \
  --role=roles/run.admin
```

### デプロイエラー: "Container failed to start"

**原因:** Dockerfileの設定ミスまたは環境変数の不足

**解決方法:**
1. ローカルでDockerイメージをビルド・テスト
2. ログを確認: `gcloud run services logs read sugu-study`
3. 環境変数を確認

### メモリ不足エラー

**原因:** Next.jsビルドに必要なメモリが不足

**解決方法:**

```bash
gcloud run services update sugu-study \
  --region asia-northeast1 \
  --memory 4Gi
```

### タイムアウトエラー

**原因:** リクエストタイムアウトの設定が短い

**解決方法:**

```bash
gcloud run services update sugu-study \
  --region asia-northeast1 \
  --timeout 300
```

## 💰 コスト管理

### Cloud Runの料金

- **リクエスト**: 100万リクエスト/月まで無料
- **CPU時間**: 180,000 vCPU秒/月まで無料
- **メモリ**: 360,000 GiB秒/月まで無料
- **ネットワーク**: 1GB/月まで無料

### コスト削減のヒント

1. **最小インスタンス数を0に設定** (デフォルト)
   ```bash
   gcloud run services update sugu-study \
     --region asia-northeast1 \
     --min-instances 0
   ```

2. **最大インスタンス数を制限**
   ```bash
   gcloud run services update sugu-study \
     --region asia-northeast1 \
     --max-instances 10
   ```

3. **不要なログを削減**
   - アプリケーションログを最小限に

## 📝 デプロイ後のチェックリスト

- [ ] Cloud Build成功
- [ ] Cloud Runサービス起動
- [ ] サービスURLにアクセス可能
- [ ] トップページが正常に表示
- [ ] 環境変数が正しく設定
- [ ] ログが正常に出力
- [ ] メモリ使用量が適切
- [ ] レスポンスタイムが良好
- [ ] カスタムドメイン設定（オプション）
- [ ] Cloud Build Trigger設定（オプション）

## 🎯 Vercel vs GCP Cloud Run

| 項目 | Vercel | GCP Cloud Run |
|------|--------|---------------|
| **セットアップ** | ⭐⭐⭐⭐⭐ 簡単 | ⭐⭐⭐ 中程度 |
| **自動デプロイ** | ✅ デフォルト | ⚙️ 設定が必要 |
| **コスト** | 無料枠が大きい | 無料枠あり |
| **パフォーマンス** | ⭐⭐⭐⭐⭐ 最適化済み | ⭐⭐⭐⭐ 良好 |
| **カスタマイズ** | ⭐⭐⭐ 制限あり | ⭐⭐⭐⭐⭐ 自由度高い |
| **監視** | Analytics付属 | Cloud Monitoring |

**推奨:** 
- **本番環境**: Vercel（簡単・高速）
- **ステージング/バックアップ**: GCP Cloud Run（柔軟性）

## 📞 サポート

問題が発生した場合:

1. GCPドキュメント: https://cloud.google.com/run/docs
2. Cloud Runサポート: https://cloud.google.com/support
3. Stack Overflow: https://stackoverflow.com/questions/tagged/google-cloud-run
