const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: '#468FF7',
      darkblue: '#112141',
      bg_grey: '#F0F2F5',
      grey: '#A3A9AF',
      textblack: '#212121',
      red: '#EC5B56',
      yellow: '#EFB041',
      lightgrey: '#FAFAFA',
      white: '#FFFFFF',
    },
    extend: {},
  },
  plugins: [],
};
