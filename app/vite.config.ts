import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@/components': resolve(__dirname, './components'),
      '@/composables': resolve(__dirname, './composables'),
      '@/stores': resolve(__dirname, './stores'),
      '@/types': resolve(__dirname, './types'),
      '@/data': resolve(__dirname, './data'),
      '@/pages': resolve(__dirname, './pages')
    }
  },
  build: {
    outDir: 'dist'
  },
  server: {
    host: true,
    port: 5173
  },
  publicDir: 'public'
})
