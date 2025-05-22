import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-icon-180x180.png',
        'android-icon-192x192.png',
        'maskable-icon.png',
        'logo.webp',
        'spain.webp',
        'galicia.webp',
        'mobile-rotate.svg',
        'avatar-default.webp',
        // Avatars
        'avatars/avatar-1.webp',
        'avatars/avatar-2.webp',
        'avatars/avatar-3.webp',
        'avatars/avatar-4.webp',
        'avatars/avatar-5.webp',
        'avatars/avatar-6.webp',
        'avatars/avatar-7.webp',
        'avatars/avatar-8.webp',
        'avatars/avatar-9.webp',
        'avatars/avatar-10.webp',
        'avatars/avatar-11.webp',
        'avatars/avatar-12.webp',
        'avatars/avatar-13.webp',
        'avatars/avatar-14.webp',
        'avatars/avatar-15.webp',
        // Cards
        'cards/card-back.webp',
        'cards/card-1.webp',
        'cards/card-2.webp',
        'cards/card-3.webp',
        'cards/card-4.webp',
        'cards/card-5.webp',
        'cards/card-6.webp',
        'cards/card-7.webp',
        'cards/card-8.webp',
        'cards/card-9.webp',
        'cards/card-10.webp',
        'cards/card-11.webp',
        'cards/card-12.webp',
        'cards/card-13.webp',
        'cards/card-14.webp',
        'cards/card-15.webp',
        'cards/card-16.webp',
        'cards/card-17.webp',
        'cards/card-18.webp',
        'cards/card-19.webp',
        'cards/card-20.webp',
        'cards/card-21.webp',
        'cards/card-22.webp',
        'cards/card-23.webp',
        'cards/card-24.webp',
        'cards/card-25.webp',
        'cards/card-26.webp',
        'cards/card-27.webp',
        'cards/card-28.webp',
        'cards/card-29.webp',
        'cards/card-30.webp',
        'cards/card-31.webp',
        'cards/card-32.webp',
        'cards/card-33.webp',
        'cards/fallback.webp',
        // Sounds
        'sounds/card-flip.mp3',
        'sounds/card-flip.ogg',
        'sounds/card-match.mp3',
        'sounds/card-match.ogg',
        'sounds/card-mismatch.mp3',
        'sounds/card-mismatch.ogg'
      ],
      manifest: {
        name: 'Guisamemo',
        short_name: 'Guisamemo',
        description: 'Juego de memoria infantil inspirado en Memorama. Para 1 a 4 jugadores.',
        theme_color: '#f9f9f9',
        background_color: '#f9f9f9',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        id: '/',
        scope: '/',
        icons: [
          {
            src: 'android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'apple-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: 'maskable-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: '/screenshot-1.webp',
            sizes: '360x642',
            type: 'image/webp',
            form_factor: 'narrow'
          },
          {
            src: '/screenshot-2.webp',
            sizes: '360x642',
            type: 'image/webp',
            form_factor: 'narrow'
          },
          {
            src: '/screenshot-3.webp',
            sizes: '360x642',
            type: 'image/webp',
            form_factor: 'narrow'
          },
          {
            src: '/screenshot-4.webp',
            sizes: '1024x768',
            type: 'image/webp',
            form_factor: 'wide'
          },
          {
            src: '/screenshot-5.webp',
            sizes: '1024x768',
            type: 'image/webp',
            form_factor: 'wide'
          },
          {
            src: '/screenshot-6.webp',
            sizes: '1024x768',
            type: 'image/webp',
            form_factor: 'wide'
          },
          {
            src: '/screenshot-7.webp',
            sizes: '1440x900',
            type: 'image/webp',
            form_factor: 'wide'
          },
          {
            src: '/screenshot-8.webp',
            sizes: '1440x900',
            type: 'image/webp',
            form_factor: 'wide'
          },
          {
            src: '/screenshot-9.webp',
            sizes: '1440x900',
            type: 'image/webp',
            form_factor: 'wide'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,webp,png,ico,ogg}'],
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'guisamemo-pages',
              networkTimeoutSeconds: 3
            }
          },
          {
            urlPattern: /^https:\/\/guisamemo\.com\/.*$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'guisamemo-assets-v1-2-0'
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@handlers': path.resolve(__dirname, 'src/handlers'),
      '@logic': path.resolve(__dirname, 'src/logic'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@i18n': path.resolve(__dirname, 'src/i18n')
    }
  },
  build: {
    sourcemap: true
  }
})
