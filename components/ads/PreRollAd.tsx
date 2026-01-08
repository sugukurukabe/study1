'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/lib/stores/authStore'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'

interface PreRollAdProps {
  onComplete: () => void
}

export default function PreRollAd({ onComplete }: PreRollAdProps) {
  const { profile } = useAuthStore()
  const [countdown, setCountdown] = useState(5)
  const [canSkip, setCanSkip] = useState(false)
  
  // Check if user has ad-free
  const isAdFree = profile?.ad_free_until && new Date(profile.ad_free_until) > new Date()

  useEffect(() => {
    if (isAdFree) {
      onComplete()
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanSkip(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isAdFree, onComplete])

  if (isAdFree) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 relative">
        {canSkip && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onComplete}
            className="absolute top-4 right-4"
          >
            <X className="h-4 w-4 mr-1" />
            スキップ
          </Button>
        )}

        <div className="text-center">
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">
              広告表示中...
            </div>
            <div className="text-4xl font-bold text-gray-900">
              {countdown > 0 ? `${countdown}秒` : 'スキップ可能'}
            </div>
          </div>

          {/* Ad Placeholder */}
          <div className="bg-gray-100 rounded-lg p-12 mb-6">
            <ins
              className="adsbygoogle"
              style={{ display: 'block', minHeight: '250px' }}
              data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
              data-ad-format="fluid"
              data-ad-layout-key="-6t+ed+2i-1n-4w"
            />
          </div>

          <p className="text-sm text-gray-600">
            広告なしで学習したいですか？
            <a href="/referral" className="text-indigo-600 hover:underline ml-1">
              友達を招待して7日間無料
            </a>
          </p>
        </div>
      </Card>
    </div>
  )
}


