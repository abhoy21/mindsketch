/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        amethyst: {
          "50": "#faf6fe",
          "100": "#f3e9fe",
          "200": "#e9d8fc",
          "300": "#d8b8fa",
          "400": "#c08bf5",
          "500": "#a85fed",
          "600": "#9d50e2",
          "700": "#7d2cc4",
          "800": "#6a29a0",
          "900": "#572281",
          "950": "#3a0d5e",
        },
        background: "#0a0a0a",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
