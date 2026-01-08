-- 業種別コンテンツのためのスキーマ拡張

-- 業種マスターテーブル
CREATE TABLE IF NOT EXISTS public.sectors (
  id TEXT PRIMARY KEY,                    -- 'agriculture', 'livestock' など
  name_ja TEXT NOT NULL,                  -- 農業
  name_vi TEXT,                           -- Nông nghiệp
  name_id TEXT,                           -- Pertanian
  name_en TEXT,                           -- Agriculture
  description_ja TEXT,                    -- 試験概要（短い）
  description_vi TEXT,
  description_id TEXT,
  description_en TEXT,
  exam_overview_ja TEXT,                  -- 試験の概要（詳細）
  exam_overview_vi TEXT,
  exam_overview_id TEXT,
  exam_overview_en TEXT,
  exam_flow_ja TEXT,                      -- 受験の流れ（Markdown対応）
  exam_flow_vi TEXT,
  exam_flow_id TEXT,
  exam_flow_en TEXT,
  icon TEXT,                              -- lucide icon名
  color TEXT,                             -- テーマカラー (Tailwind class)
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- カテゴリマスターテーブル
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,                    -- 'agri-general', 'agri-rice' など
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
