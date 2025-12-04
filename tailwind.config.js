/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)' },
          '50%': { transform: 'translateY(-5px) scaleY(1.1)' },
        },
      },
      animation: {
        wave: 'wave 10s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

