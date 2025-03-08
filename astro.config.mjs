import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
  site: process.env.CI
    ? "https://psystem-astro-350zmdp11-guilhermepamas-projects.vercel.app"
    : "http://localhost:4321",
  output: "server",
  adapter: vercel({
    runtime: "nodejs18.x"
  }),
  integrations: [tailwind(), react()],
});
