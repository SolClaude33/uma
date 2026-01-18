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
        primary: {
          yellow: "#F3BA2F",
          amber: "#FFB800",
        },
        secondary: {
          gold: "#FFD700",
        },
        dark: {
          bg: "#0a0a0f",
          surface: "#151520",
        },
      },
      backgroundImage: {
        "track-lines": "repeating-linear-gradient(90deg, transparent, transparent 98px, rgba(243, 186, 47, 0.1) 98px, rgba(243, 186, 47, 0.1) 100px)",
      },
      animation: {
        "glow": "glow 2s ease-in-out infinite alternate",
        "track-move": "track-move 20s linear infinite",
        "sparkle": "sparkle 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(243, 186, 47, 0.5)" },
          "100%": { boxShadow: "0 0 40px rgba(243, 186, 47, 0.8), 0 0 60px rgba(255, 184, 0, 0.6)" },
        },
        "track-move": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "200px 0" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
