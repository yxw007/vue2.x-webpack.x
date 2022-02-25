const path = require("path");

function getExternalLibs(isMin) {
  let extension = isMin ? ".min.js" : ".js";
  let cssExtension = isMin ? ".min.css" : ".css";
  return {
    vue: {
      globalVariable: "Vue",
      url: `https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue${extension}`,
    },
    "vue-router": {
      globalVariable: "VueRouter",
      url: `https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router${extension}`,
    },
    vuex: {
      globalVariable: "Vuex",
      url: `https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex${extension}`,
    },
    "element-ui": {
      globalVariable: "Element",
      url: `https://unpkg.com/element-ui/lib/index.js`,
    },
    "element-ui/lib/theme-chalk/index.css": {
      isCSSModule: true,
      url: `https://unpkg.com/element-ui/lib/theme-chalk/index.css`,
    },
  };
}

module.exports = {
  dev: {
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    host: "127.0.0.1",
    devtool: "inline-cheap-source-map",
    cssSourceMap: true,
    externalLibs: getExternalLibs(false),
  },
  build: {
    assetsSubDirectory: "static",
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsPublicPath: "/",
    devtool: false,
    externalLibs: getExternalLibs(true),
  },
};
