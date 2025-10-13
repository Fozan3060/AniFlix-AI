/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#030014",
        secondary: "#0F0D23",
        accent: "#AB8BFF",
        liner_background: "linear-gradient(90deg, #D6C7FF 0%, #AB8BFF 100%)",
        light:{
          100: "#D6C7FF",
          200: "#D1C0FF",
          300: "#A8B5DB",
          400: "#ECECFF",
        },
        dark:{
          100: "#9CA4AB",
          200: "#121212",
        }
      },
    },
  },
  plugins: [],
}