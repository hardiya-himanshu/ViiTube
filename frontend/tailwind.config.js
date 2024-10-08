/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'gradient-blur': 'gradientBlur 4s ease infinite',
      },
      keyframes: {
        gradientBlur: {
          '0%, 100%': { filter: 'blur(20px)', backgroundPosition: '0% 50%' },
          '50%': { filter: 'blur(30px)', backgroundPosition: '100% 50%' },
        },
      },
      colors: {
        customLight: '#F2F2F2',
        customLight2: '#FFFFFF',
        customDark: '#1A1A1A',
        customDark2: '#333333',
        customBlack: 'black',
        customWhite: 'white'
      },
      visibility: ['group-hover', 'group-focus', 'responsive'],
    },
  },
  plugins: [],
}

