import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Dev/preview start at $PORT (default 5173) and move to the next free port if it's taken.
const port = Number(process.env.PORT) || 5173

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port, strictPort: false },
  preview: { port, strictPort: false },
})
