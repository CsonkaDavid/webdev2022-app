/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mainPageFood': "url('/src/assets/pexels-photo-326279.jpeg')"
      }
    },
  },
  plugins: [],
}
