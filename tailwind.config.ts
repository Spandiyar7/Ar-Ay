import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#03090b",
          900: "#071416",
          800: "#0d2427"
        },
        mint: {
          500: "#b7f45a",
          400: "#c7ff70",
          100: "#effbd9"
        },
        warm: {
          50: "#f7f8f5",
          100: "#eef1ec",
          200: "#dfe5de"
        },
        teal: {
          900: "#06383e",
          800: "#07515a",
          700: "#0b6c77",
          100: "#d8eeee"
        },
        skysoft: {
          50: "#f4f8f8",
          100: "#e4eff1",
          200: "#c7e2e8"
        },
        gold: {
          500: "#b89859",
          200: "#e4d1a4",
          100: "#f4ecd7"
        }
      },
      boxShadow: {
        soft: "0 24px 90px rgba(3, 9, 11, 0.18)",
        card: "0 16px 50px rgba(3, 9, 11, 0.09)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
