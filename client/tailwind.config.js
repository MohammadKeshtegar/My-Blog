/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    plugins: [require("flowbite/plugin")],
  },
};
