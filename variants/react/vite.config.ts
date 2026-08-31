import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Hash routing + relative base means the built site works from a plain static
// host, a sub-path, or even file:// with no server rewrite rules.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    // Deliberately conservative: covers Chrome/Edge 88+, Safari 14 (incl. iOS),
    // Firefox 88+, and the Chromium forks behind Samsung Internet and Opera.
    target: ['es2020', 'chrome87', 'safari14', 'firefox88', 'edge88'],
    cssTarget: ['chrome87', 'safari14', 'firefox88', 'edge88'],
    sourcemap: false,
  },
})
