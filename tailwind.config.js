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
        display: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem', // Actualizado
        lg: '1rem',      // Actualizado
        xl: '1.5rem',
        full: '9999px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

