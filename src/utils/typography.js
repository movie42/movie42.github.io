import Typography from "typography";

const typography = new Typography({
  baseFontSize: "10px",
  baseLineHeight: 1.666,
  googleFonts: [
    { name: "Noto Sans KR", styles: [100, 500, 900] },
    {
      name: "JetBrains Mono",
      styles: [200],
    },
  ],
  headerFontFamily: ["Noto Sans KR", "sans-serif"],
  bodyFontFamily: ["Noto Sans KR", "sans-serif"],
});

export default typography;
