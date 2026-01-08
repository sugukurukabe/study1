// Custom Service Worker for additional caching strategies

const CACHE_NAME = 'sugu-study-v1'
const AUDIO_CACHE_NAME = 'audio-lessons-v1'
const IMAGE_CACHE_NAME = 'images-v1'

// URLs to cache on install
const PRECACHE_URLS = [
  '/offline-fallback.html',
]

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS)
    })
  )
  self.skipWaiting()
})

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('sugu-study-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )
  self.clients.claim()
})

// Fetch event with strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Audio files: Cache First
  if (url.pathname.includes('/storage/v1/object/public/audio/')) {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response
        }
        return fetch(request).then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(AUDIO_CACHE_NAME).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return response
        })
      })
    )
    return
  }

  // Images: Cache First
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response
        }
        return fetch(request).then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(IMAGE_CACHE_NAME).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return response
        })
      })
    )
    return
  }

  // API calls: Network First
  if (url.pathname.startsWith('/api/') || url.hostname.includes('supabase')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(
          JSON.stringify({ error: 'Offline', offline: true }),
          { status: 503, headers: { 'Content-Type': 'application/json' } }
        )
      })
    )
    return
  }

  // HTML pages: Network First, fallback to offline page
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match('/offline-fallback.html')
      })
    )
    return
  }

  // Default: Network First
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request).then((response) => {
        return response || new Response('Offline', { status: 503 })
      })
    })
  )
})

// Background sync for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgressData())
  }
})

async function syncProgressData() {
  // This would sync offline data when connection is restored
  // Implementation depends on your IndexedDB structure
  console.log('Syncing offline data...')
}


