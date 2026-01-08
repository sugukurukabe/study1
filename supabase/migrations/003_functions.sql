-- Function to check and update user tier based on completed requirements
create or replace function public.update_user_tier(user_id_param uuid)
returns int as $$
declare
  new_tier int := 1;
  profile_rec record;
  kyc_verified boolean := false;
begin
  -- Get user profile
  select * into profile_rec from public.profiles where id = user_id_param;
  
  if not found then
    return 1;
  end if;
  
  -- Check Tier 1 requirements (email, name, nationality)
  if profile_rec.email is not null 
     and profile_rec.full_name is not null 
     and profile_rec.nationality is not null then
    new_tier := 1;
    
    -- Check Tier 2 requirements (prefecture, job)
    if profile_rec.prefecture is not null 
       and profile_rec.current_job is not null then
      new_tier := 2;
      
      -- Check Tier 3 requirements (verified KYC documents)
      select exists(
        select 1 from public.kyc_documents
        where user_id = user_id_param
          and doc_type = 'residence_card_front'
          and status = 'verified'
      ) and exists(
        select 1 from public.kyc_documents
        where user_id = user_id_param
          and doc_type = 'residence_card_back'
          and status = 'verified'
      ) into kyc_verified;
      
      if kyc_verified then
        new_tier := 3;
      end if;
    end if;
  end if;
  
  -- Update tier if changed
  if new_tier != profile_rec.current_tier then
    update public.profiles set current_tier = new_tier where id = user_id_param;
  end if;
  
  return new_tier;
end;
$$ language plpgsql security definer;

-- Function to process referral (grant ad-free days to both users)
create or replace function public.process_referral(referral_code_param text, new_user_id uuid)
returns boolean as $$
declare
  referrer_id_var uuid;
  ad_free_days int := 7;
begin
  -- Find referrer by code
  select id into referrer_id_var 
  from public.profiles 
  where referral_code = referral_code_param;
  
  if not found then
    return false;
  end if;
  
  -- Insert referral record
  insert into public.referrals (referrer_id, referred_id)
  values (referrer_id_var, new_user_id)
  on conflict do nothing;
  
  -- Grant ad-free period to both users
  update public.profiles
  set ad_free_until = greatest(
    coalesce(ad_free_until, now()),
    now()
  ) + interval '1 day' * ad_free_days
  where id in (referrer_id_var, new_user_id);
  
  return true;
end;
$$ language plpgsql security definer;

-- Function to award badge
create or replace function public.award_badge(user_id_param uuid, badge_type_param text, badge_data_param jsonb default null)
returns uuid as $$
declare
  badge_id uuid;
begin
  -- Check if user already has this badge
  if exists(
    select 1 from public.badges 
    where user_id = user_id_param and badge_type = badge_type_param
  ) then
    return null;
  end if;
  
  -- Insert badge
  insert into public.badges (user_id, badge_type, badge_data)
  values (user_id_param, badge_type_param, badge_data_param)
  returning id into badge_id;
  
  return badge_id;
end;
$$ language plpgsql security definer;

-- Function to calculate exam score
create or replace function public.calculate_exam_score(user_id_param uuid, question_ids text[])
returns jsonb as $$
declare
  total_questions int;
  correct_answers int;
  score_percentage numeric;
  result jsonb;
begin
  total_questions := array_length(question_ids, 1);
  
  select count(*) into correct_answers
  from public.user_answers
  where user_id = user_id_param
    and question_id = any(question_ids)
    and is_correct = true;
  
  score_percentage := (correct_answers::numeric / total_questions::numeric) * 100;
  
  result := jsonb_build_object(
    'total_questions', total_questions,
    'correct_answers', correct_answers,
    'incorrect_answers', total_questions - correct_answers,
    'score_percentage', round(score_percentage, 2)
  );
  
  return result;
end;
$$ language plpgsql security definer;

-- Function to get user learning stats
create or replace function public.get_learning_stats(user_id_param uuid)
returns jsonb as $$
declare
  stats jsonb;
begin
  select jsonb_build_object(
    'total_lessons', count(*),
    'completed', count(*) filter (where status = 'completed'),
    'in_progress', count(*) filter (where status = 'in_progress'),
    'completion_rate', round(
      (count(*) filter (where status = 'completed')::numeric / count(*)::numeric) * 100, 
      2
    )
  ) into stats
  from public.progress
  where user_id = user_id_param;
  
  return stats;
end;
$$ language plpgsql security definer;


