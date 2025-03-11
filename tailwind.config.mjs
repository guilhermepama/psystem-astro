/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: "#AC28DB",
        secondary: "#6498FC", //#FF2E63
        terciary: "#79F289",
        dark: "#252A34",
        ligh: "#EAEAEA",
      },
    },
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "system-ui"],	

    }
  },
  plugins: [],
};