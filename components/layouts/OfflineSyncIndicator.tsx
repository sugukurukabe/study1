'use client'

import { useOfflineSync } from '@/lib/hooks/useOfflineSync'
import { WifiOff, Wifi, RefreshCw } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function OfflineSyncIndicator() {
  const { isOnline } = useOfflineSync()

  return (
    <Badge 
      variant="outline" 
      className={`fixed bottom-20 md:bottom-4 right-4 z-40 ${
        isOnline ? 'bg-green-50 border-green-300 text-green-800' : 'bg-amber-50 border-amber-300 text-amber-800'
      }`}
    >
      {isOnline ? (
        <>
          <Wifi className="h-3 w-3 mr-1" />
          オンライン
        </>
      ) : (
        <>
          <WifiOff className="h-3 w-3 mr-1" />
          オフライン
        </>
      )}
    </Badge>
  )
}


