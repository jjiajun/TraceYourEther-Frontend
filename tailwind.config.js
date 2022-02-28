module.exports = {
  mode: "jit",
  content: ["/src/**/*.{js,jsx,ts,tsx}"],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#832CD1",
        secondary: "#FFC74B",
        background: "#F1EEF7",
      },
    },
  },
  plugins: [],
};
