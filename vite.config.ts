import * as path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import webfontDownload from "vite-plugin-webfont-dl";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";
import codegen from "vite-plugin-graphql-codegen";

import manifest from "./manifest.json";
import { config as codegenConfig } from "./codegen";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    webfontDownload(),
    svgr(),
    codegen({
      runOnStart: false,
      runOnBuild: false,
      configOverrideWatcher: {
        watch: ["src/**/*.{ts,tsx}", "!src/gql/**/*"],
      },
      config: codegenConfig,
    }),
    VitePWA({
      manifest,
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      // switch to "true" to enable sw on development
      devOptions: {
        enabled: false,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html}", "**/*.{svg,png,jpg,gif}"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
