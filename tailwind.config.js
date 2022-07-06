const plugin = require('tailwindcss/plugin');
const lineClap = require('@tailwindcss/line-clamp');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/templates/**/*.{js,ts,jsx,tsx}',
    './src/lib/util.js',
  ],
  theme: {
    fontFamily: {
      raleway: ['Raleway', 'sans-serif'],
      bebas: ['Bebas Neue'],
    },
    colors: {
      green: {
        100: '#e6fff5',
        200: '#ccffeb',
        300: '#b3ffe2',
        400: '#99ffd8',
        500: '#80ffce',
        600: '#66ffc4',
        700: '#4dffba',
        800: '#33ffb1',
        900: '#1affa7',
        DEFAULT: '#00FF9D',
      },
      lightblue: {
        100: '#e6f3ff',
        200: '#cce7ff',
        300: '#b3dbff',
        400: '#99cfff',
        500: '#80c3ff',
        600: '#66b6ff',
        700: '#4daaff',
        800: '#339eff',
        900: '#1a92ff',
        DEFAULT: '#0086ff',
      },
      blue: {
        100: '#e7e8f6',
        200: '#ced1ec',
        300: '#b6bae3',
        400: '#9da3d9',
        500: '#858cd0',
        600: '#6c75c7',
        700: '#545ebd',
        800: '#3b47b4',
        900: '#2330aa',
        DEFAULT: '#0a19a1',
      },
      purple: {
        100: '#f7ebfe',
        200: '#eed7fd',
        300: '#e6c3fc',
        400: '#deaffb',
        500: '#d69cfb',
        600: '#cd88fa',
        700: '#c574f9',
        800: '#bd60f8',
        900: '#b44cf7',
        DEFAULT: '#ac38f6',
      },
      darkgrey: '#404040',
      grey: '#808080',
      lightgrey: '#C0C0C0',
      red: '#FF0000',
      black: '#000',
      white: '#fff',
      primary: '#0A19A1',
      secondary: '#AC38F6',
    },
    extend: {
      backgroundImage: {
        colourfull: 'linear-gradient(90deg, #00FF9D 0%, #0086FF 33%, #0A19A1 68%, #AC38F6 100%)',
        'colourfull-v': 'linear-gradient(180deg, #00FF9D 0%, #0086FF 33%, #0A19A1 68%, #AC38F6 100%)',
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
    lineClap,
  ],
};
