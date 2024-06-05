/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DC0C15",
        dark: "#1C1C1C",
        lightDark: "#212529",
        lightBlue: "#E9ECEF",
        font: "#333",
        lightGrey: "#eee",
      },
      spacing: {
        superMega: "12.6rem",
        mega: "9.2rem",
        primary: "7.4rem",
        secondary: "3.6rem",
      },
    },
    fontFamily: {
      name1: [""],
      name2: [""],
    },

    screens: {
      xs: "320px",
      ss: "420px",
      sm: "578px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1440px",
      xll: "1550px",
      xxll: "1750px",
    },
  },
  plugins: [],
};
