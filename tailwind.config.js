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
      bebas: ['Bebas Neue'],
    },
    colors: {
      green: '#00FF9D',
      lightblue: '#0086FF',
      blue: '#0A19A1',
      purple: '#AC38F6',
      darkgrey: '#404040',
      black: '#000',
      white: '#fff',
      primary: '#0A19A1',
      secondary: '#AC38F6',
    },
    extend: {
      backgroundImage: {
        colourfull: 'linear-gradient(90deg, #00FF9D 0%, #0086FF 33%, #0A19A1 68%, #AC38F6 100%)',
      },
      fontSize: {
        xxs: '0.625rem',
      },
    },
  },
  safelist: ['text-green', 'text-purple', 'text-blue', 'text-lightblue'],
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        html: { fontFamily: theme('raleway') },
      });
    }),
  ],
};
