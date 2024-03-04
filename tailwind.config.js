/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Configure your color palette here

        primaryBlack: "#141414",
        primaryGrey:"#666666",
        teal2:"#088080",
        "button-search": "#f8f7f9",
      },
      fontFamily:{
        body:["Sacramento"]
      },
    },
  },
  plugins: [],
};
