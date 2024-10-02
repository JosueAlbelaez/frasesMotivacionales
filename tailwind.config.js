/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a', // Azul oscuro
        secondary: '#f59e0b', // Ámbar que combina bien con el azul oscuro
      },
    },
  },
  plugins: [],
}