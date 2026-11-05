import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import { fileURLToPath, URL } from "node:url"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/](?:react|react-dom|scheduler)[\\/]/,
              priority: 20,
            },
            {
              name: 'motion-vendor',
              test: /node_modules[\\/](?:framer-motion|motion)[\\/]/,
              priority: 15,
            },
            {
              name: 'scroll-vendor',
              test: /node_modules[\\/](?:gsap|lenis)[\\/]|node_modules[\\/]@gsap[\\/]react[\\/]/,
              priority: 10,
            },
            {
              name: 'icon-vendor',
              test: /node_modules[\\/]react-icons[\\/]/,
              priority: 5,
            },
          ],
        },
      },
    },
  },
})
