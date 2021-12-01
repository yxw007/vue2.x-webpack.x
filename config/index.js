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
    assetsPublicPath: `/dist/`,
    devtool: "#source-map",
  },
};
