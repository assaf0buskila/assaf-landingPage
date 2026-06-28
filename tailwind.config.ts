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
        paper: "#F8FBFF",
        ink: "#021024",
        navy: "#052659",
        steel: "#5483B3",
        sky: "#7DA0CA",
        mist: "#C1E8FF",
        action: "#2563EB",
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
        soft: "0 24px 80px rgba(5, 38, 89, 0.12)",
        lift: "0 28px 90px rgba(2, 16, 36, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
