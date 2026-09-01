import path from 'node:path';
import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => {
  const { VITE_BASE_PATH } = loadEnv(mode, process.cwd(), '');
  const base = VITE_BASE_PATH || '/';

  return {
  base,
  plugins: [
    mdx(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon.svg', 'icons/favicon.svg', 'images/**/*'],
      manifest: {
        name: 'The Bloom Lectern',
        short_name: 'Bloom Lectern',
        description: 'An offline lectern companion for The Last Bloom.',
        theme_color: '#EDE3C8',
        background_color: '#F4EDD8',
        display: 'standalone',
        start_url: base,
        icons: [
          {
            src: '/icons/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,woff2,json,mdx}']
      },
      devOptions: {
        enabled: false
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
    include: ['tests/unit/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['tests/e2e/**']
  }
  };
});
