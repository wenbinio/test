import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Hash routing + relative base means the built site works from a plain static
// host or a sub-path with no server rewrite rules. It does NOT work from
// file:// -- the build emits an ES module, which browsers refuse to load over
// that scheme on CORS grounds. Serve it over http(s).
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
