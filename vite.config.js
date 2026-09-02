/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Build output goes to ./dist so Flask (server.py) can serve it on port 8080.
// Vitest reads the `test` field below (dev server settings are ignored at test time).
export default defineConfig({
  plugins: [
    react(),
    // Makes the app installable and fully offline-capable. The generated service
    // worker precaches the built app shell (HTML + hashed JS/CSS + icons), so the
    // app runs even when server.py / the network is unavailable. All flashcard
    // content lives in data.js (bundled) and stats live in localStorage, so no
    // server round-trip is needed once the shell is cached.
    VitePWA({
      registerType: 'autoUpdate',   // new build → SW updates itself on next load
      injectRegister: 'auto',       // registration code injected automatically (no main.jsx change)
      includeAssets: ['favicon.png', 'apple-touch-icon.png'],
      workbox: {
        // Precache the whole app shell. globPatterns are matched against dist/.
        globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
        navigateFallback: '/index.html', // any route → cached shell when offline
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: 'CCNA Training',
        short_name: 'CCNA',
        description: 'Mobile-first flashcard trainer for CCNA exam prep — works offline.',
        lang: 'en',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#0f172a',
        theme_color: '#0f172a',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      // Flip to true if you want to test offline behaviour under `npm run dev`.
      devOptions: { enabled: false },
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{js,jsx}'],
    globals: false,
    restoreMocks: true,
  },
});
