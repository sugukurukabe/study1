// Tier判定ロジック

export type TierLevel = 1 | 2 | 3

export interface TierRequirements {
  tier1: {
    email: boolean
    name: boolean
    nationality: boolean
  }
  tier2: {
    prefecture: boolean
    currentJob: boolean
    snsAccounts?: boolean // 任意
  }
  tier3: {
    residenceCardFront: boolean
    residenceCardBack: boolean
    driversLicense?: boolean // 任意
  }
}

export function checkTierEligibility(
  profile: any,
  kycDocuments?: any[]
): TierLevel {
  // Tier 1の要件チェック
  const hasTier1 = profile.email && profile.full_name && profile.nationality
  
  if (!hasTier1) {
    return 1
  }

  // Tier 2の要件チェック
  const hasTier2 = profile.prefecture && profile.current_job
  
  if (!hasTier2) {
    return 1
  }

  // Tier 3の要件チェック
  if (kycDocuments && kycDocuments.length > 0) {
    const hasFront = kycDocuments.some(
      doc => doc.doc_type === 'residence_card_front' && doc.status === 'verified'
    )
    const hasBack = kycDocuments.some(
      doc => doc.doc_type === 'residence_card_back' && doc.status === 'verified'
    )
    
    if (hasFront && hasBack) {
      return 3
    }
  }

  return 2
}

export function getTierName(tier: TierLevel, locale: string = 'ja'): string {
  const names: Record<string, Record<TierLevel, string>> = {
    ja: { 1: 'ゲスト', 2: '学習者', 3: '認証済み' },
    vi: { 1: 'Khách', 2: 'Học viên', 3: 'Đã xác minh' },
    id: { 1: 'Tamu', 2: 'Pelajar', 3: 'Terverifikasi' },
    en: { 1: 'Guest', 2: 'Learner', 3: 'Verified' },
  }
  
  return names[locale]?.[tier] || names.en[tier]
}

export function getTierColor(tier: TierLevel): string {
  const colors: Record<TierLevel, string> = {
    1: 'text-gray-500 bg-gray-100',
    2: 'text-blue-500 bg-blue-100',
    3: 'text-amber-500 bg-gradient-to-r from-amber-100 to-yellow-100',
  }
  
  return colors[tier]
}

export function getNextTierRequirements(currentTier: TierLevel): string[] {
  const requirements: Record<TierLevel, string[]> = {
    1: ['都道府県を登録', '現在の職種を登録', 'SNSアカウント登録（任意）'],
    2: ['在留カード表面をアップロード', '在留カード裏面をアップロード', '運転免許の有無を回答'],
    3: [], // すでに最高Tier
  }
  
  return requirements[currentTier] || []
}


