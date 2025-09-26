import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Manual chunk strategy to break out heavy libs so page-level lazy routes load faster.
// Adjust groups carefully to avoid excessive network requests.
const manualChunks = (id: string) => {
  if (!id.includes('node_modules')) return undefined;
  if (id.includes('react-syntax-highlighter')) return 'syntax';
  if (id.includes('react-router')) return 'router';
  if (id.includes('react')) return 'react-vendor';
  if (id.includes('lenis') || id.includes('simplebar')) return 'scrolling';
  return undefined; // let Rollup decide / group into default vendor chunk
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
    // Optional: tighten chunk size warning so we notice regressions sooner (keep default 500 if preferred)
    // chunkSizeWarningLimit: 450,
  },
});
