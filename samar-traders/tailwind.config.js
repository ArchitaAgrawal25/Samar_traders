/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ["Inter", "ui-sans-serif", "system-ui"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      colors: {
        brand: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
        },
        accent: {
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#e879f9",
        },
        mint: {
          100: "#dcfce7",
          200: "#bbf7d0",
        },
        peach: {
          100: "#ffedd5",
          200: "#fed7aa",
        },
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },
    },
  },
  plugins: [],
};