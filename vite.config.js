import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Dev/preview start at $PORT (default 5173) and move to the next free port if it's taken.
const port = Number(process.env.PORT) || 5173

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port, strictPort: false },
  preview: { port, strictPort: false },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'lucide-vendor';
          }
          if (id.includes('src/data/srd51')) {
            return 'srd51-data';
          }
          if (id.includes('src/data/srd52')) {
            return 'srd52-data';
          }
        }
      }
    }
  }
})
