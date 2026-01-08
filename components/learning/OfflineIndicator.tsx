'use client'

import { useOfflineStore } from '@/lib/stores/offlineStore'
import { Badge } from '@/components/ui/badge'
import { WifiOff, Wifi, Download } from 'lucide-react'

interface OfflineIndicatorProps {
  lessonId?: string
  showText?: boolean
}

export default function OfflineIndicator({ lessonId, showText = true }: OfflineIndicatorProps) {
  const { isOnline, isCached } = useOfflineStore()
  const cached = lessonId ? isCached(lessonId) : false

  if (!isOnline) {
    return (
      <Badge variant="outline" className="bg-amber-50 border-amber-300 text-amber-800">
        <WifiOff className="h-3 w-3 mr-1" />
        {showText && 'オフライン'}
      </Badge>
    )
  }

  if (cached) {
    return (
      <Badge variant="outline" className="bg-green-50 border-green-300 text-green-800">
        <Download className="h-3 w-3 mr-1" />
        {showText && 'オフライン利用可'}
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="bg-blue-50 border-blue-300 text-blue-800">
      <Wifi className="h-3 w-3 mr-1" />
      {showText && 'オンライン'}
    </Badge>
  )
}


