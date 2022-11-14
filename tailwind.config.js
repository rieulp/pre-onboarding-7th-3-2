const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      primary: '#468FF7',
      bg_blue: '#112141',
      bg_grey: '#F0F2F5',
      grey: '#A3A9AF',
      text_black: '#212121',
      red: '#EC5B56',
      yellow: '#EFB041',
      light_grey: '#FAFAFA',
    },
  },
  plugins: [],
};
