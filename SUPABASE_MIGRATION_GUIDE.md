# Supabaseマイグレーション実行ガイド

## 📋 実行手順

### ステップ1: Supabaseダッシュボードにアクセス

1. ブラウザで以下のURLを開く:
   ```
   https://supabase.com/dashboard/project/tvvvwyrtakruwaylwmyb
   ```

2. ログインしていない場合はログイン

### ステップ2: SQL Editorを開く

1. 左サイドバーから「SQL Editor」をクリック
2. 「New query」ボタンをクリック

### ステップ3: マイグレーション005を実行

以下のSQLをコピーして、SQL Editorに貼り付けて実行してください：

```sql
-- 業種別コンテンツのためのスキーマ拡張

-- 業種マスターテーブル
CREATE TABLE IF NOT EXISTS public.sectors (
  id TEXT PRIMARY KEY,
  name_ja TEXT NOT NULL,
  name_vi TEXT,
  name_id TEXT,
  name_en TEXT,
  description_ja TEXT,
  description_vi TEXT,
  description_id TEXT,
  description_en TEXT,
  exam_overview_ja TEXT,
  exam_overview_vi TEXT,
  exam_overview_id TEXT,
  exam_overview_en TEXT,
  exam_flow_ja TEXT,
  exam_flow_vi TEXT,
  exam_flow_id TEXT,
  exam_flow_en TEXT,
  icon TEXT,
  color TEXT,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- カテゴリマスターテーブル
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  sector_id TEXT REFERENCES public.sectors(id) ON DELETE CASCADE NOT NULL,
  name_ja TEXT NOT NULL,
  name_vi TEXT,
  name_id TEXT,
  name_en TEXT,
  description_ja TEXT,
  description_vi TEXT,
  description_id TEXT,
  description_en TEXT,
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- lessonsテーブルにカテゴリを追加
ALTER TABLE public.lessons 
  ADD COLUMN IF NOT EXISTS category_id TEXT REFERENCES public.categories(id);

-- exam_questionsテーブルにカテゴリを追加
ALTER TABLE public.exam_questions 
  ADD COLUMN IF NOT EXISTS category_id TEXT REFERENCES public.categories(id);

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_categories_sector_id ON public.categories(sector_id);
CREATE INDEX IF NOT EXISTS idx_lessons_category_id ON public.lessons(category_id);
CREATE INDEX IF NOT EXISTS idx_exam_questions_category_id ON public.exam_questions(category_id);

-- updated_at トリガー
CREATE TRIGGER set_updated_at_sectors
  BEFORE UPDATE ON public.sectors
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_categories
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- RLSポリシー（読み取り専用で公開）
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sectors are viewable by everyone" ON public.sectors
  FOR SELECT USING (true);

CREATE POLICY "Categories are viewable by everyone" ON public.categories
  FOR SELECT USING (true);
```

**実行方法:**
- SQL Editorに貼り付け
- 右下の「Run」ボタンをクリック
- 成功メッセージを確認

### ステップ4: マイグレーション006を実行

次に、農業分野のサンプルデータを挿入します。新しいクエリを作成し、以下のSQLを実行してください：

**注意:** このSQLは長いため、`supabase/migrations/006_agriculture_data.sql`ファイルの内容をコピーして実行してください。

主な内容:
- 農業セクター（agriculture）と畜産セクター（livestock）の追加
- 9つの農業カテゴリの追加
- 5つのサンプルレッスンの追加
- 3つのサンプル試験問題の追加

### ステップ5: Storageバケットの作成

1. 左サイドバーから「Storage」をクリック
2. 「Create a new bucket」をクリック

#### audioバケット（音声ファイル用）
- **Bucket name**: `audio`
- **Public bucket**: ✅ チェックを入れる（公開バケット）
- 「Create bucket」をクリック

#### kyc-documentsバケット（KYC書類用）
- **Bucket name**: `kyc-documents`
- **Public bucket**: ❌ チェックを外す（非公開バケット）
- 「Create bucket」をクリック

### ステップ6: 確認

マイグレーション完了後、以下を確認してください：

1. **テーブル確認:**
   - Table Editor → `sectors`テーブルが存在
   - Table Editor → `categories`テーブルが存在
   - Table Editor → `lessons`テーブルに`category_id`カラムが追加

2. **データ確認:**
   ```sql
   SELECT * FROM sectors;
   SELECT * FROM categories WHERE sector_id = 'agriculture';
   SELECT * FROM lessons WHERE category_id LIKE 'agri-%';
   ```

3. **Storageバケット確認:**
   - Storage → `audio`バケットが存在（Public）
   - Storage → `kyc-documents`バケットが存在（Private）

## ✅ 完了チェックリスト

- [ ] マイグレーション005実行完了
- [ ] マイグレーション006実行完了
- [ ] audioバケット作成完了
- [ ] kyc-documentsバケット作成完了
- [ ] sectorsテーブルにデータが2件（agriculture, livestock）
- [ ] categoriesテーブルにデータが11件
- [ ] lessonsテーブルにagri-001〜agri-005が存在

## 🚨 トラブルシューティング

### エラー: "relation already exists"
→ すでに実行済みです。問題ありません。

### エラー: "function handle_updated_at() does not exist"
→ マイグレーション003が未実行です。先に003を実行してください。

### エラー: "column already exists"
→ すでに実行済みです。問題ありません。

## 次のステップ

マイグレーション完了後、以下の手順に進んでください：

1. ✅ Cloudflare Streamへ動画をアップロード
2. ✅ Supabase Storageへ音声ファイルをアップロード
3. ✅ レッスンデータを更新（Video IDと音声パスを設定）
4. ✅ Vercelへデプロイ
