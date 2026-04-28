/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1a1a1a",
        muted: "#5a5a5a",
        accent: "#3b2f6b",
        accentSoft: "#eeedfe",
        border: "#c8c6e8",
        cardFront: "#f6f3ff",
        cardBack: "#fbfbfb",
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
