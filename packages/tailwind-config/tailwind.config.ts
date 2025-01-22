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
        "royal-blue": {
          "50": "#eeeeff",
          "100": "#e0e1ff",
          "200": "#c7c8fe",
          "300": "#a5a7fc",
          "400": "#8184f8",
          "500": "#6366f1",
          "600": "#4649e5",
          "700": "#383bca",
          "800": "#3032a3",
          "900": "#2e3081",
          "950": "#1b1c4b",
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
