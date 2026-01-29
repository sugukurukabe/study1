# 畜産業動画アップロードガイド

## 📹 畜産業（Livestock）の動画アップロード手順

### 前提条件
- Cloudflare Streamアカウントへのアクセス権
- 畜産業の動画ファイル（日本語版・インドネシア語版）
- Supabaseへのアクセス権

---

## ステップ1: Cloudflare Streamに動画をアップロード

### 1.1 Cloudflare Dashboardにログイン
```
https://dash.cloudflare.com/
```

### 1.2 Stream セクションに移動
1. 左サイドバーから「Stream」を選択
2. 「Upload Video」ボタンをクリック

### 1.3 動画をアップロード
各レッスンごとに**2つの動画**をアップロードします：

#### 畜産業の動画リスト
```
livestock-001-ja.mp4  → 日本語版
livestock-001-id.mp4  → インドネシア語版

livestock-002-ja.mp4  → 日本語版
livestock-002-id.mp4  → インドネシア語版

livestock-003-ja.mp4  → 日本語版
livestock-003-id.mp4  → インドネシア語版

livestock-004-ja.mp4  → 日本語版
livestock-004-id.mp4  → インドネシア語版

livestock-005-ja.mp4  → 日本語版
livestock-005-id.mp4  → インドネシア語版
```

### 1.4 Video IDを記録
アップロード完了後、各動画の**Video ID**（32文字の英数字）を記録します。

**記録用テンプレート：**
```
livestock-001-ja: [Video ID]
livestock-001-id: [Video ID]

livestock-002-ja: [Video ID]
livestock-002-id: [Video ID]

livestock-003-ja: [Video ID]
livestock-003-id: [Video ID]

livestock-004-ja: [Video ID]
livestock-004-id: [Video ID]

livestock-005-ja: [Video ID]
livestock-005-id: [Video ID]
```

---

## ステップ2: Supabaseで畜産業セクターとレッスンを作成

### 2.1 Supabase SQL Editorにアクセス
```
https://supabase.com/dashboard/project/YOUR_PROJECT/sql
```

### 2.2 畜産業セクターとカテゴリーを作成

```sql
-- 畜産業セクターを作成
INSERT INTO sectors (id, name_ja, name_id, name_vi, name_en, description_ja, icon, color, display_order)
VALUES (
  'livestock',
  '畜産業',
  'Peternakan',
  'Chăn nuôi',
  'Livestock',
  '畜産業における特定技能2号試験の対策コンテンツ',
  '🐄',
  'amber',
  2
)
ON CONFLICT (id) DO UPDATE SET
  name_ja = EXCLUDED.name_ja,
  name_id = EXCLUDED.name_id,
  name_vi = EXCLUDED.name_vi,
  name_en = EXCLUDED.name_en,
  description_ja = EXCLUDED.description_ja,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color,
  display_order = EXCLUDED.display_order;

-- 畜産業のカテゴリーを作成
INSERT INTO categories (id, sector_id, name_ja, name_id, name_vi, name_en, description_ja, display_order)
VALUES 
  ('livestock-basics', 'livestock', '畜産業の基礎', 'Dasar-dasar Peternakan', 'Cơ bản về chăn nuôi', 'Livestock Basics', '畜産業の基本的な知識と技能', 1),
  ('livestock-management', 'livestock', '飼養管理', 'Manajemen Pemeliharaan', 'Quản lý chăn nuôi', 'Livestock Management', '家畜の飼養管理技術', 2),
  ('livestock-health', 'livestock', '家畜衛生', 'Kesehatan Ternak', 'Vệ sinh gia súc', 'Livestock Health', '家畜の健康管理と衛生', 3)
ON CONFLICT (id) DO NOTHING;
```

### 2.3 畜産業のレッスンを作成

```sql
-- 畜産業のレッスンを作成
INSERT INTO lessons (
  id, 
  category_id, 
  title_ja, 
  title_id, 
  title_vi, 
  title_en,
  description_ja,
  display_order,
  duration_minutes,
  tier_required
)
VALUES 
  -- 畜産業の基礎カテゴリー
  ('livestock-001', 'livestock-basics', '畜産業の概要', 'Gambaran Umum Peternakan', 'Tổng quan về chăn nuôi', 'Overview of Livestock', '畜産業の全体像と特定技能2号の役割', 1, 15, 1),
  ('livestock-002', 'livestock-basics', '家畜の種類と特性', 'Jenis dan Karakteristik Ternak', 'Các loại và đặc điểm gia súc', 'Types and Characteristics of Livestock', '主要な家畜の種類と特性の理解', 2, 20, 1),
  
  -- 飼養管理カテゴリー
  ('livestock-003', 'livestock-management', '飼料管理', 'Manajemen Pakan', 'Quản lý thức ăn', 'Feed Management', '適切な飼料管理の方法', 1, 18, 1),
  ('livestock-004', 'livestock-management', '繁殖管理', 'Manajemen Reproduksi', 'Quản lý sinh sản', 'Breeding Management', '家畜の繁殖管理技術', 2, 22, 1),
  
  -- 家畜衛生カテゴリー
  ('livestock-005', 'livestock-health', '疾病予防', 'Pencegahan Penyakit', 'Phòng bệnh', 'Disease Prevention', '家畜の疾病予防と対策', 1, 20, 1)
ON CONFLICT (id) DO NOTHING;
```

---

## ステップ3: レッスンに動画IDを設定

### 3.1 記録したVideo IDを使用してレッスンを更新

**重要：** 以下のSQLの`[VIDEO_ID_JA]`と`[VIDEO_ID_ID]`を、ステップ1.4で記録した実際のVideo IDに置き換えてください。

```sql
-- livestock-001 の動画IDを設定
UPDATE lessons SET 
  cloudflare_video_id_ja = '[VIDEO_ID_JA]',
  cloudflare_video_id_id = '[VIDEO_ID_ID]'
WHERE id = 'livestock-001';

-- livestock-002 の動画IDを設定
UPDATE lessons SET 
  cloudflare_video_id_ja = '[VIDEO_ID_JA]',
  cloudflare_video_id_id = '[VIDEO_ID_ID]'
WHERE id = 'livestock-002';

-- livestock-003 の動画IDを設定
UPDATE lessons SET 
  cloudflare_video_id_ja = '[VIDEO_ID_JA]',
  cloudflare_video_id_id = '[VIDEO_ID_ID]'
WHERE id = 'livestock-003';

-- livestock-004 の動画IDを設定
UPDATE lessons SET 
  cloudflare_video_id_ja = '[VIDEO_ID_JA]',
  cloudflare_video_id_id = '[VIDEO_ID_ID]'
WHERE id = 'livestock-004';

-- livestock-005 の動画IDを設定
UPDATE lessons SET 
  cloudflare_video_id_ja = '[VIDEO_ID_JA]',
  cloudflare_video_id_id = '[VIDEO_ID_ID]'
WHERE id = 'livestock-005';
```

---

## ステップ4: 動作確認

### 4.1 レッスンデータの確認
```sql
SELECT 
  id,
  title_ja,
  cloudflare_video_id_ja,
  cloudflare_video_id_id
FROM lessons
WHERE category_id LIKE 'livestock-%'
ORDER BY display_order;
```

### 4.2 ブラウザで確認
1. アプリケーションにアクセス
2. 「畜産業」セクターを選択
3. 各カテゴリーのレッスンを開く
4. 動画が正しく再生されるか確認
5. 言語切り替えボタンで日本語版・インドネシア語版が切り替わるか確認

---

## トラブルシューティング

### 動画が再生されない場合
1. **Video IDの確認**
   - Cloudflare Streamで正しいVideo IDをコピーしたか確認
   - SQLの`UPDATE`文で正しく設定されているか確認

2. **環境変数の確認**
   ```bash
   # .env.local または .env.production
   NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID=933b96ef9d4f85409bc15a4935369fcf
   ```

3. **動画の処理状態を確認**
   - Cloudflare Streamで動画が「Ready」状態になっているか確認
   - アップロード直後は処理中の可能性があります（数分待つ）

### 言語切り替えが機能しない場合
1. 両方の言語の動画IDが設定されているか確認
2. ブラウザのキャッシュをクリア
3. 開発者ツールのコンソールでエラーを確認

---

## 次のステップ

✅ 畜産業の動画アップロード完了後：
1. 他のセクター（漁業、建設など）の動画をアップロード
2. 音声ファイルをSupabase Storageにアップロード
3. テキストコンテンツを追加
4. 本番環境にデプロイ

---

## 参考情報

- **Cloudflare Stream ドキュメント**: https://developers.cloudflare.com/stream/
- **Supabase ドキュメント**: https://supabase.com/docs
- **プロジェクトのREADME**: `/Users/kabe/sugustudy/README.md`
- **コンテンツアップロードガイド**: `/Users/kabe/sugustudy/CONTENT_UPLOAD_GUIDE.md`
