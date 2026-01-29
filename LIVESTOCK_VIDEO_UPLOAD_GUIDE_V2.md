# 畜産業動画アップロードガイド（改訂版）

## 📹 畜産業の新しいコンテンツ構造

### コンテンツ構成

```
畜産業（Livestock）
├── 第一章　畜産の特徴
│   ├── 1. 酪農（乳用牛）
│   ├── 2. 牛肉生産（肉用牛）
│   ├── 3. 養豚
│   ├── 4. 養鶏
│   └── 5. その他
│
├── 第二章　家畜と飼料に関する基礎知識
│   ├── 1. 乳用牛
│   ├── 2. 肉用牛
│   ├── 3. 豚
│   ├── 4a. 採卵鶏
│   ├── 4b. 肉用鶏
│   └── 5. その他
│
├── 第三章　日常の家畜の管理作業
│   ├── 1. 農場の衛生・安全管理
│   ├── 2. 乳用牛
│   ├── 3. 肉用牛
│   ├── 4. 豚
│   ├── 5. 養鶏
│   └── 6. その他
│
└── 第四章　追加学習
    ├── 1. 実技試験対策
    └── 2. 専門用語集
```

**合計レッスン数: 19レッスン**

---

## ステップ1: Supabaseでデータベースを更新

### 1.1 マイグレーションファイルを実行

Supabase SQL Editorで以下のファイルの内容を実行してください：

📁 `/Users/kabe/sugustudy/supabase/migrations/007_livestock_data.sql`

このSQLは以下を作成します：
- ✅ 畜産業セクター
- ✅ 4つのカテゴリー（第一章〜第四章）
- ✅ 19個のレッスン

### 1.2 実行確認

```sql
-- カテゴリーの確認
SELECT id, name_ja, display_order 
FROM categories 
WHERE sector_id = 'livestock'
ORDER BY display_order;

-- レッスンの確認
SELECT 
  c.name_ja as category,
  l.display_order,
  l.title_ja,
  l.duration_minutes
FROM lessons l
JOIN categories c ON l.category_id = c.id
WHERE c.sector_id = 'livestock'
ORDER BY c.display_order, l.display_order;
```

---

## ステップ2: 動画ファイルの準備

### 動画ファイル命名規則

各レッスンに対して**2つの動画**（日本語版・インドネシア語版）を準備：

#### 第一章（5レッスン × 2言語 = 10動画）
```
livestock-ch1-01-ja.mp4  →  1. 酪農（乳用牛）日本語版
livestock-ch1-01-id.mp4  →  1. 酪農（乳用牛）インドネシア語版

livestock-ch1-02-ja.mp4  →  2. 牛肉生産（肉用牛）日本語版
livestock-ch1-02-id.mp4  →  2. 牛肉生産（肉用牛）インドネシア語版

livestock-ch1-03-ja.mp4  →  3. 養豚 日本語版
livestock-ch1-03-id.mp4  →  3. 養豚 インドネシア語版

livestock-ch1-04-ja.mp4  →  4. 養鶏 日本語版
livestock-ch1-04-id.mp4  →  4. 養鶏 インドネシア語版

livestock-ch1-05-ja.mp4  →  5. その他 日本語版
livestock-ch1-05-id.mp4  →  5. その他 インドネシア語版
```

#### 第二章（6レッスン × 2言語 = 12動画）
```
livestock-ch2-01-ja.mp4  →  1. 乳用牛 日本語版
livestock-ch2-01-id.mp4  →  1. 乳用牛 インドネシア語版

livestock-ch2-02-ja.mp4  →  2. 肉用牛 日本語版
livestock-ch2-02-id.mp4  →  2. 肉用牛 インドネシア語版

livestock-ch2-03-ja.mp4  →  3. 豚 日本語版
livestock-ch2-03-id.mp4  →  3. 豚 インドネシア語版

livestock-ch2-04a-ja.mp4  →  4a. 採卵鶏 日本語版
livestock-ch2-04a-id.mp4  →  4a. 採卵鶏 インドネシア語版

livestock-ch2-04b-ja.mp4  →  4b. 肉用鶏 日本語版
livestock-ch2-04b-id.mp4  →  4b. 肉用鶏 インドネシア語版

livestock-ch2-05-ja.mp4  →  5. その他 日本語版
livestock-ch2-05-id.mp4  →  5. その他 インドネシア語版
```

#### 第三章（6レッスン × 2言語 = 12動画）
```
livestock-ch3-01-ja.mp4  →  1. 農場の衛生・安全管理 日本語版
livestock-ch3-01-id.mp4  →  1. 農場の衛生・安全管理 インドネシア語版

livestock-ch3-02-ja.mp4  →  2. 乳用牛 日本語版
livestock-ch3-02-id.mp4  →  2. 乳用牛 インドネシア語版

livestock-ch3-03-ja.mp4  →  3. 肉用牛 日本語版
livestock-ch3-03-id.mp4  →  3. 肉用牛 インドネシア語版

livestock-ch3-04-ja.mp4  →  4. 豚 日本語版
livestock-ch3-04-id.mp4  →  4. 豚 インドネシア語版

livestock-ch3-05-ja.mp4  →  5. 養鶏 日本語版
livestock-ch3-05-id.mp4  →  5. 養鶏 インドネシア語版

livestock-ch3-06-ja.mp4  →  6. その他 日本語版
livestock-ch3-06-id.mp4  →  6. その他 インドネシア語版
```

#### 第四章（2レッスン × 2言語 = 4動画）
```
livestock-ch4-01-ja.mp4  →  1. 実技試験対策 日本語版
livestock-ch4-01-id.mp4  →  1. 実技試験対策 インドネシア語版

livestock-ch4-02-ja.mp4  →  2. 専門用語集 日本語版
livestock-ch4-02-id.mp4  →  2. 専門用語集 インドネシア語版
```

**合計: 19レッスン × 2言語 = 38動画**

---

## ステップ3: Cloudflare Streamに動画をアップロード

### 3.1 Cloudflare Dashboardにログイン
```
https://dash.cloudflare.com/
```

### 3.2 動画を一括アップロード

1. 「Stream」セクションに移動
2. 「Upload Video」をクリック
3. 複数の動画を選択してアップロード（ドラッグ&ドロップ可能）

### 3.3 Video IDを記録

アップロード完了後、各動画の**Video ID**を記録します。

**記録用テンプレート（Excel/Googleスプレッドシート推奨）：**

| Lesson ID | タイトル | Video ID (JA) | Video ID (ID) |
|-----------|---------|---------------|---------------|
| livestock-ch1-01 | 1. 酪農（乳用牛） | | |
| livestock-ch1-02 | 2. 牛肉生産（肉用牛） | | |
| livestock-ch1-03 | 3. 養豚 | | |
| livestock-ch1-04 | 4. 養鶏 | | |
| livestock-ch1-05 | 5. その他 | | |
| livestock-ch2-01 | 1. 乳用牛 | | |
| livestock-ch2-02 | 2. 肉用牛 | | |
| livestock-ch2-03 | 3. 豚 | | |
| livestock-ch2-04a | 4a. 採卵鶏 | | |
| livestock-ch2-04b | 4b. 肉用鶏 | | |
| livestock-ch2-05 | 5. その他 | | |
| livestock-ch3-01 | 1. 農場の衛生・安全管理 | | |
| livestock-ch3-02 | 2. 乳用牛 | | |
| livestock-ch3-03 | 3. 肉用牛 | | |
| livestock-ch3-04 | 4. 豚 | | |
| livestock-ch3-05 | 5. 養鶏 | | |
| livestock-ch3-06 | 6. その他 | | |
| livestock-ch4-01 | 1. 実技試験対策 | | |
| livestock-ch4-02 | 2. 専門用語集 | | |

---

## ステップ4: レッスンに動画IDを設定

### 4.1 一括更新SQLの生成

記録したVideo IDを使って、以下のSQLテンプレートを埋めてください：

```sql
-- 第一章
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch1-01';
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch1-02';
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch1-03';
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch1-04';
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch1-05';

-- 第二章
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch2-01';
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch2-02';
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch2-03';
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch2-04a';
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch2-04b';
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch2-05';

-- 第三章
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch3-01';
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch3-02';
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch3-03';
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch3-04';
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch3-05';
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch3-06';

-- 第四章
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch4-01';
UPDATE lessons SET cloudflare_video_id_ja = '[JA_VIDEO_ID]', cloudflare_video_id_id = '[ID_VIDEO_ID]' WHERE id = 'livestock-ch4-02';
```

### 4.2 Supabase SQL Editorで実行

上記のSQLを実行してレッスンに動画IDを設定します。

---

## ステップ5: 動作確認

### 5.1 データ確認
```sql
-- 動画IDが設定されているか確認
SELECT 
  c.name_ja as category,
  l.title_ja,
  CASE 
    WHEN l.cloudflare_video_id_ja IS NOT NULL THEN '✅' 
    ELSE '❌' 
  END as ja_video,
  CASE 
    WHEN l.cloudflare_video_id_id IS NOT NULL THEN '✅' 
    ELSE '❌' 
  END as id_video
FROM lessons l
JOIN categories c ON l.category_id = c.id
WHERE c.sector_id = 'livestock'
ORDER BY c.display_order, l.display_order;
```

### 5.2 ブラウザで確認
1. アプリケーションにアクセス: `http://localhost:3000`
2. 「畜産業」セクターを選択
3. 各章（カテゴリー）を確認
4. レッスンを開いて動画が再生されるか確認
5. 言語切り替えボタンで日本語版・インドネシア語版が切り替わるか確認

---

## 📊 進捗管理チェックリスト

### データベース
- [ ] マイグレーション `007_livestock_data.sql` 実行完了
- [ ] カテゴリー4つ作成確認
- [ ] レッスン19個作成確認

### 動画アップロード
#### 第一章（5レッスン）
- [ ] livestock-ch1-01（日本語・インドネシア語）
- [ ] livestock-ch1-02（日本語・インドネシア語）
- [ ] livestock-ch1-03（日本語・インドネシア語）
- [ ] livestock-ch1-04（日本語・インドネシア語）
- [ ] livestock-ch1-05（日本語・インドネシア語）

#### 第二章（6レッスン）
- [ ] livestock-ch2-01（日本語・インドネシア語）
- [ ] livestock-ch2-02（日本語・インドネシア語）
- [ ] livestock-ch2-03（日本語・インドネシア語）
- [ ] livestock-ch2-04a（日本語・インドネシア語）
- [ ] livestock-ch2-04b（日本語・インドネシア語）
- [ ] livestock-ch2-05（日本語・インドネシア語）

#### 第三章（6レッスン）
- [ ] livestock-ch3-01（日本語・インドネシア語）
- [ ] livestock-ch3-02（日本語・インドネシア語）
- [ ] livestock-ch3-03（日本語・インドネシア語）
- [ ] livestock-ch3-04（日本語・インドネシア語）
- [ ] livestock-ch3-05（日本語・インドネシア語）
- [ ] livestock-ch3-06（日本語・インドネシア語）

#### 第四章（2レッスン）
- [ ] livestock-ch4-01（日本語・インドネシア語）
- [ ] livestock-ch4-02（日本語・インドネシア語）

### 動画ID設定
- [ ] 全レッスンに動画ID設定完了
- [ ] データベースで確認完了

### 動作確認
- [ ] ローカル環境で動作確認
- [ ] 各章のレッスンが表示される
- [ ] 動画が再生される
- [ ] 言語切り替えが機能する

---

## トラブルシューティング

### 動画が再生されない
1. Video IDが正しく設定されているか確認
2. Cloudflare Streamで動画が「Ready」状態か確認
3. 環境変数 `NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID` が設定されているか確認

### カテゴリーが表示されない
1. マイグレーションが正しく実行されたか確認
2. `display_order` が正しく設定されているか確認

### レッスンが表示されない
1. `category_id` が正しいか確認
2. `tier_required` が適切か確認（1 = ゲストでもアクセス可能）

---

## 次のステップ

✅ 畜産業のコンテンツ完成後：
1. 他のセクター（漁業、建設など）のコンテンツを追加
2. 音声ファイルをSupabase Storageにアップロード
3. テキストコンテンツを追加
4. 試験問題を追加
5. 本番環境にデプロイ

---

## 参考情報

- **Cloudflare Stream**: https://developers.cloudflare.com/stream/
- **Supabase SQL Editor**: https://supabase.com/dashboard/project/YOUR_PROJECT/sql
- **プロジェクトREADME**: `/Users/kabe/sugustudy/README.md`
