/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1752F0",
        background: "#d7e2fd",
      },
    },
    fontFamily: {
      sans: ["Poppins"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
