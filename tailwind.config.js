/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          primaryBlue: '#0348A5',
          lightBlue: '#1DADF8',
          darkGray: '#515151',
          lightGray: '#D9D9D9',
          backgroundLight: '#f0f0f0',
        },
        fontFamily: {
          'sans': ['Nunito', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
        },
        textShadow: {
          sm: '1px 1px 2px rgba(0, 0, 0, 0.5)',
          DEFAULT: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          lg: '3px 3px 6px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    plugins: [
      function ({ addUtilities }) {
        const newUtilities = {
          '.text-shadow-sm': {
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
          },
          '.text-shadow': {
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          },
          '.text-shadow-lg': {
            textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
          },
        };

        addUtilities(newUtilities, ['responsive', 'hover']);
      },
    ],
  }