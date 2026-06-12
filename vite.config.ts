import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          pdf: ['@react-pdf/renderer'],
          vendor: ['react', 'react-dom', 'framer-motion', 'zustand'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
});
