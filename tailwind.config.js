/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  // prefix: 'tw-',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mainFontColor': '#01010D'
      },
      screens: {
        xs: '320px'
      }
    },
      container: {
        center: true,
              padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [],
}

