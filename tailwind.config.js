/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fade: { from: { opacity: '0' }, to: { opacity: '1' } },
      },
      animation: {
        fade: 'fade 150ms ease-out',
      },
    },
  },
  plugins: [],
}
