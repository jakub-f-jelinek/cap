import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

const srcDir = fileURLToPath(new URL("./src", import.meta.url));

// Component .scss files get $variables and mixins injected automatically,
// so they never need to hand-write relative @use paths.
const scssPrelude = `@use "styles/variables" as *;\n@use "styles/mixins" as *;\n`;

export default defineConfig({
  plugins: [react()],
  base: "/cap/",
  resolve: {
    alias: {
      "@": srcDir,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        loadPaths: [srcDir],
        additionalData: (source, filename) => {
          if (
            filename.includes("styles/variables") ||
            filename.includes("styles/mixins")
          ) {
            return source;
          }
          return scssPrelude + source;
        },
      },
    },
  },
});
