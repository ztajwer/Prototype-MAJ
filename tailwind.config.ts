import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maj: {
          alabaster: "#FAF7F2",
          parchment: "#F2EAD8",
          gold: "#D4BC82",
          "logo-gold": "#9C8550",
          "mid-gold": "#B8A06A",
          vault: "#2A2016",
        },
        ink: {
          950: "#FAF7F2",
          900: "#F2EAD8",
          800: "#D4BC82",
          700: "#D4BC82",
          600: "#B8A06A",
          500: "#9C8550",
          400: "#9C8550",
          300: "#2A2016",
          200: "#2A2016",
          100: "#2A2016",
        },
        gold: {
          50: "#FAF7F2",
          100: "#F2EAD8",
          200: "#F2EAD8",
          300: "#D4BC82",
          400: "#D4BC82",
          500: "#B8A06A",
          600: "#9C8550",
          700: "#9C8550",
          800: "#2A2016",
          900: "#2A2016",
        },
        chrome: {
          100: "#2A2016",
          200: "#2A2016",
          300: "#2A2016",
          400: "#9C8550",
          500: "#B8A06A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
      },
      letterSpacing: {
        luxury: "0.22em",
        label: "0.36em",
        caps: "0.5em",
      },
      borderRadius: {
        maj: "2px",
        "maj-card": "8px",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(ellipse at center, rgba(212, 188, 130, 0.12) 0%, rgba(250, 247, 242, 0) 65%)",
        "gold-line":
          "linear-gradient(90deg, transparent, #D4BC82, transparent)",
      },
      boxShadow: {
        "maj-card": "0 20px 50px -24px rgba(42, 32, 22, 0.15)",
      },
      keyframes: {
        "shimmer-pan": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "shimmer-pan": "shimmer-pan 6s linear infinite",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
