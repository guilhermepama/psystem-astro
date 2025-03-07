import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";

export default defineConfig({
  site: "https://psystem-astro-350zmdp11-guilhermepamas-projects.vercel.app",
  output: "server",
  adapter: vercel({
    runtime: "nodejs18.x" // ✅ Define Node.js 18 explicitamente
  }),
  integrations: [tailwind(), solidJs()]
});
