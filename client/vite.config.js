import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://book-store-backend-z5yv.onrender.com/'
    }
  },
  plugins: [react()],
})
