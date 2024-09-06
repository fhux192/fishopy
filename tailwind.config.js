/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-grid":
          "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
        gradient: "linear-gradient(45deg,#0A6C62, #20a69f,  #95cbc4, #20a69f ,#0A6C62)",
      },
      backgroundSize: {
        "4vh-4vh": "4vh 4vh",
      },
      colors: {
        primaryBlack: "#1a202c",
        secondBlack: "rgb(13, 12, 34)",
        thirdBlack: "#191919",
        primaryGrey: "#4a4a4a",
        secondGrey: "#999999",
        primaryTeal: "#319795",
        secondTeal: "#FFDA79",
        primaryOrange: "#F57C00",
        overlay: "rgba(0, 0, 0, 0.9)",
        "button-search": "#f8f7f9",
      },
      fontFamily: {
        body: ["Playwrite GB S", "sans-serif"],
        polska: ["Polska", "cursive"],
      },
      keyframes: {
        pulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        pulse: "pulse 2s infinite",
      },
    },
  },
  variants: {},
  plugins: [],
  // corePlugins: {
  //   preflight: false, // <== disable this!
  // },
};
