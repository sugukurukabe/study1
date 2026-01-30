# 🔧 デプロイ問題のトラブルシューティング

## 🚨 発見された問題

### 問題1: Cloud Buildの自動トリガーが未設定

**症状:**
- GitHubにプッシュしてもCloud Runが更新されない
- 最新のコードが本番環境に反映されない

**原因:**
Cloud Build トリガーが設定されていないため、GitHubへのプッシュが自動的にデプロイを開始しない

---

## ✅ 解決方法

### 方法1: Cloud Build トリガーを設定（推奨）

#### ステップ1: Cloud Build APIを有効化

1. **Cloud Build APIページにアクセス**
   ```
   https://console.cloud.google.com/apis/library/cloudbuild.googleapis.com?project=sugu-study
   ```

2. **「有効にする」をクリック**

#### ステップ2: GitHubリポジトリを接続

1. **Cloud Build トリガーページにアクセス**
   ```
   https://console.cloud.google.com/cloud-build/triggers?project=sugu-study
   ```

2. **「トリガーを作成」をクリック**

3. **「リポジトリを接続」を選択**
   - ソース: `GitHub`
   - 「続行」をクリック

4. **GitHubアカウントを認証**
   - GitHubにログイン
   - Cloud Buildアプリをインストール
   - リポジトリ `sugukurukabe/study1` を選択

5. **トリガーを設定**
   ```
   名前: deploy-main
   説明: Deploy to Cloud Run on push to main
   イベント: ブランチにプッシュ
   ソース: sugukurukabe/study1
   ブランチ: ^main$
   構成: Cloud Build構成ファイル（yaml または json）
   Cloud Build構成ファイルの場所: /cloudbuild.yaml
   ```

6. **「作成」をクリック**

#### ステップ3: トリガーをテスト

1. トリガー一覧で作成したトリガーを見つける
2. 右側の「実行」ボタンをクリック
3. ビルドが開始されることを確認

---

### 方法2: 手動デプロイ（一時的な解決策）

#### 前提条件: 認証

```bash
# GCPにログイン
gcloud auth login

# プロジェクトを設定
gcloud config set project sugu-study

# Application Default Credentialsを設定
gcloud auth application-default login
```

#### デプロイコマンド

```bash
# プロジェクトディレクトリに移動
cd /Users/kabe/sugustudy

# Cloud Buildを実行
gcloud builds submit --config cloudbuild.yaml .
```

**実行時間:** 約5〜10分

---

## 📊 デプロイ状況の確認方法

### 1. Cloud Buildの履歴を確認

```
https://console.cloud.google.com/cloud-build/builds?project=sugu-study
```

**確認項目:**
- 最新のビルドがいつ実行されたか
- ビルドのステータス（成功/失敗）
- ビルドログにエラーがないか

### 2. Cloud Runサービスを確認

```
https://console.cloud.google.com/run/detail/asia-northeast1/sugu-study?project=sugu-study
```

**確認項目:**
- 最新のリビジョンがいつデプロイされたか
- 現在のトラフィック配分
- サービスのURL

### 3. 現在のリビジョンを確認

```bash
gcloud run revisions list \
  --service=sugu-study \
  --region=asia-northeast1 \
  --platform=managed \
  --limit=5
```

---

## 🔍 問題の診断

### チェックリスト

- [ ] Cloud Build APIが有効になっているか
- [ ] Cloud Build トリガーが作成されているか
- [ ] GitHubリポジトリが正しく接続されているか
- [ ] トリガーのブランチ設定が `^main$` になっているか
- [ ] `cloudbuild.yaml` がリポジトリのルートにあるか
- [ ] Cloud Buildサービスアカウントに適切な権限があるか

### よくある問題

#### 問題: トリガーが実行されない

**原因:**
- GitHubアプリがインストールされていない
- リポジトリのアクセス権限がない
- ブランチ名が一致しない

**解決策:**
1. GitHubの設定でCloud Buildアプリを確認
2. リポジトリへのアクセス権限を付与
3. ブランチ名を確認（`main` vs `master`）

#### 問題: ビルドは成功するがデプロイされない

**原因:**
- Cloud Runサービスが存在しない
- サービスアカウントの権限不足
- リージョンの不一致

**解決策:**
```bash
# Cloud Runサービスを確認
gcloud run services list --platform managed --region asia-northeast1

# サービスが存在しない場合は初回デプロイ
gcloud builds submit --config cloudbuild.yaml .
```

#### 問題: ビルドが失敗する

**原因:**
- `npm install` エラー
- `npm run build` エラー
- Dockerビルドエラー

**解決策:**
1. ローカルで `npm run build` を実行して確認
2. `package-lock.json` を確認
3. Cloud Buildのログを詳細に確認

---

## 🚀 今すぐ実行する手順

### ステップ1: Cloud Build トリガーを設定

1. **Cloud Build トリガーページにアクセス**
   ```
   https://console.cloud.google.com/cloud-build/triggers?project=sugu-study
   ```

2. **トリガーを作成**（上記の「方法1」を参照）

### ステップ2: 手動でトリガーを実行

1. 作成したトリガーの「実行」ボタンをクリック

2. **ビルド状況を確認**
   ```
   https://console.cloud.google.com/cloud-build/builds?project=sugu-study
   ```

3. **ビルドログを確認**
   - エラーがないか確認
   - デプロイが成功したか確認

### ステップ3: Cloud Runを確認

1. **Cloud Runサービスページにアクセス**
   ```
   https://console.cloud.google.com/run/detail/asia-northeast1/sugu-study?project=sugu-study
   ```

2. **最新のリビジョンを確認**
   - デプロイ時刻が最新か確認
   - トラフィックが100%最新リビジョンに向いているか確認

### ステップ4: 本番環境で確認

1. Cloud RunのURLにアクセス
2. 最新の変更が反映されているか確認
   - トップページの動画
   - 畜産業セクター
   - 第一章・第二章のレッスン動画

---

## 📝 今後の自動デプロイフロー

トリガー設定後の流れ:

```
1. コードを変更
   ↓
2. git add . && git commit -m "message" && git push
   ↓
3. GitHubにプッシュ
   ↓
4. Cloud Build トリガーが自動実行
   ↓
5. Dockerイメージをビルド
   ↓
6. Container Registryにプッシュ
   ↓
7. Cloud Runにデプロイ
   ↓
8. 本番環境が自動更新 ✅
```

**所要時間:** 約5〜10分

---

## 🔐 必要な権限

Cloud Buildサービスアカウントに以下の権限が必要:

- `Cloud Run 管理者` (roles/run.admin)
- `サービス アカウント ユーザー` (roles/iam.serviceAccountUser)
- `ストレージ オブジェクト閲覧者` (roles/storage.objectViewer)

### 権限を確認・付与する方法

```
https://console.cloud.google.com/iam-admin/iam?project=sugu-study
```

1. Cloud Buildサービスアカウントを見つける
   - 形式: `[PROJECT_NUMBER]@cloudbuild.gserviceaccount.com`
2. 上記の権限が付与されているか確認
3. 不足している場合は「編集」から追加

---

## 📞 サポート

### 問題が解決しない場合

1. **Cloud Buildのログを確認**
   ```
   https://console.cloud.google.com/cloud-build/builds?project=sugu-study
   ```

2. **Cloud Runのログを確認**
   ```
   https://console.cloud.google.com/logs/query?project=sugu-study&query=resource.type%3D%22cloud_run_revision%22
   ```

3. **ローカルでビルドをテスト**
   ```bash
   npm run build
   docker build -t test .
   ```

---

## ✅ 完了チェックリスト

- [ ] Cloud Build APIを有効化
- [ ] Cloud Build トリガーを作成
- [ ] GitHubリポジトリを接続
- [ ] トリガーを手動実行してテスト
- [ ] ビルドが成功することを確認
- [ ] Cloud Runに最新リビジョンがデプロイされることを確認
- [ ] 本番環境で最新の変更が反映されることを確認

---

**今すぐCloud Build トリガーを設定しましょう！** 🚀

設定完了後、GitHubにプッシュするだけで自動的にデプロイされます。
