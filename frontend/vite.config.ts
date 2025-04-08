import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  // preview: {
  //   port: 8080,
  //   strictPort: true,
  // },
  server: {
    // port: 8080,
    // strictPort: true,
    // host: true,
    // origin: "http://0.0.0.0:8080",
    proxy: {
      "/api": {
        // target: "http://18.220.21.201",
        // changeOrigin: true,
        // secure: false,
        target: "http://localhost:5000",
      },
    },
  },
});
