'use client'

import { useAuthStore } from '../stores/authStore'
import { TierLevel } from '../utils/tierCheck'

interface TierAccessResult {
  hasAccess: boolean
  currentTier: TierLevel
  requiredTier: TierLevel
  nextTierPath: string
}

export function useTierAccess(requiredTier: TierLevel): TierAccessResult {
  const { profile } = useAuthStore()
  
  const currentTier = (profile?.current_tier || 1) as TierLevel
  const hasAccess = currentTier >= requiredTier
  
  const nextTierPath = hasAccess
    ? ''
    : `/profile/tier-upgrade?target=${requiredTier}`
  
  return {
    hasAccess,
    currentTier,
    requiredTier,
    nextTierPath,
  }
}

// 使用例:
// const { hasAccess, nextTierPath } = useTierAccess(3)
// if (!hasAccess) router.push(nextTierPath)


