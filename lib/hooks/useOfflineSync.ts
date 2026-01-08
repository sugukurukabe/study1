'use client'

import { useEffect, useRef } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useOfflineStore } from '../stores/offlineStore'
import { syncOfflineData, initDB } from '../utils/offlineCache'

export function useOfflineSync() {
  const { user } = useAuthStore()
  const { isOnline, setOnlineStatus } = useOfflineStore()
  const syncInProgressRef = useRef(false)

  useEffect(() => {
    // Initialize IndexedDB
    initDB().catch(console.error)

    // Listen for online/offline events
    const handleOnline = () => {
      setOnlineStatus(true)
      if (user && !syncInProgressRef.current) {
        syncInProgressRef.current = true
        syncOfflineData(user.id)
          .finally(() => {
            syncInProgressRef.current = false
          })
      }
    }

    const handleOffline = () => {
      setOnlineStatus(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Sync on mount if online
    if (user && navigator.onLine && !syncInProgressRef.current) {
      syncInProgressRef.current = true
      syncOfflineData(user.id)
        .finally(() => {
          syncInProgressRef.current = false
        })
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [user, setOnlineStatus])

  // Periodic sync every 5 minutes
  useEffect(() => {
    if (!user) return

    const interval = setInterval(() => {
      if (navigator.onLine && !syncInProgressRef.current) {
        syncInProgressRef.current = true
        syncOfflineData(user.id)
          .finally(() => {
            syncInProgressRef.current = false
          })
      }
    }, 5 * 60 * 1000) // 5 minutes

    return () => clearInterval(interval)
  }, [user])

  return { isOnline }
}


