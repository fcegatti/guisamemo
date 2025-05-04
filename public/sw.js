/* eslint-env serviceworker */

// 🔁 Define version for cache busting
const CACHE_VERSION = 'v1.1.1'
const CACHE_NAME = `guisamemo-cache-${CACHE_VERSION}`

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/logo.webp',
  '/manifest.json',
  '/favicon.ico',
  '/apple-icon-180x180.png',
  '/android-icon-192x192.png',
  '/maskable-icon.png',
  '/spain.webp',
  '/galicia.webp',
  '/mobile-rotate.svg',

  // Avatars
  '/avatars/avatar-1.webp',
  '/avatars/avatar-2.webp',
  '/avatars/avatar-3.webp',
  '/avatars/avatar-4.webp',
  '/avatars/avatar-5.webp',
  '/avatars/avatar-6.webp',
  '/avatars/avatar-7.webp',
  '/avatars/avatar-8.webp',
  '/avatars/avatar-9.webp',
  '/avatars/avatar-10.webp',
  '/avatars/avatar-11.webp',
  '/avatars/avatar-12.webp',
  '/avatars/avatar-13.webp',
  '/avatars/avatar-14.webp',
  '/avatars/avatar-15.webp',
  '/avatar-default.webp',

  // Cards
  '/cards/card-back.webp',
  '/cards/card-1.webp',
  '/cards/card-2.webp',
  '/cards/card-3.webp',
  '/cards/card-4.webp',
  '/cards/card-5.webp',
  '/cards/card-6.webp',
  '/cards/card-7.webp',
  '/cards/card-8.webp',
  '/cards/card-9.webp',
  '/cards/card-10.webp',
  '/cards/card-11.webp',
  '/cards/card-12.webp',
  '/cards/card-13.webp',
  '/cards/card-14.webp',
  '/cards/card-15.webp',
  '/cards/card-16.webp',
  '/cards/card-17.webp',
  '/cards/card-18.webp',
  '/cards/card-19.webp',
  '/cards/card-20.webp',
  '/cards/card-21.webp',
  '/cards/card-22.webp',
  '/cards/card-23.webp',
  '/cards/card-24.webp',
  '/cards/card-25.webp',
  '/cards/card-26.webp',
  '/cards/card-27.webp',
  '/cards/card-28.webp',
  '/cards/card-29.webp',
  '/cards/card-30.webp',
  '/cards/card-31.webp',
  '/cards/card-32.webp',
  '/cards/card-33.webp',
  '/cards/fallback.webp'
]

// ✅ Install event: cache essential files
self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE)
    })
  )
})

// ♻️ Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key)
          }
          return null
        })
      )
    )
  )
})

// 📦 Fetch event: serve from cache if available
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      if (cacheResponse) {
        return cacheResponse
      }

      return fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html')
        }
      })
    })
  )
})

// 🔄 Allows app to force SW update
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
