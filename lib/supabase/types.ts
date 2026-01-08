// Supabaseの型定義
// 実際のマイグレーション後に `npx supabase gen types typescript` で自動生成

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          nationality: string | null
          current_tier: number
          prefecture: string | null
          current_job: string | null
          sns_info: Record<string, string> | null
          referral_code: string | null
          ad_free_until: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          nationality?: string | null
          current_tier?: number
          prefecture?: string | null
          current_job?: string | null
          sns_info?: Record<string, string> | null
          referral_code?: string | null
          ad_free_until?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          nationality?: string | null
          current_tier?: number
          prefecture?: string | null
          current_job?: string | null
          sns_info?: Record<string, string> | null
          referral_code?: string | null
          ad_free_until?: string | null
          created_at?: string
        }
      }
      kyc_documents: {
        Row: {
          id: string
          user_id: string
          doc_type: string
          storage_path: string
          has_drivers_license: boolean | null
          status: string
          ocr_data: Record<string, any> | null
          verified_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          doc_type: string
          storage_path: string
          has_drivers_license?: boolean | null
          status?: string
          ocr_data?: Record<string, any> | null
          verified_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          doc_type?: string
          storage_path?: string
          has_drivers_license?: boolean | null
          status?: string
          ocr_data?: Record<string, any> | null
          verified_at?: string | null
          created_at?: string
        }
      }
      progress: {
        Row: {
          user_id: string
          lesson_id: string
          status: string
          quiz_score: number | null
          last_accessed_at: string
        }
        Insert: {
          user_id: string
          lesson_id: string
          status: string
          quiz_score?: number | null
          last_accessed_at?: string
        }
        Update: {
          user_id?: string
          lesson_id?: string
          status?: string
          quiz_score?: number | null
          last_accessed_at?: string
        }
      }
      referrals: {
        Row: {
          id: string
          referrer_id: string
          referred_id: string
          created_at: string
        }
        Insert: {
          id?: string
          referrer_id: string
          referred_id: string
          created_at?: string
        }
        Update: {
          id?: string
          referrer_id?: string
          referred_id?: string
          created_at?: string
        }
      }
      badges: {
        Row: {
          id: string
          user_id: string
          badge_type: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          badge_type: string
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          badge_type?: string
          earned_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          title_ja: string
          title_vi: string | null
          title_id: string | null
          title_en: string | null
          cloudflare_video_id: string | null
          audio_storage_path: string | null
          content: Record<string, any> | null
          required_tier: number
          created_at: string
        }
        Insert: {
          id: string
          title_ja: string
          title_vi?: string | null
          title_id?: string | null
          title_en?: string | null
          cloudflare_video_id?: string | null
          audio_storage_path?: string | null
          content?: Record<string, any> | null
          required_tier?: number
          created_at?: string
        }
        Update: {
          id?: string
          title_ja?: string
          title_vi?: string | null
          title_id?: string | null
          title_en?: string | null
          cloudflare_video_id?: string | null
          audio_storage_path?: string | null
          content?: Record<string, any> | null
          required_tier?: number
          created_at?: string
        }
      }
      exam_questions: {
        Row: {
          id: string
          question_ja: string
          options: Record<string, any>
          correct_answer: string
          explanation_ja: string | null
          category: string | null
          created_at: string
        }
        Insert: {
          id: string
          question_ja: string
          options: Record<string, any>
          correct_answer: string
          explanation_ja?: string | null
          category?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          question_ja?: string
          options?: Record<string, any>
          correct_answer?: string
          explanation_ja?: string | null
          category?: string | null
          created_at?: string
        }
      }
      user_answers: {
        Row: {
          id: string
          user_id: string
          question_id: string
          answer: string
          is_correct: boolean
          answered_at: string
        }
        Insert: {
          id?: string
          user_id: string
          question_id: string
          answer: string
          is_correct: boolean
          answered_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          question_id?: string
          answer?: string
          is_correct?: boolean
          answered_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}


