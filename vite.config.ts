import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import type { ViteSSGOptions } from "vite-ssg";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  ssgOptions: {
    // /mentions-legales -> /mentions-legales/index.html : URLs propres sur un hébergement statique
    dirStyle: "nested",
    formatting: "minify",
    // La route « attrape-tout » est générée une fois, sous /404/
    includedRoutes: (paths) => paths.filter((p) => !p.includes(":")).concat("/404"),
  } satisfies Partial<ViteSSGOptions>,
});
