// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  site: "https://ubaestatus.mospit.al",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [icon(), alpinejs()],
});