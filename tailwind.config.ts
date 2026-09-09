import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0B1026",
        "bg-secondary": "#161B33",
        "brand-primary": "#F4C95D",
        "brand-secondary": "#5B6EE1",
        "brand-accent": "#7FE7D8",
        "text-main": "#F5F3ED",
        "text-muted": "#9CA3C4",
        // palette "Dive Mind" untuk transisi section Gameplay
        "dive-bg": "#050914",
        "dive-accent": "#00E5C7",
        "dive-secondary": "#8C6BFF",
      },
      fontFamily: {
        display: ["var(--font-silkscreen)", "monospace"],
        body: ["var(--font-jakarta)", "sans-serif"],
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
