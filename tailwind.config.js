// const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./source/**/*.html', './source/**/*.{js,jsx,ts,tsx}'],
  prefix: 'aw-',
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    // use pixel units to prevent relative size inheritance (caused by rem units)
    fontSize: {
      sm: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['18px', '28px'],
      xl: ['20px', '28px'],
      '2xl': ['24px', '32px'],
      '3xl': ['30px', '36px'],
      '4xl': ['36px', '40px'],
      '5xl': '48px',
      '6xl': '60px',
      '7xl': '72px',
    },
    spacing: {
      px: '1px',
      0: '0',
      0.5: '2px',
      1: '4px',
      1.5: '6px',
      2: '8px',
      2.5: '10px',
      3: '12px',
      3.5: '14px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      14: '56px',
      16: '64px',
      20: '80px',
      24: '96px',
      28: '112px',
      32: '128px',
      36: '144px',
      40: '160px',
      44: '176px',
      48: '192px',
      52: '208px',
      56: '224px',
      60: '240px',
      64: '256px',
      72: '288px',
      80: '320px',
      96: '384px',
    },
    extend: {
      lineHeight: {
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
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
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
