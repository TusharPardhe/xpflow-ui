import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
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
    },
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    // loader: "tsx",
    // include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  optimizeDeps: { esbuildOptions: { loader: { ".js": "jsx" } } },
});
