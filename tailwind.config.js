/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: "#ef476f",
      },
      fontFamily: {
        mogra: ['"Mogra"', "system-ui"],
        delius: ['"Delius Unicase"', "cursive"],
        funnel: ['"Funnel Display"', "sans-serif"],
        league: ['"League Spartan"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
