import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/  — SSG handled by `vite-react-ssg build`.
// manualChunks only applies to the CLIENT build; in the SSR build React is
// externalized and cannot be placed in a manual chunk.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  // Inline above-the-fold critical CSS into each pre-rendered page, defer the rest.
  ssgOptions: {
    // Emit nested index.html files (e.g. /treatments/invisalign/index.html) so clean
    // URLs resolve natively and don't depend solely on Netlify's pretty-URL processing.
    dirStyle: 'nested',
    beastiesOptions: { preload: 'swap', pruneSource: false },
  },
  build: isSsrBuild
    ? {}
    : {
        rollupOptions: {
          output: {
            // Keep React in a stable vendor chunk so app edits don't bust its cache each deploy.
            manualChunks: {
              vendor: ['react', 'react-dom', 'react-router-dom'],
            },
          },
        },
      },
}))
