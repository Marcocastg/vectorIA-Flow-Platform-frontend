/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Habilita el modo oscuro basado en una clase en el <html>
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5b13ec',
        'background-light': '#f6f6f8',
        'background-dark': '#161022',
      },
      fontFamily: {
        display: ['Work Sans', 'sans-serif'], // Asegúrate de tener un fallback
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

