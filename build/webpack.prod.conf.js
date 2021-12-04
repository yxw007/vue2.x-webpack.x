const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseWebpackConfig = require("./webpack.base.conf");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const env = require("../config/env.prod");
const config = require("../config");
const utils = require("./utils");

module.exports = merge(baseWebpackConfig, {
  mode: "production",
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash].js"),
    publicPath: config.build.assetsPublicPath,
  },
  devtool: config.build.devtool,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: [utils.resolve("src/style/variables.scss")],
            },
          },
        ],
      },
      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "stylus-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": env,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath("css/[name].[hash].css"),
      ignoreOrder: true,
    }),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: config.htmlTempletePath,
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  externals: {
    exceljs: "ExcelJS",
  },
});
