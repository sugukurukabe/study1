-- Add learning preferences to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS preferred_sectors text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS learning_goal text,
ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS daily_goal_minutes int DEFAULT 30;

-- Add comment for documentation
COMMENT ON COLUMN public.profiles.preferred_sectors IS 'Array of sector IDs user wants to focus on (e.g., agriculture, livestock)';
COMMENT ON COLUMN public.profiles.learning_goal IS 'User learning goal (e.g., exam_preparation, skill_improvement, career_change)';
COMMENT ON COLUMN public.profiles.onboarding_completed IS 'Whether user has completed initial onboarding';
COMMENT ON COLUMN public.profiles.daily_goal_minutes IS 'Daily learning goal in minutes';
