const path = require("path");

module.exports = {
  components: "src/components/**/*.tsx",
  exampleMode: "hide",
  require: [
    "babel-polyfill",
    path.join(__dirname, "src/styles/style.scss"),
    path.join(__dirname, "node_modules/slick-carousel/slick/slick.css"),
    path.join(__dirname, "node_modules/slick-carousel/slick/slick-theme.css")
  ],
  title: "fotoflash.studio",
  usageMode: "expand",
  showSidebar: false,
  skipComponentsWithoutExample: true
};
