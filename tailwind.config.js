/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#26180F",
        "ink-2": "#5B4A3D",
        marigold: {
          DEFAULT: "#FFB627",
          dark: "#E6A317",
        },
        coral: {
          DEFAULT: "#FF5A36",
          dark: "#E24422",
        },
        paper: "#FBF3E6",
        "paper-2": "#F4E9D6",
        leaf: {
          DEFAULT: "#166A4C",
          light: "#DCEFE4",
        },
        line: "#E7D9C3",
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm2: "10px",
        md2: "18px",
        lg2: "28px",
      },
      boxShadow: {
        soft: "0 20px 45px -20px rgba(38,24,15,.28)",
        tight: "0 8px 20px -10px rgba(38,24,15,.3)",
      },
    },
  },
  plugins: [],
};
