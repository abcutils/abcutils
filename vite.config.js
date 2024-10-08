import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import dayjs from "dayjs";
import { visualizer } from "rollup-plugin-visualizer";
import vitePluginConditionalCompile from "vite-plugin-conditional-compile";

// const queryString = process.argv[4] || "";
// 自动版本号
const __APP_VERSION__ = dayjs().format("YYMMDD.HH.mm");
// 是否包含 PWA
const __INCLUDING_PWA__ = true; //queryString.indexOf("pwa=true") > -1;

export default defineConfig({
  base: __INCLUDING_PWA__ ? "/" : "./",
  define: {
    __APP_VERSION__: JSON.stringify(__APP_VERSION__),
    __INCLUDING_PWA__: __INCLUDING_PWA__,
    "process.env": {},
  },
  resolve: {
    alias: [{ find: "$src", replacement: path.resolve("./src") }],
  },
  build: {
    outDir: `./build/client`,
    rollupOptions: {
      output: {
        // manualChunks 配置
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "monaco-editor": ["monaco-editor", "@monaco-editor/react"],
          mui: ["@mui/icons-material", "@mui/lab", "@mui/material"],
        },
      },
    },
  },
  plugins: [
    react(),
    vitePluginConditionalCompile({
      env: {
        __APP_VERSION__,
        __INCLUDING_PWA__,
      },
    }),
    visualizer(),
    VitePWA({
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,woff2}"],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      },
      manifest: {
        name: 'ABC Utils',
        short_name: 'ABC Utils',
        start_url:"/apps/json",
        description: 'ABC Utils - 免费、开源、集成AI能力的日常工具库',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
