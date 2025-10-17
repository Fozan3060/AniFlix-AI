/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
theme: {
  extend: {
    colors: {
      primary: "#030014",
      secondary: "#0F0D23",
      accent: "#AB8BFF",
      'dark-bg': '#0B0B1E',  
      'dark-card': '#06061a', 
      'text-primary': '#FFFFFF',
      'muted-text': '#A8B5DB', 
      light: {
        100: "#D6C7FF",
        200: "#D1C0FF",
        300: "#A8B5DB",
        400: "#ECECFF",
      },
      dark: {
        100: "#9CA4AB",
        200: "#121212",
      },
    },
  },
},

  plugins: [],
}