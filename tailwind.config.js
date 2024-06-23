/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Configure your color palette here
        primaryBlack: "#141414",
        secondBlack: "#111111",
        primaryGrey: "#666666",
        secondGrey: "#999999",
        primaryTeal: "#0A6C62",
        secondTeal: "#2dd4bf",
        overlay: "rgba(0, 0, 0, 0.9)",
        "button-search": "#f8f7f9",
      },
      fontFamily: {
        body: ["Rowdies", "sans-serif"],
      
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        pulse: 'pulse 2s infinite',
      },
    },
  },
  variants: {},
  plugins: [],
};
