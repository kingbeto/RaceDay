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
    outDir: 'dist',
    // Enable source maps for production debugging
    sourcemap: false,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate Vue core
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          // Separate UI libraries (only include actually used ones)
          'ui-vendor': ['@headlessui/vue'],
          // Separate utilities
          'utils-vendor': ['@vueuse/core']
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        timeout: 60000
      },
      '/health': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  },
  publicDir: 'public',
  // Optimize dependencies
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', '@vueuse/core']
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: true
  }
})
