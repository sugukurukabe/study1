# 📹 コンテンツアップロードガイド

このガイドでは、農業分野の動画と音声コンテンツをアップロードする手順を説明します。

## 前提条件

- ✅ Supabaseマイグレーション（005, 006）が完了していること
- ✅ Cloudflare Streamアカウントが設定済みであること
- ✅ 動画ファイルと音声ファイルが準備できていること

## 📁 必要なコンテンツ

### 動画ファイル（5本）
1. **agri-001**: 日本農業の概要（約15分）
2. **agri-002**: 食料自給率と農業政策（約20分）
3. **agri-003**: 土壌の基礎知識（約15分）
4. **agri-004**: 農作業の安全対策（約18分）
5. **agri-005**: 稲作の年間スケジュール（約20分）

### 音声ファイル（5本）
1. **agri-001.mp3**: 日本農業の概要
2. **agri-002.mp3**: 食料自給率と農業政策
3. **agri-003.mp3**: 土壌の基礎知識
4. **agri-004.mp3**: 農作業の安全対策
5. **agri-005.mp3**: 稲作の年間スケジュール

## 🎬 ステップ1: Cloudflare Streamへ動画アップロード

### 1.1 Cloudflareダッシュボードにアクセス

1. ブラウザで以下のURLを開く:
   ```
   https://dash.cloudflare.com/
   ```

2. ログイン

3. アカウントID: `933b96ef9d4f85409bc15a4935369fcf` を確認

### 1.2 Streamセクションに移動

1. 左サイドバーから「Stream」をクリック
2. 「Upload」ボタンをクリック

### 1.3 動画をアップロード

各動画ファイルを1つずつアップロードします：

1. **ファイルを選択** または **ドラッグ&ドロップ**
2. アップロード完了を待つ
3. **Video ID**をコピーしてメモ（例: `abc123def456ghi789jkl012`）

**メモテンプレート:**
```
agri-001: [Video ID]
agri-002: [Video ID]
agri-003: [Video ID]
agri-004: [Video ID]
agri-005: [Video ID]
```

### 1.4 動画設定（オプション）

各動画の設定画面で以下を設定できます：
- **Title**: レッスンタイトル（日本語）
- **Thumbnail**: サムネイル画像
- **Allowed Origins**: `https://sugu-study.vercel.app`（本番URL）

## 🎵 ステップ2: Supabase Storageへ音声アップロード

### 2.1 Supabaseダッシュボードにアクセス

1. ブラウザで以下のURLを開く:
   ```
   https://supabase.com/dashboard/project/tvvvwyrtakruwaylwmyb
   ```

2. 左サイドバーから「Storage」をクリック

### 2.2 audioバケットを開く

1. `audio`バケットをクリック
2. 「Create folder」をクリック
3. フォルダ名: `lessons` を入力して作成

### 2.3 音声ファイルをアップロード

1. `lessons`フォルダを開く
2. 「Upload file」をクリック
3. 5つの音声ファイルを選択してアップロード：
   - `agri-001.mp3`
   - `agri-002.mp3`
   - `agri-003.mp3`
   - `agri-004.mp3`
   - `agri-005.mp3`

### 2.4 パスの確認

アップロード後、各ファイルのパスは以下のようになります：
```
lessons/agri-001.mp3
lessons/agri-002.mp3
lessons/agri-003.mp3
lessons/agri-004.mp3
lessons/agri-005.mp3
```

## 🔗 ステップ3: レッスンデータの更新

### 方法1: SQL Editorで直接更新（推奨）

Supabase SQL Editorで以下のSQLを実行します：

```sql
-- agri-001の更新
UPDATE lessons SET 
  cloudflare_video_id = 'YOUR_VIDEO_ID_001',
  audio_storage_path = 'lessons/agri-001.mp3'
WHERE id = 'agri-001';

-- agri-002の更新
UPDATE lessons SET 
  cloudflare_video_id = 'YOUR_VIDEO_ID_002',
  audio_storage_path = 'lessons/agri-002.mp3'
WHERE id = 'agri-002';

-- agri-003の更新
UPDATE lessons SET 
  cloudflare_video_id = 'YOUR_VIDEO_ID_003',
  audio_storage_path = 'lessons/agri-003.mp3'
WHERE id = 'agri-003';

-- agri-004の更新
UPDATE lessons SET 
  cloudflare_video_id = 'YOUR_VIDEO_ID_004',
  audio_storage_path = 'lessons/agri-004.mp3'
WHERE id = 'agri-004';

-- agri-005の更新
UPDATE lessons SET 
  cloudflare_video_id = 'YOUR_VIDEO_ID_005',
  audio_storage_path = 'lessons/agri-005.mp3'
WHERE id = 'agri-005';
```

**注意:** `YOUR_VIDEO_ID_XXX`を実際のCloudflare Video IDに置き換えてください。

### 方法2: 管理画面から更新

1. ローカル環境を起動:
   ```bash
   npm run dev
   ```

2. ブラウザで管理画面を開く:
   ```
   http://localhost:3000/admin/lessons
   ```

3. 各レッスンを編集:
   - レッスンをクリック
   - 「Cloudflare Stream Video ID」フィールドにVideo IDを入力
   - 「音声ファイルパス」フィールドに`lessons/agri-XXX.mp3`を入力
   - 「保存」をクリック

## ✅ 確認

### 動画再生の確認

1. ローカル環境でレッスンページを開く:
   ```
   http://localhost:3000/learn/agri-001
   ```

2. 「動画」タブで動画が再生できることを確認

3. 「音声」タブで音声が再生できることを確認

### データベースの確認

SQL Editorで以下のクエリを実行:

```sql
SELECT 
  id, 
  title_ja, 
  cloudflare_video_id, 
  audio_storage_path 
FROM lessons 
WHERE id LIKE 'agri-%'
ORDER BY id;
```

すべてのレッスンに`cloudflare_video_id`と`audio_storage_path`が設定されていることを確認してください。

## 🎯 次のステップ

コンテンツアップロードが完了したら、以下に進んでください：

1. ✅ Vercelへデプロイ
2. ✅ 本番環境でのテスト
3. ✅ 他の分野（畜産、建設など）のコンテンツ追加

## 📊 アップロード状況チェックリスト

### Cloudflare Stream
- [ ] agri-001動画アップロード完了（Video ID取得）
- [ ] agri-002動画アップロード完了（Video ID取得）
- [ ] agri-003動画アップロード完了（Video ID取得）
- [ ] agri-004動画アップロード完了（Video ID取得）
- [ ] agri-005動画アップロード完了（Video ID取得）

### Supabase Storage
- [ ] lessons/agri-001.mp3アップロード完了
- [ ] lessons/agri-002.mp3アップロード完了
- [ ] lessons/agri-003.mp3アップロード完了
- [ ] lessons/agri-004.mp3アップロード完了
- [ ] lessons/agri-005.mp3アップロード完了

### データベース更新
- [ ] agri-001のVideo IDと音声パス設定完了
- [ ] agri-002のVideo IDと音声パス設定完了
- [ ] agri-003のVideo IDと音声パス設定完了
- [ ] agri-004のVideo IDと音声パス設定完了
- [ ] agri-005のVideo IDと音声パス設定完了

### 動作確認
- [ ] agri-001の動画再生確認
- [ ] agri-001の音声再生確認
- [ ] 全レッスンの動作確認完了

## 🚨 トラブルシューティング

### 動画が再生できない
- Cloudflare Account IDが正しく設定されているか確認
- Video IDが正しいか確認
- ブラウザのコンソールでエラーを確認

### 音声が再生できない
- Supabase Storageのaudioバケットが公開設定になっているか確認
- ファイルパスが正しいか確認（`lessons/agri-XXX.mp3`）
- ブラウザのネットワークタブでファイルが取得できているか確認

### アップロードが遅い
- Cloudflare Stream: 動画サイズが大きい場合は時間がかかります
- Supabase Storage: 複数ファイルを一度にアップロードできます
