/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",   // Pages Router
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",     // App Router
    "./src/**/*.{js,ts,jsx,tsx}",     // src/ directory
  ],
  theme: {
    extend: {
      colors: {
        telegramBlue: '#0088cc', // example Telegram color
      },
    },
  },
  plugins: [],
}
