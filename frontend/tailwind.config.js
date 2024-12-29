/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bgPrimary: "#070728",
        primary: "#000000",
        accent: "#999999",
        
    },
  },
},
  plugins: [],

}


