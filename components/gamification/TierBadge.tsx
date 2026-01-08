import { Badge } from '@/components/ui/badge'
import { getTierName, getTierColor, TierLevel } from '@/lib/utils/tierCheck'
import { Crown, Star, User } from 'lucide-react'

interface TierBadgeProps {
  tier: TierLevel
  locale?: string
  showIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function TierBadge({ tier, locale = 'ja', showIcon = true, size = 'md' }: TierBadgeProps) {
  const tierName = getTierName(tier, locale)
  const colorClass = getTierColor(tier)
  
  const icons: Record<TierLevel, React.ReactNode> = {
    1: <User className={`h-${size === 'sm' ? '3' : size === 'md' ? '4' : '5'} w-${size === 'sm' ? '3' : size === 'md' ? '4' : '5'}`} />,
    2: <Star className={`h-${size === 'sm' ? '3' : size === 'md' ? '4' : '5'} w-${size === 'sm' ? '3' : size === 'md' ? '4' : '5'}`} />,
    3: <Crown className={`h-${size === 'sm' ? '3' : size === 'md' ? '4' : '5'} w-${size === 'sm' ? '3' : size === 'md' ? '4' : '5'}`} />,
  }
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  }

  return (
    <Badge className={`${colorClass} ${sizeClasses[size]} flex items-center space-x-1`}>
      {showIcon && icons[tier]}
      <span>{tierName}</span>
    </Badge>
  )
}


