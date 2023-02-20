/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui : {
    themes:["light"],
    styled:true
  },
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
