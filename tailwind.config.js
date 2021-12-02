// const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./source/**/*.html', './source/**/*.{js,jsx,ts,tsx}'],
  prefix: 'aw-',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        gray: {
          100: '#e9e9e9',
          200: '#d3d3d3',
          300: '#bdbdbd',
          400: '#a7a7a7',
          500: '#919191',
          600: '#7a7a7a',
          700: '#646464',
          800: '#4e4e4e',
          900: '#383838',
        },

        brown: {
          100: '#EAE9E6',
          200: '#D6D3CE',
          300: '#C1BEB5',
          400: '#ADA89D',
          500: '#989284',
          600: '#837C6B',
          700: '#6F6653',
          800: '#5A513A',
          900: '#463B22',
          1000: '#312509', // text
        },

        green: {
          100: '#E7EEED',
          200: '#D0DEDC',
          300: '#B9CECB',
          400: '#A2BDBA',
          500: '#8BADA8',
          600: '#759D97',
          700: '#618984',
          800: '#51726E',
          900: '#415C58',
          1000: '#314542',
        },

        orange: {
          100: '#F4E4CE',
          200: '#ECD0A9',
          300: '#E4BB84',
          400: '#DBA760',
          500: '#D3933B',
          600: '#B87C29',
          700: '#936321',
          800: '#6E4A19',
          900: '#4A3110',
          1000: '#251908',
        },

        red: {
          100: '#FDE1D7',
          200: '#FBC5B2',
          300: '#F9A98D',
          400: '#F78D68',
          500: '#F67242',
          600: '#F4561D',
          700: '#DF430B',
          800: '#BA3809',
          900: '#952D07',
          1000: '#6F2106',
        },

        blue: {
          100: '#E4EDF5',
          200: '#C1D6E8',
          300: '#9FBFDB',
          400: '#7CA8CF',
          500: '#5A91C2',
          600: '#4079AD',
          700: '#33618A',
          800: '#264968',
          900: '#1A3145',
          1000: '#0D1823',
        },
      },
      boxShadow: {
        dialog: '4px 5px 0px rgba(0, 0, 0, 0.18)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
