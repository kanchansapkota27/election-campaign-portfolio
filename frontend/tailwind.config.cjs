/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        globalbg: "#F5F5F5",
        bodybg: "#F5F5F5",
        topbar: "#F5F5F5",
        topbarText: "#ffffff",
        topbarActive: "#fc5c65",
      },
      fontFamily:{
        'sans': ['Poppins', 'sans-serif'],
        'monteserrat': ['Montserrat', 'sans-serif'],
        'noto': ['Noto Sans', 'sans-serif'],
        'popins': ['Poppins', 'sans-serif'],
      },
      backgroundImage:{
        homeBg: "url('/src/assets/images/flag-nepal.jpg')",
      }
    },
  },
  plugins: [],
}
