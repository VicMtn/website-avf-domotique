import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
import { writeFileSync } from "node:fs";
import type { ViteSSGOptions } from "vite-ssg";
import { canonicalUrl } from "./src/content/site";

/** Pages publiées, collectées pendant le rendu pour le sitemap */
let renderedPaths: string[] = [];
const NOT_INDEXED = ["/404", "/mentions-legales"];

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
    includedRoutes: (paths) => {
      renderedPaths = paths.filter((p) => !p.includes(":"));
      return renderedPaths.concat("/404");
    },
    onFinished: () => {
      const urls = renderedPaths
        .filter((p) => !NOT_INDEXED.includes(p))
        .map((p) => `  <url><loc>${canonicalUrl(p)}</loc></url>`);
      writeFileSync(
        "dist/sitemap.xml",
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
      );
    },
  } satisfies Partial<ViteSSGOptions>,
});
