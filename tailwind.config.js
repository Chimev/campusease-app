/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        orange: '#f8ae24',
        secondary: '#1b656a',
        secondaryLight: "#0D757C",
        lightBlue: '#6c6cff',
        // gray: '#484848',
        lightGray2: '#4f4d4d'
      }
    },
  },
  plugins: [],
}