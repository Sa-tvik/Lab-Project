/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode:"class",
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      colors: {
        leetcode: {
          dark: '#1a1a1a',
          darker: '#171717',
          border: '#2c2c2c',
          text: '#eff1f6',
          button: {
            primary: '#2cbb5d',
            hover: '#2da94c',
          },
        },
      },
    },
  },
  plugins: [],
};