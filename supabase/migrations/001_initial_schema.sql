-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  nationality text,
  current_tier int default 1 check (current_tier >= 1 and current_tier <= 3),
  prefecture text,
  current_job text,
  sns_info jsonb,
  referral_code text unique,
  ad_free_until timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- KYC Documents table (Private)
create table public.kyc_documents (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  doc_type text not null check (doc_type in ('residence_card_front', 'residence_card_back')),
  storage_path text not null,
  has_drivers_license boolean,
  status text default 'pending' check (status in ('pending', 'verified', 'rejected')),
  ocr_data jsonb,
  verified_at timestamptz,
  verified_by uuid references public.profiles(id),
  rejection_reason text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Lessons table
create table public.lessons (
  id text primary key,
  title_ja text not null,
  title_vi text,
  title_id text,
  title_en text,
  description_ja text,
  description_vi text,
  description_id text,
  description_en text,
  cloudflare_video_id text,
  audio_storage_path text,
  content jsonb,
  required_tier int default 1 check (required_tier >= 1 and required_tier <= 3),
  duration_seconds int,
  order_index int,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Progress table
create table public.progress (
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id text references public.lessons(id) on delete cascade not null,
  status text not null check (status in ('not_started', 'in_progress', 'completed')),
  quiz_score int,
  last_position int default 0,
  last_accessed_at timestamptz default now(),
  completed_at timestamptz,
  primary key (user_id, lesson_id)
);

-- Referrals table
create table public.referrals (
  id uuid default uuid_generate_v4() primary key,
  referrer_id uuid references public.profiles(id) on delete cascade not null,
  referred_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(referrer_id, referred_id)
);

-- Badges table
create table public.badges (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  badge_type text not null,
  badge_data jsonb,
  earned_at timestamptz default now()
);

-- Exam questions table
create table public.exam_questions (
  id text primary key,
  question_ja text not null,
  question_vi text,
  question_id text,
  question_en text,
  options jsonb not null,
  correct_answer text not null,
  explanation_ja text,
  explanation_vi text,
  explanation_id text,
  explanation_en text,
  category text,
  difficulty text check (difficulty in ('easy', 'medium', 'hard')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- User answers table
create table public.user_answers (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  question_id text references public.exam_questions(id) on delete cascade not null,
  answer text not null,
  is_correct boolean not null,
  time_taken_seconds int,
  answered_at timestamptz default now()
);

-- Create indexes
create index idx_profiles_referral_code on public.profiles(referral_code);
create index idx_profiles_tier on public.profiles(current_tier);
create index idx_kyc_documents_user_id on public.kyc_documents(user_id);
create index idx_kyc_documents_status on public.kyc_documents(status);
create index idx_progress_user_id on public.progress(user_id);
create index idx_progress_lesson_id on public.progress(lesson_id);
create index idx_referrals_referrer_id on public.referrals(referrer_id);
create index idx_badges_user_id on public.badges(user_id);
create index idx_user_answers_user_id on public.user_answers(user_id);
create index idx_user_answers_question_id on public.user_answers(question_id);

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add triggers for updated_at
create trigger set_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.kyc_documents
  for each row execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.lessons
  for each row execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.exam_questions
  for each row execute function public.handle_updated_at();

-- Function to generate unique referral code
create or replace function public.generate_referral_code()
returns text as $$
declare
  code text;
  exists boolean;
begin
  loop
    code := upper(substring(md5(random()::text) from 1 for 8));
    select exists(select 1 from public.profiles where referral_code = code) into exists;
    exit when not exists;
  end loop;
  return code;
end;
$$ language plpgsql;

-- Trigger to auto-generate referral code on profile creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  new.referral_code := public.generate_referral_code();
  return new;
end;
$$ language plpgsql;

create trigger on_auth_user_created
  before insert on public.profiles
  for each row execute function public.handle_new_user();

