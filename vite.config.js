import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const securityHeaders = {
  'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
  'X-Content-Type-Options': 'nosniff',
  'content-security-policy': "default-src 'self'; font-src 'self' https://fonts.gstatic.com data:; style-src 'self' https://fonts.googleapis.com; script-src 'self'; img-src 'self' https://i.scdn.co https://revistamujeractual.com https://i0.wp.com/ data:; connect-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
};

export default defineConfig({
  plugins: [react()],
  server: { headers: securityHeaders },
  preview: { headers: securityHeaders },
})
