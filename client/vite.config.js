import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        secure: true,
      },
    },
  },
  plugins: [react(), eslint()],
});
