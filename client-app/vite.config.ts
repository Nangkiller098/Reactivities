import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  // build to controller API /wwwroot/index.html
  build: {
    outDir: "../API/wwwroot",
    chunkSizeWarningLimit: 1600,
  },
});
