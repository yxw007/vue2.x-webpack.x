const { ExternalModule } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

class AutoExternalPlugin {
  constructor(options) {
    this.options = options;
    this.externalModules = [];
    this.externalCSSModules = [];
    Object.keys(this.options).forEach((key) => {
      let value = this.options[key];
      if (value.isCSSModule) {
        this.externalCSSModules.push(key);
      } else {
        this.externalModules.push(key);
      }
    });
    this.importedModules = new Set();
    this.importedCSSModules = new Set();
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
        let scripts = [];
        [...this.importedModules].forEach((key) => {
          let { url, integrity, position = "head", async = false } = this.options[key];
          if (position === "head") {
            let commonAttri = { src: url };
            if (async) {
              commonAttri["async"] = async;
            }
            scripts.push({
              tagName: "script",
              voidTag: false,
              meta: { plugin: "html-webpack-plugin" },
              attributes: !!integrity ? Object.assign({ integrity, crossorigin: "anonymous" }, commonAttri) : commonAttri,
            });
          }
        });
        htmlData.assetTags.scripts = [...scripts, ...htmlData.assetTags.scripts];

        let styles = [];
        [...this.externalCSSModules].forEach((key) => {
          styles.push({
            tagName: "link",
            voidTag: false,
            meta: { plugin: "html-webpack-plugin" },
            attributes: { rel: "stylesheet", href: this.options[key].url },
          });
        });
        htmlData.assetTags.styles = [...styles, ...htmlData.assetTags.styles];
        callback(null, htmlData);
      });

      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync("AutoExternalPlugin", (htmlData, callback) => {
        let scripts = [];
        [...this.importedModules].forEach((key) => {
          let { url, integrity, position, async = false } = this.options[key];
          if (position === "body") {
            let commonAttri = { src: url, defer: true };
            if (async) {
              commonAttri["async"] = async;
            }
            scripts.push({
              tagName: "script",
              voidTag: false,
              meta: { plugin: "html-webpack-plugin" },
              attributes: !!integrity ? Object.assign({ integrity, crossorigin: "anonymous" }, commonAttri) : commonAttri,
            });
          }
        });
        htmlData.bodyTags = [...scripts, ...htmlData.bodyTags];
        callback(null, htmlData);
      });
    });
  }
}

module.exports = AutoExternalPlugin;
