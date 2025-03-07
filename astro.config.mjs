import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";

export default defineConfig({
  site: "",
  output: "server",
  adapter: vercel({
    runtime: "nodejs18.x" // ✅ Define Node.js 18 explicitamente
  }),
  integrations: [tailwind(), solidJs()]
});
