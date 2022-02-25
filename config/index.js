const path = require("path");

function getExternalLibs(isMin) {
  let extension = isMin ? ".min.js" : ".js";
  let cssExtension = isMin ? ".min.css" : ".css";
  return {
    vue: {
      globalVariable: "Vue",
      url: `https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue${extension}`,
      // integrity: "sha256-kXTEJcRFN330VirZFl6gj9+UM6gIKW195fYZeR3xDhc=",
      async: false,
    },
    "vue-router": {
      globalVariable: "VueRouter",
      url: `https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router${extension}`,
      // integrity: "sha256-yEB9jUlD51i5kxJZlzgzfR6XmVKI76Nl1WRA1aqIilU=",
      async: false,
    },
    vuex: {
      globalVariable: "Vuex",
      url: `https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex${extension}`,
      // integrity: "sha256-1QlN0ckC4jlz91DZixPZxTv9vYpcBmS7sK7HA8xFmFA=",
      async: false,
    },
    "element-ui": {
      globalVariable: "Element",
      url: `https://unpkg.com/element-ui/lib/index.js`,
      position: "body",
      async: false,
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
