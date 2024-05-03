/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      width: {
        '6/13': '46.15384615384615%', 
      }
    },
  },
  plugins: [require("daisyui")],

  daisyui:{
    themes: ["light"]
  },
}

