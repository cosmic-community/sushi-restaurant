/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf9ef',
          100: '#faf0d3',
          200: '#f4dfa5',
          300: '#edc86d',
          400: '#e6b040',
          500: '#d4952a',
          600: '#b87520',
          700: '#99571d',
          800: '#7d461f',
          900: '#673b1d',
        },
        ink: {
          50: '#f4f6f7',
          100: '#e3e7ea',
          200: '#c9d1d7',
          300: '#a3b0bb',
          400: '#758797',
          500: '#5a6d7c',
          600: '#4d5c69',
          700: '#434e59',
          800: '#3c444c',
          900: '#1a1f24',
          950: '#0d1114',
        },
        cream: {
          50: '#fefdf8',
          100: '#fcf9ed',
          200: '#f8f0d4',
          300: '#f2e3b3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}