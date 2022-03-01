/* 参数格式
{
  scripts: [
    {
      importName: "",
      globalVariableName: "",
      position: "head" | "body",
      src: "",
      integrity: null | "",
      async: false | true,
      defer: null | "defer",
      rel: null | "preload" | "prefetch",
      importance: "high" | "low" | "auto",
      crossorigin: null | "anonymous",
    },
  ],
  links: [
    {
      importName: null | "",
      href: "",
      ref: null | "stylesheet" | "dns-prefetch",
      crossorigin: null | "anonymous",
    },
  ],
}; */

const { ExternalModule } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

class HtmlDynamicInjectionPlugin {
  constructor(options) {
    this.name = this.constructor.name;
    this.scripts = this.arrayConventObject(options.scripts ?? []);
    this.links = options.links ?? [];
    this.scriptKeys = Object.keys(this.scripts);
    this.importScriptKeys = new Set();
  }

  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap(this.name, (normalModuleFactory) => {
      normalModuleFactory.hooks.parser.for("javascript/auto").tap(this.name, (parser) => {
        parser.hooks.import.tap(this.name, (statement, source) => {
          this.collectImport(source);
        });

        parser.hooks.call.for("require").tap(this.name, (callExpression) => {
          let source = callExpression.arguments[0].value;
          this.collectImport(source);
        });
      });

      normalModuleFactory.hooks.factorize.tapAsync(this.name, (resolveData, callback) => {
        let { request } = resolveData;
        if (this.importScriptKeys.has(request)) {
          let { globalVariableName } = this.scripts[request];
          callback(null, new ExternalModule(globalVariableName));
        } else {
          callback(null);
        }
      });
    });

    compiler.hooks.compilation.tap(this.name, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(this.name, (htmlData, callback) => {
        let linkTags = [];
        this.links.forEach((item) => {
          let { importName, ...fields } = item;
          let tag = this.generateLinkTag(fields);
          if (tag) {
            tag.attributes = this.filterInvalidFields(tag.attributes);
            linkTags.push(tag);
          }
        });

        let scriptHeadTags = [];
        let scriptBodyTags = [];
        this.importScriptKeys.forEach((key) => {
          if (this.scriptKeys.includes(key)) {
            let { globalVariableName, ...fields } = this.scripts[key];
            let tag = this.generateScriptTag(fields);
            if (tag) {
              tag.attributes = this.filterInvalidFields(tag.attributes);
              let { position } = tag.attributes;
              if (position === "head") {
                scriptHeadTags.push(tag);
              } else {
                scriptBodyTags.push(tag);
              }
            }
          }
        });
        htmlData.headTags = [...linkTags, ...scriptHeadTags, ...htmlData.headTags];
        htmlData.bodyTags = [...scriptBodyTags, ...htmlData.bodyTags];
        callback(null, htmlData);
      });
    });
  }

  arrayConventObject(arr) {
    let obj = {};
    if (!arr || !Array.isArray(arr)) {
      return obj;
    }

    arr.forEach((item) => {
      let { importName, ...fields } = item;
      obj[importName] = fields;
    });
    return obj;
  }

  generateLinkTag(fields) {
    if (!fields) {
      return;
    }

    return {
      tagName: "link",
      voidTag: true,
      meta: { plugin: "html-webpack-plugin" },
      attributes: Object.assign(
        {
          crossorigin: "anonymous",
        },
        fields
      ),
    };
  }

  generateScriptTag(fields) {
    if (!fields) {
      return;
    }

    return {
      tagName: "script",
      voidTag: false,
      meta: { plugin: "html-webpack-plugin" },
      attributes: Object.assign({ crossorigin: "anonymous" }, fields),
    };
  }

  filterInvalidFields(options) {
    if (!options) {
      return options;
    }
    let result = {};
    Object.keys(options).forEach((key) => {
      if (options[key] !== undefined && options[key] !== null && options[key] !== "") {
        result[key] = options[key];
      }
    });
    return result;
  }

  collectImport(source) {
    if (this.scriptKeys.includes(source)) {
      this.importScriptKeys.add(source);
    }
  }
}

module.exports = HtmlDynamicInjectionPlugin;
