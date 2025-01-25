import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import polyfillNode from "rollup-plugin-polyfill-node";
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";

const viteConfig = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, "", "") };
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        assets: path.resolve(__dirname, "./src/assets"),
        layouts: path.resolve(__dirname, "./src/layouts"),
        routes: path.resolve(__dirname, "./src/routes"),
        pages: path.resolve(__dirname, "./src/pages"),
        examples: path.resolve(__dirname, "./src/examples"),
        components: path.resolve(__dirname, "./src/components"),
        "xrpl-connect": path.resolve(__dirname, "./src/xrpl-connect"),
        ws: "xrpl/dist/npm/client/WSWrapper",
      },
    },
    esbuild: {
      loader: "jsx",
      include: /src\/.*\.jsx?$/,
      // loader: "tsx",
      // include: /src\/.*\.[tj]sx?$/,
      exclude: [],
    },
    define: {
      "process.env": process.env,
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: "globalThis",
        },
        loader: { ".js": "jsx" },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
          }),
        ],
      },
    },
    build: {
      rollupOptions: {
        plugins: [polyfillNode()],
      },
    },
  });
};

export default viteConfig;
