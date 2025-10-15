import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Set the port. Replit requires port 5000. Use process.env.PORT as a fallback.
    port: Number(process.env.PORT) || 5000,

    // Listen on all network interfaces. Required for Replit.
    host: '0.0.0.0',
    
    // Configure HMR to work through Replit's proxy.
    hmr: {
      clientPort: 443,
    },
  },
});
