// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import astroExpressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://yasridho.github.io",
  integrations: [
    astroExpressiveCode({
      themes: ["catppuccin-latte", "catppuccin-mocha"],
      useThemedScrollbars: false,
      styleOverrides: {
        // You can customize the look here if needed, e.g.
        // borderRadius: '0.5rem',
      },
    }),
    mdx(),
    sitemap(),
    tailwind(),
  ],
});