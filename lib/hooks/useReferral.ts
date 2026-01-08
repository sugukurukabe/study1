'use client'

import { useState } from 'react'
import { createClient } from '../supabase/client'
import { useAuthStore } from '../stores/authStore'

export function useReferral() {
  const { user, profile } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const applyReferralCode = async (code: string) => {
    if (!user) {
      setError('ログインが必要です')
      return false
    }

    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      
      // Call the process_referral function
      const { data, error: rpcError } = await supabase.rpc('process_referral', {
        referral_code_param: code,
        new_user_id: user.id,
      })

      if (rpcError) {
        setError('無効な紹介コードです')
        return false
      }

      if (!data) {
        setError('紹介コードが見つかりません')
        return false
      }

      return true
    } catch (err) {
      setError('エラーが発生しました')
      return false
    } finally {
      setLoading(false)
    }
  }

  const getReferralStats = async () => {
    if (!user) return null

    const supabase = createClient()
    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('referrer_id', user.id)

    if (error) return null
    return {
      total: data?.length || 0,
      referrals: data || [],
    }
  }

  return {
    applyReferralCode,
    getReferralStats,
    loading,
    error,
  }
}


