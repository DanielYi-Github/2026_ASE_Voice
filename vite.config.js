import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // GitHub Pages 子目錄部署路徑 (須與 Repo 名稱一致)
  build: {
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
        }
      }
    }
  }
})
