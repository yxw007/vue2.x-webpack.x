const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const HtmlDynamicInjectionPlugin = require("../plugins/html-dynamic-injection");

const baseWebpackConfig = require("./webpack.base.conf");
const config = require("../config");
const env = require("../config/env.dev");
const utils = require("./utils");



module.exports = merge(baseWebpackConfig, {
  mode: "development",
  output: {
    publicPath: "/",
  },
  devtool: config.dev.devtool,
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, "index.html") }],
    },
    client: {
      logging: "info",
      progress: true,
    },
    hot: true,
    host: config.dev.host,
    port: config.dev.port,
    allowedHosts: "all",
    open: false,
    proxy: {},
    static: [
      {
        directory: config.dev.assetsSubDirectory,
        publicPath: config.dev.assetsPublicPath,
        watch: true,
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                indentedSyntax: false,
              },
            },
          },
          {
            loader: "sass-resources-loader",
            options: {
              resources: [utils.resolve("src/style/variables.scss")],
              sourceMap: config.dev.cssSourceMap,
            },
          },
        ],
      },
      {
        test: /\.styl$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader", "stylus-loader"],
      },
    ],
  },
  stats: { children: false },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": env,
    }),
    new VueLoaderPlugin(),
    new SpriteLoaderPlugin({ plainSprite: false }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: utils.resolve(`public/index.html`),
      inject: true,
    }),
    new HtmlDynamicInjectionPlugin(config.dev.externalLibs),
  ],
});
