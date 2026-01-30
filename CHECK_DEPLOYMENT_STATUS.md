# 🔍 デプロイ状況確認ガイド

## 現在の状況（画像から確認）

### Cloud Build履歴
- ✅ トリガーは作成済み
- ✅ ビルドは実行されている
- ⚠️ いくつかのビルドが失敗している（赤い×マーク）
- ✅ 最新の成功ビルド: `b464c14` (2026/01/30 1:27)

---

## 🔍 確認すべきポイント

### 1. 最新のビルドが成功しているか

**確認方法:**
1. Cloud Build履歴ページで最新のビルドをクリック
   ```
   https://console.cloud.google.com/cloud-build/builds?project=sugu-study
   ```

2. ビルドログを確認
   - ✅ 緑のチェックマーク = 成功
   - ❌ 赤い×マーク = 失敗
   - 🟡 黄色の時計マーク = 実行中

### 2. 失敗したビルドの原因を確認

**よくある失敗の原因:**

#### エラー1: npm install失敗
```
ERROR: npm ERR! code ENOENT
```
**解決策:** `package-lock.json`を確認、または削除して再生成

#### エラー2: npm run build失敗
```
ERROR: Type error: ...
```
**解決策:** TypeScriptのエラーを修正

#### エラー3: Docker build失敗
```
ERROR: failed to solve with frontend dockerfile.v0
```
**解決策:** Dockerfileの構文を確認

#### エラー4: Cloud Run deploy失敗
```
ERROR: (gcloud.run.deploy) PERMISSION_DENIED
```
**解決策:** サービスアカウントの権限を確認

---

## 🚀 最新コードをデプロイする方法

### 方法1: トリガーを手動実行

1. **Cloud Build トリガーページにアクセス**
   ```
   https://console.cloud.google.com/cloud-build/triggers?project=sugu-study
   ```

2. **`deploy-main` トリガーを見つける**

3. **右側の「実行」ボタンをクリック**

4. **ビルド状況を確認**
   ```
   https://console.cloud.google.com/cloud-build/builds?project=sugu-study
   ```

### 方法2: GitHubに空コミットをプッシュ

```bash
# 空コミットを作成してトリガーを発火
git commit --allow-empty -m "Trigger deployment"
git push
```

これで自動的にCloud Buildが実行されます。

---

## 📊 Cloud Runの現在の状態を確認

### ステップ1: Cloud Runサービスページにアクセス

```
https://console.cloud.google.com/run/detail/asia-northeast1/sugu-study?project=sugu-study
```

### ステップ2: 確認項目

1. **最新のリビジョン**
   - リビジョン名をクリック
   - デプロイ日時を確認
   - 「2026/01/30」の最新のものか？

2. **トラフィック配分**
   - 最新リビジョンに100%のトラフィックが向いているか？
   - 古いリビジョンにトラフィックが残っていないか？

3. **環境変数**
   - `NEXT_PUBLIC_SUPABASE_URL` が設定されているか
   - `NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID` が設定されているか

### ステップ3: サービスURLにアクセス

Cloud RunページのURLをクリックして本番環境を確認

---

## 🔧 問題の診断フロー

### ケース1: ビルドは成功するが、変更が反映されない

**原因:**
- 古いリビジョンにトラフィックが向いている
- ブラウザのキャッシュ

**解決策:**
```bash
# 1. Cloud Runで最新リビジョンを確認
# 2. トラフィックが100%最新リビジョンに向いているか確認
# 3. ブラウザのキャッシュをクリア（Cmd+Shift+R）
```

### ケース2: ビルドが失敗する

**診断手順:**
1. 失敗したビルドをクリック
2. ログを確認
3. エラーメッセージを特定
4. 上記の「よくある失敗の原因」を参照

### ケース3: デプロイは成功するが、アプリが起動しない

**診断手順:**
1. Cloud Runのログを確認
   ```
   https://console.cloud.google.com/logs/query?project=sugu-study
   ```
2. 起動エラーを確認
3. 環境変数が正しく設定されているか確認

---

## 📝 今すぐ実行する手順

### ステップ1: 最新のビルドログを確認

1. **Cloud Build履歴ページ**
   ```
   https://console.cloud.google.com/cloud-build/builds?project=sugu-study
   ```

2. **最新のビルドをクリック**

3. **ログを確認**
   - 成功している場合: 次のステップへ
   - 失敗している場合: エラーメッセージを確認

### ステップ2: Cloud Runの状態を確認

1. **Cloud Runサービスページ**
   ```
   https://console.cloud.google.com/run/detail/asia-northeast1/sugu-study?project=sugu-study
   ```

2. **最新リビジョンを確認**
   - デプロイ日時が最新か？
   - トラフィックが100%か？

### ステップ3: 本番環境を確認

1. **Cloud RunのURLにアクセス**

2. **確認項目:**
   - [ ] トップページが表示される
   - [ ] 「2号とは？」の動画が再生される
   - [ ] 畜産業セクターが表示される
   - [ ] 第一章・第二章のレッスンが表示される
   - [ ] 動画が再生される
   - [ ] 言語切り替えが機能する

### ステップ4: 変更が反映されていない場合

**オプションA: トリガーを手動実行**
```
https://console.cloud.google.com/cloud-build/triggers?project=sugu-study
```
「実行」ボタンをクリック

**オプションB: 空コミットをプッシュ**
```bash
git commit --allow-empty -m "Trigger deployment"
git push
```

---

## 🎯 期待される結果

### 最新のデプロイ内容

1. **トップページ**
   - 「2号とは？」のタイトル
   - 日本語版・インドネシア語版の動画

2. **畜産業セクター**
   - 4つの章が表示される
   - 第一章: 5レッスン（動画付き）
   - 第二章: 6レッスン（3レッスンは動画付き）

3. **多言語対応**
   - 言語切り替えボタンが動画プレイヤーに表示される
   - 日本語⇔インドネシア語の切り替えが機能する

---

## 📞 次のアクション

### 確認してほしいこと

1. **最新のビルドのステータス**
   - 成功（緑）？失敗（赤）？

2. **失敗している場合**
   - エラーメッセージは何？
   - どのステップで失敗している？

3. **成功している場合**
   - Cloud Runの最新リビジョンのデプロイ日時は？
   - 本番環境で変更が反映されている？

---

## 🔍 詳細確認コマンド

```bash
# Cloud Runサービスの詳細を確認
gcloud run services describe sugu-study \
  --region=asia-northeast1 \
  --platform=managed

# 最新のリビジョンを確認
gcloud run revisions list \
  --service=sugu-study \
  --region=asia-northeast1 \
  --platform=managed \
  --limit=5

# 最新のビルドを確認
gcloud builds list --limit=5
```

---

**次に確認すべきこと:**

1. 最新のビルドが成功しているか？
2. Cloud Runの最新リビジョンはいつデプロイされたか？
3. 本番環境で何が表示されているか？

これらの情報を教えていただければ、具体的な解決策を提案できます！
