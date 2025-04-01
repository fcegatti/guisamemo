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
  '/maskable-icon.png'
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
