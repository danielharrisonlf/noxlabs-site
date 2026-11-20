// @ts-check
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://noxlabs.tech",
  output: "static",
  trailingSlash: "ignore",
  build: {
    format: "directory",
    // CSS pequeno vai inline no HTML: uma requisição a menos no caminho crítico.
    inlineStylesheets: "auto",
  },
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
});
