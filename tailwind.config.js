const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './source/**/*.html',
    './source/**/*.{js,jsx,ts,tsx}'
  ],
  prefix: 'aw-',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        yellow: colors.yellow
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
