module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      boxShadow: {
        md: "0 2px 4px 0 rgba(0, 0, 0, 0.07)",
      },
      colors: {
        shurqBlue: "#063e63",
        shurqBlue50: "#17547c",
        shurqBlue100: "#8AB4EA",
        shurqBlue200: "#0053BE",
        shurqGreen: "#00be0e",
        shurqWhite: "#fff",
        shurqLightBlue: "#6F90B1"
      },
    },
  },
  plugins: [],
};
