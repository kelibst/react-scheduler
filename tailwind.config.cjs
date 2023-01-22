/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0C67A0",
        darkPrimary: "#00152F",
        secondary: "#3D92EC",
        tertiary: "#778FAB",
        lightGray: "#E0E9F7",
      },
    },
  },
  plugins: [],
};
