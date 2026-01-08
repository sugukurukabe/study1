'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/lib/stores/authStore'

interface AdBannerProps {
  slot: string
  format?: 'horizontal' | 'vertical' | 'rectangle'
  className?: string
}

export default function AdBanner({ slot, format = 'horizontal', className = '' }: AdBannerProps) {
  const { profile } = useAuthStore()
  
  // Check if user has ad-free
  const isAdFree = profile?.ad_free_until && new Date(profile.ad_free_until) > new Date()

  useEffect(() => {
    if (!isAdFree && typeof window !== 'undefined') {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }
  }, [isAdFree])

  if (isAdFree) {
    return null
  }

  const dimensions = {
    horizontal: { width: 728, height: 90 },
    vertical: { width: 160, height: 600 },
    rectangle: { width: 300, height: 250 },
  }

  const { width, height } = dimensions[format]

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}


