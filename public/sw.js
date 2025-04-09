/* eslint-env serviceworker */

const CACHE_NAME = 'guisamemo-cache-v1'

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/logo.webp',
  '/manifest.json',
  '/favicon.ico',
  '/apple-icon-180x180.png',
  '/android-icon-192x192.png',
  '/maskable-icon.png',

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
  '/cards/card-15.webp'
]

// ✅ Install event: cache essential files
self.addEventListener('install', (event) => {
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
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})
