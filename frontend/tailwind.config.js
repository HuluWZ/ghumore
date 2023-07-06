/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        whitesmoke: "#e9e9e9",
        darkslateblue: {
          "100": "#2152b1",
          "200": "#2255a4",
        },
        darkslategray: {
          "100": "#4a4a4a",
          "200": "#2a2d32",
        },
        "ghumore-orange": "#ed5826",
        gray: {
          "100": "#212529",
          "200": "rgba(255, 255, 255, 0.9)",
          "300": "rgba(0, 0, 0, 0.9)",
        },
        "ghumore-yellowish": "#fda71a",
        black: {
          "100": "#112b3c",
          "200": "#000",
        },
        darkorange: "#ff8a00",
        "button-stroke": "#f8f9fa",
        gainsboro: {
          "100": "#dfe0e2",
          "200": "#dcdce6",
        },
        "grey-2": "#fafafa",
        sandybrown: {
          "100": "#ffb865",
          "200": "rgba(255, 184, 101, 0.06)",
        },
        midnightblue: "#100534",
        lightslategray: "#898798",
        goldenrod: "rgba(255, 189, 57, 0.12)",
        secondary: "#ffbd39",
        lightgray: "#cbcbcb",
      },
      fontFamily: {
        lato: "Lato",
        helvetica: "Helvetica",
        outfit: "Outfit",
        tajawal: "Tajawal",
        "segoe-ui": "'Segoe UI'",
        barlow: "Barlow",
        inherit: "inherit",
      },
      borderRadius: {
        "23xl": "42px",
        "19xl": "38px",
      },
    },
    fontSize: {
      base: "16px",
      lg: "18px",
      xl: "20px",
      "5xl": "24px",
      "21xl": "40px",
      mini: "15px",
      "13xl": "32px",
      sm: "14px",
      xs: "12px",
      smi: "13px",
    },
  },
  plugins: [],
}
