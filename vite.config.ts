import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const getCache = ({ name, pattern }: any) => ({
  urlPattern: pattern,
  handler: "CacheFirst" as const,
  options: {
    cacheName: name,
    expiration: {
      maxEntries: 500,
      maxAgeSeconds: 60 * 60 * 24 * 365 * 2, // 2 years
    },
    cacheableResponse: {
      statuses: [200],
    },
  },
});

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "*.png", "*.svg"],
      workbox: {
        runtimeCaching: [
          getCache({
            pattern: /.*openstreetmap.*/,
            name: "map-tiles",
          }),
          getCache({
            pattern: /.*leaflet.*/,
            name: "map-assets",
          }),
        ],
      },
      manifest: {
        name: "Geolocation PWA",
        short_name: "GeoPWA",
        description: "My Awesome Geolocation App description",
        theme_color: "#6200EE",
        icons: [
          {
            src: "logo-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "logo-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      manifestFilename: "manifest.json",
    }),
  ],
});
