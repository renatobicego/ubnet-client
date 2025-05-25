// tailwind.config.js

import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      font: {
        eurostile: ["var(--font-eurostile)"],
        helvetica: ["var(--font-helvetica-neue)"],
      },
      colors: {
        primary: "#0D4DA1",
        secondary: "#FFFFFF",
        black: "#222222",
      },
      backgroundImage: {
        primary_bg: "url('/background.png')",
        secondary_bg: "url('/background-2.png')",
      },
      screens: {
        "2xl": "1440px",
      },
    },
  },
  plugins: [heroui()],
};

export default config;
