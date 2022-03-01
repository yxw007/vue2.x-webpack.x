const path = require("path");

function getExternalLibs(isMin) {
  let extension = isMin ? ".min.js" : ".js";
  let cssExtension = isMin ? ".min.css" : ".css";
  return {
    scripts: [
      {
        importName: "vue",
        globalVariableName: "Vue",
        position: "head",
        src: `https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue${extension}`,
        async: false,
      },
      {
        importName: "vue-router",
        globalVariableName: "VueRouter",
        position: "head",
        src: `https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router${extension}`,
        async: false,
      },
      {
        importName: "vuex",
        globalVariableName: "Vuex",
        position: "head",
        src: `https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex${extension}`,
        async: false,
      },
      {
        importName: "element-ui",
        globalVariableName: "Element",
        position: "body",
        src: `https://unpkg.com/element-ui@2.15.6/lib/index.js`,
        defer: "defer",
        async: true,
        importance: "low",
        crossorigin: null,
      },
    ],
    links: [
      /*  {
        importName: "element-ui/lib/theme-chalk/index.css",
        ref: "stylesheet",
        href: `https://unpkg.com/element-ui@2.15.6/lib/theme-chalk/index.css`,
        crossorigin: null,
      }, */
      {
        rel: "dns-prefetch",
        href: "https://unpkg.com",
        crossorigin: null,
      },
      {
        rel: "dns-prefetch",
        href: "https://cdn.jsdelivr.net",
        crossorigin: null,
      },
    ],
  };
}

module.exports = {
  dev: {
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    host: "127.0.0.1",
    devtool: "source-map",
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
