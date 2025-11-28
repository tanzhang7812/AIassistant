import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { URL } from 'url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
})
