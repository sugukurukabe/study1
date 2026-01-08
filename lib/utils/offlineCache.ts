// IndexedDB wrapper for offline data
const DB_NAME = 'sugu-study-offline'
const DB_VERSION = 1
const STORES = {
  lessons: 'lessons',
  progress: 'progress',
  questions: 'questions',
}

export async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      // Create object stores
      if (!db.objectStoreNames.contains(STORES.lessons)) {
        db.createObjectStore(STORES.lessons, { keyPath: 'id' })
      }

      if (!db.objectStoreNames.contains(STORES.progress)) {
        const progressStore = db.createObjectStore(STORES.progress, { keyPath: 'lesson_id' })
        progressStore.createIndex('user_id', 'user_id', { unique: false })
      }

      if (!db.objectStoreNames.contains(STORES.questions)) {
        db.createObjectStore(STORES.questions, { keyPath: 'id' })
      }
    }
  })
}

export async function saveToIndexedDB(storeName: string, data: any): Promise<void> {
  const db = await initDB()
  const transaction = db.transaction([storeName], 'readwrite')
  const store = transaction.objectStore(storeName)
  
  return new Promise((resolve, reject) => {
    const request = store.put(data)
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

export async function getFromIndexedDB(storeName: string, key: string): Promise<any> {
  const db = await initDB()
  const transaction = db.transaction([storeName], 'readonly')
  const store = transaction.objectStore(storeName)
  
  return new Promise((resolve, reject) => {
    const request = store.get(key)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function getAllFromIndexedDB(storeName: string): Promise<any[]> {
  const db = await initDB()
  const transaction = db.transaction([storeName], 'readonly')
  const store = transaction.objectStore(storeName)
  
  return new Promise((resolve, reject) => {
    const request = store.getAll()
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function cacheAudioForLesson(lessonId: string, audioUrl: string): Promise<void> {
  if (!('serviceWorker' in navigator) || !('caches' in window)) {
    console.warn('Service Worker or Cache API not supported')
    return
  }

  try {
    const cache = await caches.open('audio-lessons-v1')
    await cache.add(audioUrl)
    
    // Mark as cached in IndexedDB
    await saveToIndexedDB(STORES.lessons, {
      id: lessonId,
      cached_audio: true,
      cached_at: Date.now(),
    })
  } catch (error) {
    console.error('Failed to cache audio:', error)
  }
}

export async function syncOfflineData(userId: string): Promise<void> {
  if (!navigator.onLine) {
    console.log('Offline: skipping sync')
    return
  }

  try {
    // Get offline progress data
    const offlineProgress = await getAllFromIndexedDB(STORES.progress)
    
    if (offlineProgress.length === 0) {
      return
    }

    // Send to Supabase
    const { createClient } = await import('../supabase/client')
    const supabase = createClient()
    
    for (const progress of offlineProgress) {
      await supabase
        .from('progress')
        .upsert({
          user_id: userId,
          lesson_id: progress.lesson_id,
          status: progress.status,
          last_position: progress.last_position,
          last_accessed_at: new Date().toISOString(),
        })
    }

    console.log('Synced offline data successfully')
  } catch (error) {
    console.error('Failed to sync offline data:', error)
  }
}

export async function clearOfflineCache(): Promise<void> {
  // Clear IndexedDB
  const db = await initDB()
  const stores = [STORES.lessons, STORES.progress, STORES.questions]
  
  for (const storeName of stores) {
    const transaction = db.transaction([storeName], 'readwrite')
    const store = transaction.objectStore(storeName)
    await new Promise((resolve, reject) => {
      const request = store.clear()
      request.onsuccess = () => resolve(undefined)
      request.onerror = () => reject(request.error)
    })
  }

  // Clear cache storage
  if ('caches' in window) {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.map(name => caches.delete(name)))
  }
}


