import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@star-realms/shared": path.resolve(__dirname, "../shared/src/index.ts"),
      "@star-realms/shared/types": path.resolve(__dirname, "../shared/src/types.ts"),
      "@star-realms/shared/cards": path.resolve(__dirname, "../shared/src/cards.ts"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Dev: proxy /api/* to local wrangler dev on 8787.
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true,
        ws: true,
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
    },
  },
});
