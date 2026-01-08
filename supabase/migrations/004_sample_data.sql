-- サンプルデータの投入（開発・テスト用）

-- サンプルレッスン
INSERT INTO public.lessons (id, title_ja, title_vi, title_id, title_en, description_ja, description_vi, description_id, description_en, required_tier, duration_seconds, order_index) VALUES
('lesson-001', '特定技能制度とは？', 'Hệ thống tay nghề đặc định là gì?', 'Apa itu sistem keterampilan khusus?', 'What is the Specified Skilled Worker system?', 
 '特定技能制度の基礎知識を学びます。制度の概要、Tier 1とTier 2の違い、取得のメリットについて解説します。',
 'Tìm hiểu kiến thức cơ bản về hệ thống tay nghề đặc định.',
 'Pelajari pengetahuan dasar tentang sistem keterampilan khusus.',
 'Learn the basics of the Specified Skilled Worker system.',
 1, 900, 1),

('lesson-002', '日本の労働法の基礎', 'Cơ bản về luật lao động Nhật Bản', 'Dasar hukum ketenagakerjaan Jepang', 'Basics of Japanese Labor Law',
 '日本で働く上で知っておくべき労働法の基礎を学びます。労働時間、休暇、給与に関する基本的なルールを解説します。',
 'Học cơ bản về luật lao động cần biết khi làm việc tại Nhật.',
 'Pelajari dasar hukum ketenagakerjaan untuk bekerja di Jepang.',
 'Learn the fundamental labor laws for working in Japan.',
 1, 1200, 2),

('lesson-003', '職場でのコミュニケーション', 'Giao tiếp tại nơi làm việc', 'Komunikasi di tempat kerja', 'Workplace Communication',
 '日本の職場で円滑にコミュニケーションを取るためのポイントを学びます。報告・連絡・相談の基本について解説します。',
 'Học cách giao tiếp hiệu quả tại nơi làm việc Nhật Bản.',
 'Pelajari cara berkomunikasi dengan lancar di tempat kerja Jepang.',
 'Learn effective communication in Japanese workplaces.',
 1, 1080, 3),

('lesson-004', '建設業の専門知識', 'Kiến thức chuyên môn ngành xây dựng', 'Pengetahuan khusus industri konstruksi', 'Construction Industry Knowledge',
 '建設業界で必要な専門知識を学びます。安全管理、品質管理、工程管理について詳しく解説します。',
 'Học kiến thức chuyên môn cần thiết trong ngành xây dựng.',
 'Pelajari pengetahuan khusus yang diperlukan dalam industri konstruksi.',
 'Learn specialized knowledge for the construction industry.',
 2, 1800, 4),

('lesson-005', '介護の基礎知識', 'Kiến thức cơ bản về chăm sóc', 'Pengetahuan dasar perawatan', 'Basic Nursing Care Knowledge',
 '介護現場で必要な基礎知識を学びます。高齢者への接し方、身体介助の基本、感染症対策について解説します。',
 'Học kiến thức cơ bản cần thiết tại hiện trường chăm sóc.',
 'Pelajari pengetahuan dasar untuk pekerjaan perawatan.',
 'Learn fundamental knowledge for nursing care work.',
 2, 2100, 5);

-- サンプル試験問題
INSERT INTO public.exam_questions (id, question_ja, question_vi, question_id, question_en, options, correct_answer, explanation_ja, explanation_vi, explanation_id, explanation_en, category, difficulty) VALUES
('q-001', '特定技能2号の在留期間の更新回数は？', 'Số lần gia hạn thời gian lưu trú của tay nghề đặc định 2 là?', 'Berapa kali perpanjangan masa tinggal untuk keterampilan khusus tingkat 2?', 'How many times can Specified Skilled Worker (ii) visa be renewed?',
 '{"A": "1回", "B": "3回", "C": "5回", "D": "制限なし"}', 'D',
 '特定技能2号は在留期間の更新回数に制限がありません。これにより、長期的に日本で働くことが可能です。',
 'Tay nghề đặc định 2 không có giới hạn số lần gia hạn thời gian lưu trú.',
 'Keterampilan khusus tingkat 2 tidak memiliki batasan jumlah perpanjangan masa tinggal.',
 'Specified Skilled Worker (ii) has no limit on visa renewals.',
 '制度の基礎', 'easy'),

('q-002', '労働基準法で定められた1日の労働時間の上限は？', 'Giới hạn thời gian làm việc 1 ngày theo Luật Tiêu chuẩn Lao động là?', 'Batas waktu kerja per hari menurut Undang-Undang Standar Ketenagakerjaan?', 'What is the daily working hour limit under Labor Standards Law?',
 '{"A": "6時間", "B": "8時間", "C": "10時間", "D": "12時間"}', 'B',
 '労働基準法では1日8時間、週40時間が原則です。これを超える場合は時間外労働となります。',
 'Theo Luật Tiêu chuẩn Lao động, nguyên tắc là 8 giờ/ngày, 40 giờ/tuần.',
 'Menurut Undang-Undang Standar Ketenagakerjaan, prinsipnya adalah 8 jam/hari, 40 jam/minggu.',
 'The standard is 8 hours per day, 40 hours per week under Labor Standards Law.',
 '労働法', 'medium'),

('q-003', '有給休暇は入社後何ヶ月で付与される？', 'Nghỉ phép có lương được cấp sau bao nhiêu tháng kể từ khi vào công ty?', 'Cuti tahunan diberikan setelah berapa bulan sejak masuk perusahaan?', 'After how many months is paid leave granted?',
 '{"A": "3ヶ月", "B": "6ヶ月", "C": "9ヶ月", "D": "12ヶ月"}', 'B',
 '労働基準法により、入社後6ヶ月継続勤務し、全労働日の8割以上出勤した場合に有給休暇が付与されます。',
 'Theo Luật Tiêu chuẩn Lao động, nghỉ phép có lương được cấp sau 6 tháng làm việc liên tục.',
 'Menurut Undang-Undang Standar Ketenagakerjaan, cuti tahunan diberikan setelah 6 bulan bekerja terus-menerus.',
 'Paid leave is granted after 6 months of continuous employment.',
 '労働法', 'medium'),

('q-004', '建設現場で義務付けられている安全装備は？', 'Trang bị an toàn bắt buộc tại công trường xây dựng là?', 'Peralatan keselamatan wajib di lokasi konstruksi?', 'Required safety equipment at construction sites?',
 '{"A": "ヘルメット", "B": "安全靴", "C": "安全帯", "D": "すべて"}', 'D',
 '建設現場では、ヘルメット、安全靴、安全帯の着用が義務付けられています。これらは労働者の命を守るために必須です。',
 'Tại công trường xây dựng, bắt buộc phải đeo mũ bảo hiểm, giày an toàn, và dây an toàn.',
 'Di lokasi konstruksi wajib memakai helm, sepatu keselamatan, dan sabuk pengaman.',
 'Hard hats, safety shoes, and safety harnesses are all required at construction sites.',
 '建設', 'easy'),

('q-005', '報告・連絡・相談の「報告」とは？', '"Báo cáo" trong "Báo cáo - Liên lạc - Tham vấn" là gì?', 'Apa yang dimaksud dengan "Laporan" dalam "Laporan-Kontak-Konsultasi"?', 'What does "Report" mean in "Report-Contact-Consult"?',
 '{"A": "上司に指示を仰ぐこと", "B": "業務の進捗や結果を伝えること", "C": "同僚に相談すること", "D": "顧客に連絡すること"}', 'B',
 '報告とは、指示された業務の進捗状況や結果を上司に伝えることです。タイムリーな報告により、業務がスムーズに進みます。',
 'Báo cáo là truyền đạt tiến độ và kết quả công việc được giao cho cấp trên.',
 'Laporan adalah menyampaikan kemajuan dan hasil pekerjaan yang ditugaskan kepada atasan.',
 'Report means conveying progress and results of assigned work to supervisors.',
 'ビジネスマナー', 'easy');
```

## 🎨 コンテンツ作成のヒント

### 効果的なレッスン

1. **短く分割** - 10-15分の短いレッスンが理想
2. **実例を使う** - 具体的な事例で理解しやすく
3. **多言語対応** - 少なくとも日本語とベトナム語/インドネシア語
4. **視覚的に** - 図や表を活用

### 質の高い試験問題

1. **明確な問題文** - 曖昧さを避ける
2. **適切な難易度** - 段階的に難しくする
3. **詳しい解説** - なぜその答えなのかを説明
4. **実務的** - 実際の仕事で使える知識

---

このガイドに従って、素晴らしいコンテンツを作成してください！ 🚀


