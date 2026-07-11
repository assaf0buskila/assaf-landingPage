import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // All colors read the CSS variables defined in app/globals.css :root
        // so the palette has a single source of truth. The -rgb channel form
        // keeps slash opacity (text-navy/85, bg-mist/60) working.
        paper: "rgb(var(--paper-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        navy: "rgb(var(--navy-rgb) / <alpha-value>)",
        steel: "rgb(var(--steel-rgb) / <alpha-value>)",
        sky: "rgb(var(--sky-rgb) / <alpha-value>)",
        mist: "rgb(var(--mist-rgb) / <alpha-value>)",
        action: "rgb(var(--action-rgb) / <alpha-value>)",
      },
      fontFamily: {
        sans: [
          "Assistant",
          "Inter",
          "Arial",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(47, 95, 147, 0.12)",
        lift: "0 28px 90px rgba(6, 27, 53, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
