-- Ensure language-specific video and audio columns exist
-- This migration is idempotent and can be run multiple times safely

ALTER TABLE public.lessons
ADD COLUMN IF NOT EXISTS cloudflare_video_id_ja TEXT,
ADD COLUMN IF NOT EXISTS cloudflare_video_id_id TEXT,
ADD COLUMN IF NOT EXISTS cloudflare_video_id_vi TEXT,
ADD COLUMN IF NOT EXISTS cloudflare_video_id_en TEXT,
ADD COLUMN IF NOT EXISTS audio_storage_path_ja TEXT,
ADD COLUMN IF NOT EXISTS audio_storage_path_id TEXT,
ADD COLUMN IF NOT EXISTS audio_storage_path_vi TEXT,
ADD COLUMN IF NOT EXISTS audio_storage_path_en TEXT;

-- Add comments for documentation
COMMENT ON COLUMN public.lessons.cloudflare_video_id_ja IS 'Cloudflare Stream video ID for Japanese language';
COMMENT ON COLUMN public.lessons.cloudflare_video_id_id IS 'Cloudflare Stream video ID for Indonesian language';
COMMENT ON COLUMN public.lessons.cloudflare_video_id_vi IS 'Cloudflare Stream video ID for Vietnamese language';
COMMENT ON COLUMN public.lessons.cloudflare_video_id_en IS 'Cloudflare Stream video ID for English language';
COMMENT ON COLUMN public.lessons.audio_storage_path_ja IS 'Supabase Storage path for Japanese audio';
COMMENT ON COLUMN public.lessons.audio_storage_path_id IS 'Supabase Storage path for Indonesian audio';
COMMENT ON COLUMN public.lessons.audio_storage_path_vi IS 'Supabase Storage path for Vietnamese audio';
COMMENT ON COLUMN public.lessons.audio_storage_path_en IS 'Supabase Storage path for English audio';
