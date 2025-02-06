import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
        maximumFileSizeToCacheInBytes: 30000000
      },
      manifest: {
        name: "Git Projector App",
        short_name: "Git Projector",
        description: "A Vite React app with PWA support",
        icons: [
          {
            src: "./public/android-chrome-dark-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./public/android-chrome-dark-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "./public/android-chrome-light-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./public/android-chrome-light-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "./public/apple-touch-icon-dark.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "./public/apple-touch-icon-light.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "./public/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "./public/favicon-dark-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "./public/favicon-dark-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "./public/favicon-dark.ico",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "./public/favicon-light-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "./public/favicon-light.ico",
            sizes: "32x32",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
