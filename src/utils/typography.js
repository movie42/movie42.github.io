import Typography from "typography";

const typography = new Typography({
  baseFontSize: "10px",
  baseLineHeight: 1.666,
  googleFonts: [
    {
      name: "JetBrains Mono",
      styles: [200],
    },
  ],
  headerFontFamily: ["SUIT Variable", "sans-serif"],
  bodyFontFamily: ["SUIT Variable", "sans-serif"],
});

export default typography;
