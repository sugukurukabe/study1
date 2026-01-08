-- 農業分野のサンプルデータ

-- 農業セクター
INSERT INTO public.sectors (id, name_ja, name_vi, name_id, name_en, description_ja, description_vi, description_id, description_en, exam_overview_ja, exam_overview_vi, exam_overview_id, exam_overview_en, exam_flow_ja, exam_flow_vi, exam_flow_id, exam_flow_en, icon, color, order_index) VALUES
('agriculture', '農業', 'Nông nghiệp', 'Pertanian', 'Agriculture',
 '特定技能2号 農業分野の試験対策',
 'Ôn thi kỹ năng đặc định số 2 ngành Nông nghiệp',
 'Persiapan ujian keterampilan khusus tingkat 2 bidang Pertanian',
 'Preparation for Specified Skilled Worker Type 2 Agriculture Exam',
 '## 試験の概要

農業分野の特定技能2号技能評価試験は、日本の農業に関する専門的な知識と技能を持つ外国人を認定するための試験です。

### 試験内容
- **学科試験**: 日本農業一般、耕種農業、安全衛生などの知識
- **実技試験**: 具体的な農作業の技能

### 合格基準
- 学科試験: 正答率70%以上
- 実技試験: 各課題60%以上

### 試験時間
- 学科試験: 60分
- 実技試験: 作業内容により異なる',
 '## Tổng quan kỳ thi

Kỳ thi đánh giá kỹ năng đặc định số 2 ngành Nông nghiệp là kỳ thi công nhận người nước ngoài có kiến thức và kỹ năng chuyên môn về nông nghiệp Nhật Bản.',
 '## Gambaran Ujian

Ujian evaluasi keterampilan khusus tingkat 2 bidang Pertanian adalah ujian untuk mengakui orang asing yang memiliki pengetahuan dan keterampilan khusus tentang pertanian Jepang.',
 '## Exam Overview

The Specified Skilled Worker Type 2 skill evaluation exam in Agriculture certifies foreign nationals with specialized knowledge and skills in Japanese agriculture.',
 '## 受験の流れ

1. **申し込み**: オンラインまたは郵送で申請
2. **受験票受取**: 試験日の2週間前に届きます
3. **試験当日**: 会場には30分前に到着してください
4. **結果発表**: 試験後2〜3週間で通知
5. **合格証発行**: 合格者には証明書が発行されます',
 '## Quy trình thi

1. **Đăng ký**: Đăng ký trực tuyến hoặc qua bưu điện
2. **Nhận phiếu dự thi**: Nhận trước ngày thi 2 tuần
3. **Ngày thi**: Đến địa điểm thi trước 30 phút
4. **Công bố kết quả**: Thông báo sau 2-3 tuần
5. **Cấp chứng chỉ**: Cấp giấy chứng nhận cho người đỗ',
 '## Proses Ujian

1. **Pendaftaran**: Daftar secara online atau melalui pos
2. **Terima kartu ujian**: Diterima 2 minggu sebelum ujian
3. **Hari ujian**: Tiba di lokasi 30 menit sebelumnya
4. **Pengumuman hasil**: Pemberitahuan dalam 2-3 minggu
5. **Penerbitan sertifikat**: Sertifikat diberikan kepada yang lulus',
 '## Exam Process

1. **Application**: Apply online or by mail
2. **Receive exam ticket**: Arrives 2 weeks before exam
3. **Exam day**: Arrive at venue 30 minutes early
4. **Results announcement**: Notified in 2-3 weeks
5. **Certificate issuance**: Certificates issued to successful candidates',
 'Wheat', 'green', 1),

('livestock', '畜産業', 'Chăn nuôi', 'Peternakan', 'Livestock',
 '特定技能2号 畜産分野の試験対策',
 'Ôn thi kỹ năng đặc định số 2 ngành Chăn nuôi',
 'Persiapan ujian keterampilan khusus tingkat 2 bidang Peternakan',
 'Preparation for Specified Skilled Worker Type 2 Livestock Exam',
 '## 試験の概要

畜産分野の特定技能2号技能評価試験は、日本の畜産業に関する専門的な知識と技能を持つ外国人を認定するための試験です。',
 '## Tổng quan kỳ thi

Kỳ thi đánh giá kỹ năng đặc định số 2 ngành Chăn nuôi.',
 '## Gambaran Ujian

Ujian evaluasi keterampilan khusus tingkat 2 bidang Peternakan.',
 '## Exam Overview

The Specified Skilled Worker Type 2 skill evaluation exam in Livestock.',
 '## 受験の流れ

農業分野と同様の流れです。',
 '## Quy trình thi

Tương tự ngành Nông nghiệp.',
 '## Proses Ujian

Sama dengan bidang Pertanian.',
 '## Exam Process

Same as Agriculture field.',
 'Beef', 'amber', 2);

-- 農業カテゴリ
INSERT INTO public.categories (id, sector_id, name_ja, name_vi, name_id, name_en, description_ja, description_vi, description_id, description_en, order_index) VALUES
('agri-general', 'agriculture', '日本農業一般', 'Nông nghiệp Nhật Bản tổng quát', 'Pertanian Jepang Umum', 'Japanese Agriculture General', 
 '日本の農業の特徴、農業政策、食料自給率などを学びます',
 'Học về đặc điểm nông nghiệp Nhật Bản, chính sách nông nghiệp, tỷ lệ tự cung cấp lương thực',
 'Pelajari karakteristik pertanian Jepang, kebijakan pertanian, rasio swasembada pangan',
 'Learn about Japanese agriculture characteristics, agricultural policy, food self-sufficiency rate', 1),

('agri-crop-general', 'agriculture', '耕種農業一般', 'Nông nghiệp trồng trọt tổng quát', 'Pertanian Tanam Umum', 'Crop Agriculture General',
 '耕種農業の基礎知識、土壌管理、肥料、農薬について学びます',
 'Học kiến thức cơ bản về nông nghiệp trồng trọt, quản lý đất, phân bón, thuốc trừ sâu',
 'Pelajari pengetahuan dasar pertanian tanam, pengelolaan tanah, pupuk, pestisida',
 'Learn basics of crop agriculture, soil management, fertilizers, pesticides', 2),

('agri-safety', 'agriculture', '安全衛生', 'An toàn vệ sinh', 'Keselamatan dan Kesehatan', 'Safety and Health',
 '農作業における安全管理、衛生管理について学びます',
 'Học về quản lý an toàn và vệ sinh trong công việc nông nghiệp',
 'Pelajari tentang manajemen keselamatan dan kesehatan dalam pekerjaan pertanian',
 'Learn about safety and health management in agricultural work', 3),

('agri-rice', 'agriculture', '稲作作業', 'Trồng lúa', 'Pertanian Padi', 'Rice Cultivation',
 '水稲栽培の技術、田植え、収穫など稲作全般を学びます',
 'Học kỹ thuật trồng lúa nước, cấy lúa, thu hoạch',
 'Pelajari teknik budidaya padi sawah, penanaman, panen',
 'Learn rice cultivation techniques, planting, harvesting', 4),

('agri-field', 'agriculture', '畑作・野菜作業', 'Trồng rau màu', 'Pertanian Ladang dan Sayuran', 'Field and Vegetable Cultivation',
 '畑作物、野菜の栽培技術を学びます',
 'Học kỹ thuật trồng cây màu và rau',
 'Pelajari teknik budidaya tanaman ladang dan sayuran',
 'Learn field crop and vegetable cultivation techniques', 5),

('agri-greenhouse', 'agriculture', '施設園芸作業', 'Làm vườn trong nhà kính', 'Hortikultura Fasilitas', 'Greenhouse Horticulture',
 'ビニールハウスなど施設での園芸作業を学びます',
 'Học công việc làm vườn trong nhà kính và các cơ sở',
 'Pelajari pekerjaan hortikultura di rumah kaca dan fasilitas',
 'Learn greenhouse and facility horticulture work', 6),

('agri-fruit', 'agriculture', '果樹栽培作業', 'Trồng cây ăn quả', 'Budidaya Buah', 'Fruit Tree Cultivation',
 '果樹園での栽培管理、収穫、剪定などを学びます',
 'Học về quản lý trồng trọt, thu hoạch, cắt tỉa trong vườn cây ăn quả',
 'Pelajari manajemen budidaya, panen, pemangkasan di kebun buah',
 'Learn orchard management, harvesting, pruning', 7),

('agri-practical', 'agriculture', '実技問題特集', 'Đặc biệt bài thi thực hành', 'Soal Praktik Khusus', 'Practical Exam Special',
 '実技試験で出題される内容を集中的に練習します',
 'Luyện tập tập trung nội dung trong kỳ thi thực hành',
 'Latihan intensif konten yang muncul di ujian praktik',
 'Intensive practice for practical exam content', 8),

('agri-terms', 'agriculture', '農作業の用語', 'Thuật ngữ công việc nông nghiệp', 'Istilah Pertanian', 'Agricultural Terms',
 '農業で使われる専門用語を学びます',
 'Học thuật ngữ chuyên môn sử dụng trong nông nghiệp',
 'Pelajari istilah teknis yang digunakan dalam pertanian',
 'Learn technical terms used in agriculture', 9);

-- 畜産カテゴリ
INSERT INTO public.categories (id, sector_id, name_ja, name_vi, name_id, name_en, description_ja, description_vi, description_id, description_en, order_index) VALUES
('livestock-general', 'livestock', '畜産業一般', 'Chăn nuôi tổng quát', 'Peternakan Umum', 'Livestock General',
 '日本の畜産業の概要と基礎知識を学びます',
 'Học tổng quan và kiến thức cơ bản về ngành Chăn nuôi Nhật Bản',
 'Pelajari gambaran umum dan pengetahuan dasar peternakan Jepang',
 'Learn overview and basics of Japanese livestock industry', 1),

('livestock-safety', 'livestock', '安全衛生', 'An toàn vệ sinh', 'Keselamatan dan Kesehatan', 'Safety and Health',
 '畜産業における安全管理、衛生管理について学びます',
 'Học về quản lý an toàn và vệ sinh trong ngành chăn nuôi',
 'Pelajari tentang manajemen keselamatan dan kesehatan dalam peternakan',
 'Learn about safety and health management in livestock industry', 2);

-- サンプルレッスン（農業カテゴリ用）
INSERT INTO public.lessons (id, title_ja, title_vi, title_id, title_en, description_ja, description_vi, description_id, description_en, required_tier, duration_seconds, order_index, category_id) VALUES
('agri-001', '日本農業の概要', 'Tổng quan về nông nghiệp Nhật Bản', 'Gambaran Umum Pertanian Jepang', 'Overview of Japanese Agriculture',
 '日本の農業の現状、主要な農産物、農業就業者数の推移について学びます。',
 'Học về tình hình nông nghiệp Nhật Bản hiện tại, nông sản chính, xu hướng số lượng lao động nông nghiệp.',
 'Pelajari tentang kondisi pertanian Jepang saat ini, produk pertanian utama, tren jumlah pekerja pertanian.',
 'Learn about current state of Japanese agriculture, major agricultural products, trends in agricultural workers.',
 1, 900, 1, 'agri-general'),

('agri-002', '食料自給率と農業政策', 'Tỷ lệ tự cung cấp lương thực và chính sách nông nghiệp', 'Rasio Swasembada Pangan dan Kebijakan Pertanian', 'Food Self-Sufficiency Rate and Agricultural Policy',
 '日本の食料自給率の現状と、それを支える農業政策について解説します。',
 'Giải thích về tình hình tỷ lệ tự cung cấp lương thực của Nhật Bản và chính sách nông nghiệp hỗ trợ.',
 'Penjelasan tentang kondisi rasio swasembada pangan Jepang dan kebijakan pertanian yang mendukung.',
 'Explanation of Japan''s food self-sufficiency rate and supporting agricultural policies.',
 1, 1200, 2, 'agri-general'),

('agri-003', '土壌の基礎知識', 'Kiến thức cơ bản về đất', 'Pengetahuan Dasar tentang Tanah', 'Basics of Soil',
 '土壌の構成、土壌診断、土づくりの基本について学びます。',
 'Học về thành phần đất, chẩn đoán đất, cơ bản về cải tạo đất.',
 'Pelajari tentang komposisi tanah, diagnosis tanah, dasar-dasar pembuatan tanah.',
 'Learn about soil composition, soil diagnosis, basics of soil improvement.',
 1, 900, 1, 'agri-crop-general'),

('agri-004', '農作業の安全対策', 'Biện pháp an toàn trong công việc nông nghiệp', 'Langkah Keselamatan Kerja Pertanian', 'Agricultural Work Safety Measures',
 '農作業中の事故防止、熱中症対策、機械取扱いの注意点を学びます。',
 'Học về phòng ngừa tai nạn, phòng chống say nắng, lưu ý khi sử dụng máy móc trong công việc nông nghiệp.',
 'Pelajari tentang pencegahan kecelakaan, pencegahan heat stroke, perhatian dalam penggunaan mesin dalam pekerjaan pertanian.',
 'Learn about accident prevention, heat stroke prevention, machine handling precautions in agricultural work.',
 1, 1080, 1, 'agri-safety'),

('agri-005', '稲作の年間スケジュール', 'Lịch trình hàng năm trồng lúa', 'Jadwal Tahunan Budidaya Padi', 'Annual Rice Cultivation Schedule',
 '種まきから収穫まで、稲作の1年間の流れを学びます。',
 'Học về quy trình trồng lúa trong 1 năm từ gieo hạt đến thu hoạch.',
 'Pelajari alur budidaya padi selama 1 tahun dari penyemaian hingga panen.',
 'Learn the annual rice cultivation process from sowing to harvest.',
 1, 1200, 1, 'agri-rice');

-- サンプル試験問題（農業カテゴリ用）
INSERT INTO public.exam_questions (id, question_ja, question_vi, question_id, question_en, options, correct_answer, explanation_ja, explanation_vi, explanation_id, explanation_en, category, difficulty, category_id) VALUES
('agri-q-001', '日本の食料自給率（カロリーベース）は約何%ですか？', 'Tỷ lệ tự cung cấp lương thực của Nhật Bản (theo calo) là khoảng bao nhiêu %?', 'Berapa persen kira-kira rasio swasembada pangan Jepang (basis kalori)?', 'What is Japan''s food self-sufficiency rate (calorie basis) approximately?',
 '{"A": "約38%", "B": "約50%", "C": "約65%", "D": "約80%"}', 'A',
 '日本の食料自給率（カロリーベース）は約38%で、先進国の中では低い水準です。主食の米は高い自給率を維持していますが、小麦や大豆などは輸入に頼っています。',
 'Tỷ lệ tự cung cấp lương thực của Nhật Bản (theo calo) khoảng 38%, thấp trong số các nước phát triển.',
 'Rasio swasembada pangan Jepang (basis kalori) sekitar 38%, termasuk rendah di antara negara maju.',
 'Japan''s food self-sufficiency rate (calorie basis) is about 38%, which is low among developed countries.',
 '農業一般', 'easy', 'agri-general'),

('agri-q-002', '水稲の田植え時期は一般的にいつですか？', 'Thời điểm cấy lúa nước thường là khi nào?', 'Kapan waktu tanam padi sawah secara umum?', 'When is the general rice planting season?',
 '{"A": "3月〜4月", "B": "5月〜6月", "C": "7月〜8月", "D": "9月〜10月"}', 'B',
 '水稲の田植えは一般的に5月から6月に行われます。地域や品種によって多少異なりますが、この時期が最も適しています。',
 'Thời điểm cấy lúa nước thường vào tháng 5 đến tháng 6.',
 'Penanaman padi sawah umumnya dilakukan pada bulan Mei hingga Juni.',
 'Rice planting is generally done from May to June.',
 '稲作', 'easy', 'agri-rice'),

('agri-q-003', '農作業中の熱中症対策として最も重要なことは？', 'Điều quan trọng nhất để phòng chống say nắng trong công việc nông nghiệp là gì?', 'Apa hal terpenting untuk pencegahan heat stroke dalam pekerjaan pertanian?', 'What is the most important for preventing heat stroke during agricultural work?',
 '{"A": "長時間連続で作業する", "B": "こまめな水分・塩分補給と休憩", "C": "できるだけ厚着をする", "D": "昼食を抜く"}', 'B',
 '熱中症対策では、こまめな水分・塩分補給と定期的な休憩が最も重要です。暑い時間帯を避けた作業計画も効果的です。',
 'Để phòng chống say nắng, việc bổ sung nước và muối thường xuyên cùng nghỉ ngơi định kỳ là quan trọng nhất.',
 'Untuk pencegahan heat stroke, hidrasi dan asupan garam secara teratur serta istirahat teratur adalah yang paling penting.',
 'For heat stroke prevention, regular hydration, salt intake, and rest breaks are most important.',
 '安全衛生', 'easy', 'agri-safety');
