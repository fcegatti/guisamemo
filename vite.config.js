import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-icon-180x180.png',
        'android-icon-192x192.png',
        'maskable-icon.png',
        'offline.html'
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
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,webp,png,ico}'],
        navigateFallback: 'offline.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/guisamemo\.vercel\.app\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'guisamemo-pages'
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
  }
})
