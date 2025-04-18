import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
