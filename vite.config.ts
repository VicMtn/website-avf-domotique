import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
import type { ViteSSGOptions } from "vite-ssg";

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    // « photo.jpg?w=480;832&picture » -> AVIF + WebP + JPEG, à afficher avec <AppPicture>
    imagetools({
      defaultDirectives: (url) =>
        url.searchParams.has("picture")
          ? new URLSearchParams({ format: "avif;webp;jpg", quality: "60", as: "picture" })
          : new URLSearchParams(),
    }),
  ],
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
