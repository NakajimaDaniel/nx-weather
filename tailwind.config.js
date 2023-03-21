/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple-500': '#7943CF',
        'custom-purple-450': '#9074E0',
        'custom-purple-400': '#9D99E4',
        
      },
      fontFamily: {
        sans: ['var(--font-noto)', ...fontFamily.sans],
      },

    },

  },
  screens: {
    'tablet': '640px',
    // => @media (min-width: 640px) { ... }

  },

  plugins: [],
}
