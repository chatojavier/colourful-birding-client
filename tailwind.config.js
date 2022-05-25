const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/templates/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      raleway: ['Raleway', 'sans-serif'],
      bebas: ['Bebas Neue', 'cursive'],
    },
    colors: {
      green: '#00FF9D',
      lightblue: '#0086FF',
      blue: '#0A19A1',
      purple: '#AC38F6',
      darkgrey: '#404040',
      black: '#000',
      white: '#fff',
    },
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        html: { fontFamily: theme('raleway') },
      });
    }),
  ],
};
