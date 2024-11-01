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
        White: "#f0f6f5",
        Grey: "#707070",
        Grey2: "#bfbfbf",
        Black: "rgba(30, 30, 30, 1)",
        Black2: "#303030",
        Teal: "#2daab6",
        Teal2: "#cfefeb",
        Teal3: "#f0f6f5",
        Teal4:"#0a6c62",
        Red: "#ff0000",
        bordercl: "#e9e9e9",
        h2cl: "#5f84a8",
        h1cl: "#315376",
        pcl: "#808080",
        overlay: "rgba(0, 0, 0, 0.3)",
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
