const path = require("path");
module.exports = {
  dev: {
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    host: "127.0.0.1",
    devtool: "inline-cheap-source-map",
    cssSourceMap: true,
  },
  build: {
    assetsSubDirectory: "static",
    assetsPublicPath: path.resolve(__dirname, "../dist/"),
    devtool: "#source-map",
  },
};