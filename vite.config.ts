import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isTest = process.env.VITEST === 'true'

export default defineConfig({
  plugins: isTest ? [] : [react()],
  server: {
    port: 5173,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    include: ['src/**/*.{test,spec}.{js,ts,tsx}', 'tests/**/*.{test,spec}.{js,ts,tsx}'],
    transformMode: {
      web: [/\.tsx?$/],
    },
  },
})
