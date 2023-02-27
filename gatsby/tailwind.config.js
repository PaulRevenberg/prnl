/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        screen: ["100vh", "100lvh"],
      },
    },
  },
  plugins: [
    // plugin(function ({ addVariant }) {
    //   addVariant("square", "@media (max-aspect-ratio: 4/3)");
    // }),
  ],
};
