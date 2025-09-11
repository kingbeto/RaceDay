import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts']
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './app'),
      '@/components': resolve(__dirname, './app/components'),
      '@/composables': resolve(__dirname, './app/composables'),
      '@/stores': resolve(__dirname, './app/stores'),
      '@/types': resolve(__dirname, './app/types'),
      '@/services': resolve(__dirname, './app/services')
    }
  }
})
