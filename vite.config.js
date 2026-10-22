import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/xbox-api": {
        target: "https://api.xbl.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/xbox-api/, ""),
      },
    },
  },
});