-- 畜産業セクターとコンテンツデータ
-- 実行日: 2026-01-29

-- 畜産業セクターを作成
INSERT INTO sectors (id, name_ja, name_id, name_vi, name_en, description_ja, icon, color, order_index)
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
  order_index = EXCLUDED.order_index;

-- 第一章: 畜産の特徴
INSERT INTO categories (id, sector_id, name_ja, name_id, name_vi, name_en, description_ja, order_index)
VALUES 
  ('livestock-ch1', 'livestock', '第一章　畜産の特徴', 'Bab 1: Karakteristik Peternakan', 'Chương 1: Đặc điểm chăn nuôi', 'Chapter 1: Characteristics of Livestock', '畜産業の各分野の特徴を学習', 1)
ON CONFLICT (id) DO UPDATE SET
  name_ja = EXCLUDED.name_ja,
  name_id = EXCLUDED.name_id,
  name_vi = EXCLUDED.name_vi,
  name_en = EXCLUDED.name_en,
  description_ja = EXCLUDED.description_ja,
  order_index = EXCLUDED.order_index;

-- 第二章: 家畜と飼料に関する基礎知識
INSERT INTO categories (id, sector_id, name_ja, name_id, name_vi, name_en, description_ja, order_index)
VALUES 
  ('livestock-ch2', 'livestock', '第二章　家畜と飼料に関する基礎知識', 'Bab 2: Pengetahuan Dasar tentang Ternak dan Pakan', 'Chương 2: Kiến thức cơ bản về gia súc và thức ăn', 'Chapter 2: Basic Knowledge of Livestock and Feed', '家畜の種類と飼料の基礎知識', 2)
ON CONFLICT (id) DO UPDATE SET
  name_ja = EXCLUDED.name_ja,
  name_id = EXCLUDED.name_id,
  name_vi = EXCLUDED.name_vi,
  name_en = EXCLUDED.name_en,
  description_ja = EXCLUDED.description_ja,
  order_index = EXCLUDED.order_index;

-- 第三章: 日常の家畜の管理作業
INSERT INTO categories (id, sector_id, name_ja, name_id, name_vi, name_en, description_ja, order_index)
VALUES 
  ('livestock-ch3', 'livestock', '第三章　日常の家畜の管理作業', 'Bab 3: Pekerjaan Manajemen Harian Ternak', 'Chương 3: Công việc quản lý gia súc hàng ngày', 'Chapter 3: Daily Livestock Management Work', '農場の衛生管理と日常作業', 3)
ON CONFLICT (id) DO UPDATE SET
  name_ja = EXCLUDED.name_ja,
  name_id = EXCLUDED.name_id,
  name_vi = EXCLUDED.name_vi,
  name_en = EXCLUDED.name_en,
  description_ja = EXCLUDED.description_ja,
  order_index = EXCLUDED.order_index;

-- 第四章: 追加学習
INSERT INTO categories (id, sector_id, name_ja, name_id, name_vi, name_en, description_ja, order_index)
VALUES 
  ('livestock-ch4', 'livestock', '第四章　追加学習', 'Bab 4: Pembelajaran Tambahan', 'Chương 4: Học bổ sung', 'Chapter 4: Additional Learning', '実技試験対策と専門用語集', 4)
ON CONFLICT (id) DO UPDATE SET
  name_ja = EXCLUDED.name_ja,
  name_id = EXCLUDED.name_id,
  name_vi = EXCLUDED.name_vi,
  name_en = EXCLUDED.name_en,
  description_ja = EXCLUDED.description_ja,
  order_index = EXCLUDED.order_index;

-- ========================================
-- 第一章のレッスン
-- ========================================

INSERT INTO lessons (
  id, 
  category_id, 
  title_ja, 
  title_id, 
  title_vi, 
  title_en,
  description_ja,
  order_index,
  duration_seconds,
  required_tier
)
VALUES 
  ('livestock-ch1-01', 'livestock-ch1', '1. 酪農（乳用牛）', '1. Peternakan Sapi Perah', '1. Chăn nuôi bò sữa', '1. Dairy Farming (Dairy Cattle)', '酪農の特徴と乳用牛の基礎知識', 1, 1200, 1),
  ('livestock-ch1-02', 'livestock-ch1', '2. 牛肉生産（肉用牛）', '2. Produksi Daging Sapi', '2. Sản xuất thịt bò', '2. Beef Production (Beef Cattle)', '肉用牛の特徴と飼養管理', 2, 1080, 1),
  ('livestock-ch1-03', 'livestock-ch1', '3. 養豚', '3. Peternakan Babi', '3. Chăn nuôi lợn', '3. Pig Farming', '養豚の特徴と管理方法', 3, 1080, 1),
  ('livestock-ch1-04', 'livestock-ch1', '4. 養鶏', '4. Peternakan Ayam', '4. Chăn nuôi gà', '4. Poultry Farming', '養鶏の特徴と飼養システム', 4, 1080, 1),
  ('livestock-ch1-05', 'livestock-ch1', '5. その他', '5. Lainnya', '5. Khác', '5. Others', 'その他の畜産（羊、山羊など）', 5, 900, 1)
ON CONFLICT (id) DO UPDATE SET
  title_ja = EXCLUDED.title_ja,
  title_id = EXCLUDED.title_id,
  title_vi = EXCLUDED.title_vi,
  title_en = EXCLUDED.title_en,
  description_ja = EXCLUDED.description_ja,
  order_index = EXCLUDED.order_index,
  duration_seconds = EXCLUDED.duration_seconds,
  required_tier = EXCLUDED.required_tier;

-- ========================================
-- 第二章のレッスン
-- ========================================

INSERT INTO lessons (
  id, 
  category_id, 
  title_ja, 
  title_id, 
  title_vi, 
  title_en,
  description_ja,
  order_index,
  duration_seconds,
  required_tier
)
VALUES 
  ('livestock-ch2-01', 'livestock-ch2', '1. 乳用牛', '1. Sapi Perah', '1. Bò sữa', '1. Dairy Cattle', '乳用牛の品種と飼料管理', 1, 1320, 1),
  ('livestock-ch2-02', 'livestock-ch2', '2. 肉用牛', '2. Sapi Potong', '2. Bò thịt', '2. Beef Cattle', '肉用牛の品種と栄養管理', 2, 1200, 1),
  ('livestock-ch2-03', 'livestock-ch2', '3. 豚', '3. Babi', '3. Lợn', '3. Pigs', '豚の品種と飼料の種類', 3, 1200, 1),
  ('livestock-ch2-04a', 'livestock-ch2', '4a. 採卵鶏', '4a. Ayam Petelur', '4a. Gà đẻ trứng', '4a. Layer Chickens', '採卵鶏の品種と飼料管理', 4, 1080, 1),
  ('livestock-ch2-04b', 'livestock-ch2', '4b. 肉用鶏', '4b. Ayam Pedaging', '4b. Gà thịt', '4b. Broiler Chickens', '肉用鶏の品種と栄養要求', 5, 1080, 1),
  ('livestock-ch2-05', 'livestock-ch2', '5. その他', '5. Lainnya', '5. Khác', '5. Others', 'その他の家畜の飼料管理', 6, 900, 1)
ON CONFLICT (id) DO UPDATE SET
  title_ja = EXCLUDED.title_ja,
  title_id = EXCLUDED.title_id,
  title_vi = EXCLUDED.title_vi,
  title_en = EXCLUDED.title_en,
  description_ja = EXCLUDED.description_ja,
  order_index = EXCLUDED.order_index,
  duration_seconds = EXCLUDED.duration_seconds,
  required_tier = EXCLUDED.required_tier;

-- ========================================
-- 第三章のレッスン
-- ========================================

INSERT INTO lessons (
  id, 
  category_id, 
  title_ja, 
  title_id, 
  title_vi, 
  title_en,
  description_ja,
  order_index,
  duration_seconds,
  required_tier
)
VALUES 
  ('livestock-ch3-01', 'livestock-ch3', '1. 農場の衛生・安全管理', '1. Manajemen Kebersihan dan Keamanan Peternakan', '1. Quản lý vệ sinh và an toàn trang trại', '1. Farm Hygiene and Safety Management', '農場の衛生管理と安全対策', 1, 1500, 1),
  ('livestock-ch3-02', 'livestock-ch3', '2. 乳用牛', '2. Sapi Perah', '2. Bò sữa', '2. Dairy Cattle', '乳用牛の日常管理作業', 2, 1320, 1),
  ('livestock-ch3-03', 'livestock-ch3', '3. 肉用牛', '3. Sapi Potong', '3. Bò thịt', '3. Beef Cattle', '肉用牛の日常管理作業', 3, 1200, 1),
  ('livestock-ch3-04', 'livestock-ch3', '4. 豚', '4. Babi', '4. Lợn', '4. Pigs', '豚の日常管理作業', 4, 1200, 1),
  ('livestock-ch3-05', 'livestock-ch3', '5. 養鶏', '5. Peternakan Ayam', '5. Chăn nuôi gà', '5. Poultry', '養鶏の日常管理作業', 5, 1200, 1),
  ('livestock-ch3-06', 'livestock-ch3', '6. その他', '6. Lainnya', '6. Khác', '6. Others', 'その他の家畜の管理作業', 6, 900, 1)
ON CONFLICT (id) DO UPDATE SET
  title_ja = EXCLUDED.title_ja,
  title_id = EXCLUDED.title_id,
  title_vi = EXCLUDED.title_vi,
  title_en = EXCLUDED.title_en,
  description_ja = EXCLUDED.description_ja,
  order_index = EXCLUDED.order_index,
  duration_seconds = EXCLUDED.duration_seconds,
  required_tier = EXCLUDED.required_tier;

-- ========================================
-- 第四章のレッスン
-- ========================================

INSERT INTO lessons (
  id, 
  category_id, 
  title_ja, 
  title_id, 
  title_vi, 
  title_en,
  description_ja,
  order_index,
  duration_seconds,
  required_tier
)
VALUES 
  ('livestock-ch4-01', 'livestock-ch4', '1. 実技試験対策', '1. Persiapan Ujian Praktik', '1. Chuẩn bị thi thực hành', '1. Practical Exam Preparation', '実技試験の内容と対策方法', 1, 1800, 1),
  ('livestock-ch4-02', 'livestock-ch4', '2. 専門用語集', '2. Kamus Istilah Teknis', '2. Từ điển thuật ngữ chuyên môn', '2. Technical Glossary', '畜産業の重要専門用語', 2, 1500, 1)
ON CONFLICT (id) DO UPDATE SET
  title_ja = EXCLUDED.title_ja,
  title_id = EXCLUDED.title_id,
  title_vi = EXCLUDED.title_vi,
  title_en = EXCLUDED.title_en,
  description_ja = EXCLUDED.description_ja,
  order_index = EXCLUDED.order_index,
  duration_seconds = EXCLUDED.duration_seconds,
  required_tier = EXCLUDED.required_tier;

-- 確認クエリ
SELECT 
  c.name_ja as category,
  l.order_index,
  l.title_ja,
  ROUND(l.duration_seconds / 60.0, 1) as duration_minutes
FROM lessons l
JOIN categories c ON l.category_id = c.id
WHERE c.sector_id = 'livestock'
ORDER BY c.order_index, l.order_index;
