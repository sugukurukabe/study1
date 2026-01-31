-- 畜産業レッスンに動画IDを設定（第二章残り + 第三章）
-- 実行日: 2026-01-31

-- 第二章の残りのレッスンに動画IDを設定
UPDATE lessons SET 
  cloudflare_video_id_ja = '9b328157ca732db99c7b0a6f90b23e25',
  cloudflare_video_id_id = 'b3869fb106f0e7cfbd35e344f5f3f375'
WHERE id = 'livestock-ch2-04a';

UPDATE lessons SET 
  cloudflare_video_id_ja = '7b98fefc710a130774177e277056dc5f',
  cloudflare_video_id_id = 'fa4c94b1f8703f285eef9b115580480a'
WHERE id = 'livestock-ch2-04b';

UPDATE lessons SET 
  cloudflare_video_id_ja = '8ac01cee0f48f1bbf4d238b9f68000f7',
  cloudflare_video_id_id = '75e1e55d4442351afcfd1ff6b98d96a7'
WHERE id = 'livestock-ch2-05';

-- 第三章のレッスンに動画IDを設定
UPDATE lessons SET 
  cloudflare_video_id_ja = 'ab6507883dde404901d8506216c74ce9',
  cloudflare_video_id_id = '1919c3721c271c3a55b088862a839dee'
WHERE id = 'livestock-ch3-01';

-- 確認クエリ
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
  END as id_status,
  l.cloudflare_video_id_ja,
  l.cloudflare_video_id_id
FROM lessons l
WHERE l.id LIKE 'livestock-ch2%' OR l.id LIKE 'livestock-ch3%'
ORDER BY l.id;
