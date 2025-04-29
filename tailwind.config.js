/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warevision': {
          'black': '#1E2530',
          'gray': '#E8EBF1',
          'white': '#FFFFFF',
          'dark-blue': '#1A3B67',
          'lime': '#CAFF85',
          'blue': '#8EC0FF',
        }
      },
      fontFamily: {
        'cygre': ['Cygre', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
