const { ExternalModule } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

class AutoExternalPlugin {
  constructor(options) {
    this.options = options;
    this.externalModules = Object.keys(this.options);
    this.importedModules = new Set();
  }
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap("AutoExternalPlugin", (normalModuleFactory) => {
      normalModuleFactory.hooks.parser.for("javascript/auto").tap("AutoExternalPlugin", (parser) => {
        parser.hooks.import.tap("AutoExternalPlugin", (statement, source) => {
          if (this.externalModules.includes(source)) {
            this.importedModules.add(source);
          }
        });

        parser.hooks.call.for("require").tap("AutoExternalPlugin", (callExpression) => {
          let source = callExpression.arguments[0].value;
          if (this.externalModules.includes(source)) {
            this.importedModules.add(source);
          }
        });
      });
      normalModuleFactory.hooks.factorize.tapAsync("AutoExternalPlugin", (resolveData, callback) => {
        let { request } = resolveData;
        if (this.importedModules.has(request)) {
          let { globalVariable } = this.options[request];
          callback(null, new ExternalModule(globalVariable));
        } else {
          callback(null);
        }
      });
    });
    compiler.hooks.compilation.tap("AutoExternalPlugin", (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync("AutoExternalPlugin", (htmlData, callback) => {
        [...this.importedModules].forEach((key) => {
          htmlData.assetTags.scripts.unshift({
            tagName: "script",
            voidTag: false,
            meta: { plugin: "html-webpack-plugin" },
            attributes: { src: this.options[key].url },
          });
        });
        callback(null, htmlData);
      });
    });
  }
}

module.exports = AutoExternalPlugin;
