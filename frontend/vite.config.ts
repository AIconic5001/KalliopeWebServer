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
        // target: "http://kalliope-be-488144718577.us-central1.run.app",
        // target: "http://52.15.187.50",
        target: "http://localhost:5000",

        changeOrigin: true,
        secure: false,
      },
    },
  },
});
