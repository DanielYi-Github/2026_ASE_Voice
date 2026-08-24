/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F5B841",
        secondary: "#E32626",
        dark: "#1A1A1A",
        light: "#F6E9D8",
      },
      fontFamily: {
        heading: ["Oswald", "Noto Sans TC", "sans-serif"],
        body: ["Inter", "Noto Sans TC", "sans-serif"],
      },
      boxShadow: {
        'brutal': '6px 6px 0px 0px rgba(26,26,26,1)',
        'brutal-lg': '10px 10px 0px 0px rgba(26,26,26,1)',
        'brutal-active': '2px 2px 0px 0px rgba(26,26,26,1)',
      }
    },
  },
  plugins: [],
}
