import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#0a0a0a",
        primary: {
          DEFAULT: "#faff69", // Electric Yellow
          active: "#e6eb52",
          disabled: "#3a3a1f",
        },
        surface: {
          soft: "#121212",
          card: "#1a1a1a",
          elevated: "#242424",
          yellowBand: "#faff69",
        },
        hairline: {
          DEFAULT: "#2a2a2a",
          strong: "#3a3a3a",
        },
        text: {
          main: "#ffffff",
          body: "#cccccc",
          strong: "#e6e6e6",
          muted: "#888888",
          soft: "#5a5a5a",
          onPrimary: "#0a0a0a",
        },
        accent: {
          emerald: "#22c55e",
          rose: "#ef4444",
          blue: "#3b82f6",
        },
        // Kept for backward compatibility while migrating, will remove later
        background: "#0a0a0a",
        foreground: "#ffffff",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-press-start)", "monospace"], // Temporarily keeping for old code, will replace with JetBrains Mono conceptually
      },
      spacing: {
        xxs: "4px",
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
        section: "96px",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        pill: "9999px",
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      }
    },
  },
  plugins: [],
};
export default config;
