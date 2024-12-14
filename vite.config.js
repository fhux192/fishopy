import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@services": path.resolve(__dirname, "src/services"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@scss": path.resolve(__dirname, "src/scss"),
    },
  },
  define: {
    "process.env": process.env,
  },
});
