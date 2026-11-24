import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// BASE_PATH lets the GitHub Pages workflow serve the site from /<repo-name>/.
// Locally (npm run dev / build) it stays at the root.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
})
