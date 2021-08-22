const isExample = process.env.VUE_APP_TITLE == "example";

module.exports = {
  pages: {
    index: "./src/pages/index/main.js",
  },
  outputDir: isExample ? "./example" : "./dist",
  configureWebpack: {
    output: {
      libraryExport: "default",
    },
  },
};
