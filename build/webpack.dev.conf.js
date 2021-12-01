const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseWebpackConfig = require("./webpack.base.conf");
const config = require("../config");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

function resolveResouce(name) {
  let fullpath = path.resolve(__dirname, "../src/style/" + name);
  return fullpath;
}

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
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: [resolveResouce("variables.scss")],
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
      "process.env": { NODE_ENV: "development" },
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: resolve(__dirname, `../public/index.html`),
      inject: true,
    }),
  ],
});
