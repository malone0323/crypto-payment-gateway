/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1E40AF", // Deep blue
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#374151", // Dark gray
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#DC2626", // Vibrant red
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#059669", // Rich green
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#D97706", // Amber
          foreground: "#000000",
        },
        accent: {
          DEFAULT: "#7C3AED", // Purple
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        crypto: {
          blue: "#1E40AF",
          green: "#059669",
          purple: "#7C3AED",
          black: "#111827",
          darkBlue: "#0F172A",
          lightBlue: "#3B82F6",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(124, 58, 237, 0.4)" },
          "50%": { boxShadow: "0 0 0 10px rgba(124, 58, 237, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s infinite",
      },
      backgroundImage: {
        "crypto-gradient": "linear-gradient(to right, #1E40AF, #7C3AED)",
        "dark-gradient": "linear-gradient(to right, #0F172A, #1E293B)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
