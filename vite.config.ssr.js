import { defineConfig } from "vite";
import path from "path";
import process from "process";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import dayjs from "dayjs";
import { visualizer } from "rollup-plugin-visualizer";
import vitePluginConditionalCompile from "vite-plugin-conditional-compile";

const queryString = process.argv[4] || "";
// 自动版本号
const __APP_VERSION__ = dayjs().format("YYMMDD.HH.mm");
// 是否包含 PWA
const __INCLUDING_PWA__ = queryString.indexOf("pwa=true") > -1;
console.log("-------CURRENT VERSION-----------", __APP_VERSION__);
const plugins = [
  react(),
  vitePluginConditionalCompile({
    env: {
      __APP_VERSION__,
      __INCLUDING_PWA__,
    },
  }),
  visualizer(),
];

// 是否包含 PWA
if (__INCLUDING_PWA__) {
  plugins.push(
    VitePWA({
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,woff2}"],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      },
    })
  );
}

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
  ssr: {
    noExternal: ["@mui/icons-material", "@mui/lab", "@mui/material"],
  },
  build: {
    outDir: `./build/server`,
    rollupOptions: {
      input: "./src/index.ssr.jsx",
      output: {
        // manualChunks 配置
        // manualChunks: {
        //   "react-vendor": ["react", "react-dom", "react-router-dom"],
        //   "monaco-editor": ["monaco-editor", "@monaco-editor/react"],
        //   mui: ["@mui/icons-material", "@mui/lab", "@mui/material"],
        // },
      },
    },
    // rollupOptions: {
    //   output: {
    //     entryFileNames: "assets/[name].js",
    //     chunkFileNames: "assets/[name].js",
    //     assetFileNames: "assets/[name].[ext]",
    //   },
    // },
  },
  plugins,
});
