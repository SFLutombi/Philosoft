import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "icons/icon-192.svg", "icons/icon-512.svg", "icons/icon-maskable.svg"],
      manifest: {
        name: "PhiloSift",
        short_name: "PhiloSift",
        description: "Discover your philosophy archetype and hidden misalignment patterns.",
        start_url: "/splash",
        scope: "/",
        display: "standalone",
        orientation: "portrait-primary",
        theme_color: "#131313",
        background_color: "#131313",
        icons: [
          {
            src: "/icons/icon-192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
            purpose: "any"
          },
          {
            src: "/icons/icon-512.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any"
          },
          {
            src: "/icons/icon-maskable.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,jpg,jpeg,webp,woff,woff2}"],
        cleanupOutdatedCaches: true,
        navigateFallback: "/index.html"
      },
      devOptions: {
        enabled: true
      }
    })
  ]
});
