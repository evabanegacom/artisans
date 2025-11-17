// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'           // ← This is the key import

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // This makes "@/..." work everywhere
      "@": path.resolve(__dirname, "./src"),
    },
  },
})