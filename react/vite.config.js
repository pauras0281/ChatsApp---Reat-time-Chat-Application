import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',  // Allow external access (for viewing on phone)
    port: 3000,        // Default port (can be changed if needed)
    strictPort: true,  // Ensure the port is exactly what you set
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  plugins: [tailwindcss(),react()],
})
