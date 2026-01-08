-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.kyc_documents enable row level security;
alter table public.lessons enable row level security;
alter table public.progress enable row level security;
alter table public.referrals enable row level security;
alter table public.badges enable row level security;
alter table public.exam_questions enable row level security;
alter table public.user_answers enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- KYC Documents policies (very restrictive)
create policy "Users can view their own KYC documents"
  on public.kyc_documents for select
  using (
    auth.uid() = user_id 
    or exists (
      select 1 from public.profiles 
      where id = auth.uid() and current_tier = 3 -- Admin access (Tier 3でadmin判定)
    )
  );

create policy "Users can insert their own KYC documents"
  on public.kyc_documents for insert
  with check (auth.uid() = user_id);

create policy "Only admins can update KYC documents"
  on public.kyc_documents for update
  using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and current_tier = 3
    )
  );

-- Lessons policies (tier-based access)
create policy "Users can view lessons based on their tier"
  on public.lessons for select
  using (
    required_tier <= (
      select current_tier from public.profiles where id = auth.uid()
    )
  );

-- Progress policies
create policy "Users can view their own progress"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.progress for update
  using (auth.uid() = user_id);

-- Referrals policies
create policy "Users can view referrals they made"
  on public.referrals for select
  using (auth.uid() = referrer_id or auth.uid() = referred_id);

create policy "Users can insert referrals"
  on public.referrals for insert
  with check (auth.uid() = referred_id);

-- Badges policies
create policy "Users can view their own badges"
  on public.badges for select
  using (auth.uid() = user_id);

-- Exam questions policies (all authenticated users can view)
create policy "Authenticated users can view exam questions"
  on public.exam_questions for select
  using (auth.uid() is not null);

-- User answers policies
create policy "Users can view their own answers"
  on public.user_answers for select
  using (auth.uid() = user_id);

create policy "Users can insert their own answers"
  on public.user_answers for insert
  with check (auth.uid() = user_id);

-- Storage policies for private bucket (kyc-documents)
-- Note: これはSupabase Dashboardで設定するか、別途実行
-- insert into storage.buckets (id, name, public) values ('kyc-documents', 'kyc-documents', false);

-- create policy "Users can upload their own KYC documents"
--   on storage.objects for insert
--   with check (
--     bucket_id = 'kyc-documents' 
--     and auth.uid()::text = (storage.foldername(name))[1]
--   );

-- create policy "Users can view their own KYC documents"
--   on storage.objects for select
--   using (
--     bucket_id = 'kyc-documents' 
--     and (
--       auth.uid()::text = (storage.foldername(name))[1]
--       or exists (select 1 from public.profiles where id = auth.uid() and current_tier = 3)
--     )
--   );


