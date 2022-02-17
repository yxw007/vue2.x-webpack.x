const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

/* const threadLoader = require("thread-loader");
threadLoader.warmup(
  {
    // workers: 4,
    workerParallelJobs: 50,
    workerNodeArgs: ["--max-old-space-size=1024"],
    poolRespawn: false,
    poolTimeout: 2000,
    poolParallelJobs: 50,
    name: "customer-pool",
  },
  ["cache-loader", "vue-style-loader", "css-loader", "sass-loader"]
); */

const resolve = (dir) => path.join(__dirname, dir);
const outputDir = resolve("../dist/build");

const wrapConfig = smp.wrap({
  mode: "production",
  entry: path.resolve(__dirname, "../src/main.js"),
  output: {
    path: path.resolve(__dirname, "../dist/build"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[id].[chunkhash].js",
  },
  devtool: false,
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", /* "thread-loader",  */ "sass-loader"],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: resolve("../public/index.html"),
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "../build/sourcemaps/[name].[contenthash].js.map",
      exclude: ["vendor.js"],
    }),
  ],
});

wrapConfig.plugins.push(
  new VueLoaderPlugin(),
  new MiniCssExtractPlugin({
    filename: "../build/css/[name].[contenthash].css",
    ignoreOrder: true,
  })
);

module.exports = wrapConfig;
