/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "tertiary-fixed": "#f0e0ca",
        "tertiary-container": "#181105",
        "inverse-on-surface": "#313030",
        "secondary-fixed": "#ffdad6",
        "inverse-surface": "#e5e2e1",
        "on-background": "#e5e2e1",
        "on-error": "#690005",
        surface: "#131313",
        "on-tertiary": "#382f20",
        "outline-variant": "#444748",
        "surface-bright": "#3a3939",
        "secondary-container": "#802d27",
        "on-error-container": "#ffdad6",
        "secondary-fixed-dim": "#ffb4ab",
        "surface-container": "#201f1f",
        "on-primary": "#412d00",
        background: "#131313",
        error: "#ffb4ab",
        outline: "#8e9192",
        "tertiary-fixed-dim": "#d3c5af",
        "primary-container": "#1a1000",
        secondary: "#ffb4ab",
        "on-tertiary-fixed-variant": "#4f4535",
        "on-secondary-fixed-variant": "#7d2b25",
        "on-primary-container": "#997836",
        "on-surface": "#e5e2e1",
        "on-tertiary-container": "#887c69",
        "surface-dim": "#131313",
        "surface-container-low": "#1c1b1b",
        "on-primary-fixed": "#261900",
        "surface-variant": "#353534",
        "on-tertiary-fixed": "#221b0d",
        "primary-fixed": "#ffdea5",
        "on-secondary-container": "#ff9f94",
        "error-container": "#93000a",
        "inverse-primary": "#775a19",
        "surface-container-highest": "#353534",
        "on-secondary-fixed": "#410002",
        "surface-container-lowest": "#0e0e0e",
        "primary-fixed-dim": "#e9c176",
        "on-surface-variant": "#c4c7c7",
        "on-secondary": "#5f1411",
        "surface-tint": "#e9c176",
        tertiary: "#d3c5af",
        "surface-container-high": "#2a2a2a",
        "on-primary-fixed-variant": "#5d4201",
        primary: "#e9c176"
      },
      borderRadius: {
        DEFAULT: "0px",
        lg: "0px",
        xl: "0px",
        full: "9999px"
      },
      fontFamily: {
        headline: ["Newsreader"],
        body: ["Inter"],
        label: ["Inter"]
      }
    }
  },
  plugins: []
};
