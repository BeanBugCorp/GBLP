import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'X-Content-Type-Options': 'nosniff',
      'content-security-policy-report-only': "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com; script-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
    }
  }
})
