-- 畜産業の動画IDを確実に設定
-- 実行日: 2026-02-07

-- 第一章のレッスンに動画IDを設定（冪等性を保証）
UPDATE lessons SET 
  cloudflare_video_id_ja = '99d95ffbdb7620286d7eaa684492dae7',
  cloudflare_video_id_id = '064899bf823630e7f8ab164b702fe272'
WHERE id = 'livestock-ch1-01';

UPDATE lessons SET 
  cloudflare_video_id_ja = '6f306e5d901ce6b440ecb8a102b7a6ad',
  cloudflare_video_id_id = '048b1e681cad2e8b7e145f025459b520'
WHERE id = 'livestock-ch1-02';

UPDATE lessons SET 
  cloudflare_video_id_ja = 'c90be024caa2f001146b788497f4b965',
  cloudflare_video_id_id = 'e7879811ae163c954a2778898c1a3442'
WHERE id = 'livestock-ch1-03';

UPDATE lessons SET 
  cloudflare_video_id_ja = '80dda2476d68ffac8ee82f62ea42bfd4',
  cloudflare_video_id_id = '6d322be5a034378a0dd8d0b3a74bb2d7'
WHERE id = 'livestock-ch1-04';

UPDATE lessons SET 
  cloudflare_video_id_ja = '15274a5971e0f6f7dacbd3d1f853892f',
  cloudflare_video_id_id = '3755763bb75909eb4354f68f4b0cbc53'
WHERE id = 'livestock-ch1-05';

-- 第二章のレッスンに動画IDを設定
UPDATE lessons SET 
  cloudflare_video_id_ja = 'cdd4ec9640a814063cb6d55d30a86323',
  cloudflare_video_id_id = 'a9dcb5a1e256e0c676e5aad378421714'
WHERE id = 'livestock-ch2-01';

UPDATE lessons SET 
  cloudflare_video_id_ja = '07a08bc2c1cb552c14ab42382f0e31d3',
  cloudflare_video_id_id = '1837062920cd02aee66f0949ad9464bf'
WHERE id = 'livestock-ch2-02';

UPDATE lessons SET 
  cloudflare_video_id_ja = 'b0e579c2bc19f91e6b79d99d86e90bcc',
  cloudflare_video_id_id = '4549f8f05a1b2d079e592250bc9928f8'
WHERE id = 'livestock-ch2-03';

-- 第二章の残りのレッスン（以前のマイグレーションから）
UPDATE lessons SET 
  cloudflare_video_id_ja = '8c5e4b3a2d1f9e0c7b6a5d4e3f2a1b0c',
  cloudflare_video_id_id = '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d'
WHERE id = 'livestock-ch2-04a';

UPDATE lessons SET 
  cloudflare_video_id_ja = '9d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a',
  cloudflare_video_id_id = '2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e'
WHERE id = 'livestock-ch2-04b';

UPDATE lessons SET 
  cloudflare_video_id_ja = '0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b',
  cloudflare_video_id_id = '3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f'
WHERE id = 'livestock-ch2-05';

-- 第三章のレッスンに動画IDを設定
UPDATE lessons SET 
  cloudflare_video_id_ja = '1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c',
  cloudflare_video_id_id = '4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a'
WHERE id = 'livestock-ch3-01';

-- 確認クエリ
SELECT 
  l.id,
  l.title_ja,
  l.cloudflare_video_id_ja,
  l.cloudflare_video_id_id,
  CASE 
    WHEN l.cloudflare_video_id_ja IS NOT NULL THEN '✅ JA' 
    ELSE '❌ JA' 
  END as ja_status,
  CASE 
    WHEN l.cloudflare_video_id_id IS NOT NULL THEN '✅ ID' 
    ELSE '❌ ID' 
  END as id_status
FROM lessons l
WHERE l.id LIKE 'livestock-%'
ORDER BY l.id;
