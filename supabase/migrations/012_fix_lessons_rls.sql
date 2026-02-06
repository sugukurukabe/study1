-- Fix RLS policies for lessons table
-- Ensure authenticated users can read all lessons

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can read lessons" ON public.lessons;

-- Create policy to allow authenticated users to read all lessons
CREATE POLICY "Users can read lessons"
ON public.lessons FOR SELECT
TO authenticated
USING (true);

-- Also ensure public can read lessons (for preview functionality)
DROP POLICY IF EXISTS "Public can read lessons" ON public.lessons;

CREATE POLICY "Public can read lessons"
ON public.lessons FOR SELECT
TO anon
USING (true);

-- Add comment
COMMENT ON POLICY "Users can read lessons" ON public.lessons IS 'Allow all authenticated users to read lesson content';
COMMENT ON POLICY "Public can read lessons" ON public.lessons IS 'Allow anonymous users to preview lesson metadata';
