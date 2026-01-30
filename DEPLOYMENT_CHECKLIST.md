# 🚀 デプロイチェックリスト

## 📅 2026-01-29 デプロイ

---

## ✅ ステップ1: Supabaseマイグレーション実行

### 実行するSQL

📁 `/Users/kabe/sugustudy/supabase/migrations/008_livestock_videos.sql`

### 実行手順

1. **Supabase SQL Editorにアクセス**
   ```
   https://supabase.com/dashboard/project/YOUR_PROJECT/sql
   ```

2. **SQLファイルの内容をコピー＆実行**
   - 第一章（5レッスン）の動画ID設定
   - 第二章（3レッスン）の動画ID設定
   - 合計: 8レッスン × 2言語 = 16動画

3. **実行確認**
   ```sql
   SELECT 
     l.id,
     l.title_ja,
     CASE 
       WHEN l.cloudflare_video_id_ja IS NOT NULL THEN '✅ JA' 
       ELSE '❌ JA' 
     END as ja_status,
     CASE 
       WHEN l.cloudflare_video_id_id IS NOT NULL THEN '✅ ID' 
       ELSE '❌ ID' 
     END as id_status
   FROM lessons l
   WHERE l.id LIKE 'livestock-ch1%' OR l.id LIKE 'livestock-ch2%'
   ORDER BY l.id;
   ```

**期待される結果:** 8行すべてに ✅ JA と ✅ ID が表示される

---

## ✅ ステップ2: GCP Cloud Runにデプロイ

### 方法A: Cloud Console（推奨）

1. **Cloud Build トリガーページにアクセス**
   ```
   https://console.cloud.google.com/cloud-build/triggers?project=sugu-study
   ```

2. **トリガーがない場合は作成:**
   - 「トリガーを作成」をクリック
   - 名前: `deploy-main`
   - リポジトリ: `sugukurukabe/study1`
   - ブランチ: `^main$`
   - 構成ファイル: `/cloudbuild.yaml`
   - 「作成」をクリック

3. **トリガーを実行:**
   - 作成したトリガーの「実行」ボタンをクリック

4. **ビルド状況を確認:**
   ```
   https://console.cloud.google.com/cloud-build/builds?project=sugu-study
   ```

### 方法B: ターミナルから手動デプロイ

```bash
# 認証（初回のみ）
gcloud auth login
gcloud config set project sugu-study
gcloud auth application-default login

# デプロイ実行
cd /Users/kabe/sugustudy
gcloud builds submit --config cloudbuild.yaml .
```

**デプロイ時間:** 約5〜10分

---

## ✅ ステップ3: 本番環境で動作確認

### Cloud RunのURLを確認

```
https://console.cloud.google.com/run/detail/asia-northeast1/sugu-study?project=sugu-study
```

URLをクリックして本番環境にアクセス

### 確認項目

#### トップページ
- [ ] ページが正常に表示される
- [ ] 「2号とは？」セクションが表示される
- [ ] 動画が再生される（日本語版）
- [ ] 言語切り替えでインドネシア語版に切り替わる

#### 畜産業セクター
- [ ] トップページで「畜産業」（🐄）が表示される
- [ ] 畜産業をクリックすると4つの章が表示される

#### 第一章のレッスン
- [ ] 1. 酪農（乳用牛）- 動画再生確認
- [ ] 2. 牛肉生産（肉用牛）- 動画再生確認
- [ ] 3. 養豚 - 動画再生確認
- [ ] 4. 養鶏 - 動画再生確認
- [ ] 5. その他 - 動画再生確認

#### 第二章のレッスン
- [ ] 1. 乳用牛 - 動画再生確認
- [ ] 2. 肉用牛 - 動画再生確認
- [ ] 3. 豚 - 動画再生確認

#### 多言語対応
- [ ] 日本語版の動画が再生される
- [ ] 言語切り替えボタンが表示される
- [ ] インドネシア語に切り替えると動画が変わる
- [ ] 再生位置が維持される

#### モバイル確認
- [ ] スマートフォンでアクセス
- [ ] 言語切り替えボタンがタップしやすい
- [ ] 動画が正常に再生される

---

## 📊 デプロイ内容サマリー

### データベース
- ✅ 畜産業セクター作成済み
- ✅ 4つの章（カテゴリー）作成済み
- ✅ 19個のレッスン作成済み
- 🆕 8レッスンに動画ID設定（第一章5個 + 第二章3個）

### 動画
- ✅ トップページ概要動画: 2本
- 🆕 畜産業第一章: 10本（5レッスン × 2言語）
- 🆕 畜産業第二章: 6本（3レッスン × 2言語）
- ⏳ 畜産業第二章残り: 6本（3レッスン × 2言語）
- ⏳ 畜産業第三章: 12本（6レッスン × 2言語）
- ⏳ 畜産業第四章: 4本（2レッスン × 2言語）

**合計アップロード済み:** 18本 / 38本（47%完了）

### コード変更
- ✅ 多言語動画対応UI実装
- ✅ 言語切り替え機能（モバイル最適化）
- ✅ トップページ文言修正
- ✅ GCPプロジェクトID修正

---

## 🐛 トラブルシューティング

### Supabaseマイグレーションでエラーが出る場合

```sql
-- レッスンIDを確認
SELECT id, title_ja FROM lessons WHERE id LIKE 'livestock%' ORDER BY id;

-- 動画IDが設定されているか確認
SELECT id, cloudflare_video_id_ja, cloudflare_video_id_id 
FROM lessons 
WHERE id LIKE 'livestock-ch1%' OR id LIKE 'livestock-ch2%';
```

### Cloud Buildが失敗する場合

1. **ログを確認**
   ```
   https://console.cloud.google.com/cloud-build/builds?project=sugu-study
   ```

2. **よくあるエラー:**
   - ビルドエラー → ローカルで `npm run build` を実行
   - 権限エラー → Cloud Build APIが有効か確認
   - タイムアウト → マシンタイプを確認

### 動画が再生されない場合

1. **Cloudflare Streamで動画の状態を確認**
   - すべての動画が「Ready」状態か確認

2. **Video IDが正しいか確認**
   ```sql
   SELECT id, cloudflare_video_id_ja, cloudflare_video_id_id 
   FROM lessons 
   WHERE id = 'livestock-ch1-01';
   ```

3. **ブラウザの開発者ツールでエラーを確認**
   - Console タブでJavaScriptエラー
   - Network タブで動画リクエスト

---

## 📝 次のステップ

### 残りの動画をアップロード

#### 第二章（残り3レッスン）
- [ ] 4a. 採卵鶏（日本語・インドネシア語）
- [ ] 4b. 肉用鶏（日本語・インドネシア語）
- [ ] 5. その他（日本語・インドネシア語）

#### 第三章（6レッスン）
- [ ] 1. 農場の衛生・安全管理
- [ ] 2. 乳用牛
- [ ] 3. 肉用牛
- [ ] 4. 豚
- [ ] 5. 養鶏
- [ ] 6. その他

#### 第四章（2レッスン）
- [ ] 1. 実技試験対策
- [ ] 2. 専門用語集

---

## 🎯 完了条件

- [x] Supabaseマイグレーション実行
- [ ] GCP Cloud Runデプロイ完了
- [ ] 本番環境で動作確認完了
- [ ] 8レッスンの動画が正常に再生される
- [ ] 言語切り替えが機能する

---

## 📞 サポート

問題が発生した場合:
1. エラーログを確認（Cloud Build / Cloud Run）
2. Supabaseのデータを確認
3. ローカル環境でテスト

---

**今すぐデプロイを開始しましょう！** 🚀

1. Supabaseマイグレーション実行
2. GCP Cloud Runデプロイ
3. 本番環境で確認
