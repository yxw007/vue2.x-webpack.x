const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseWebpackConfig = require("./webpack.base.conf");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const HtmlDynamicInjectionPlugin = require("../plugins/html-dynamic-injection");

const env = require("../config/env.prod");
const config = require("../config");
const utils = require("./utils");
const mode = process.argv.includes("mode=development") ? "development" : "production";
const isShowAnalyzer = process.argv.includes("--bundle-analyzer");

//说明：由于thread-loader当前引用的最新版本相关接口未与最新webpack版本接口兼容，所以暂时先关闭
//问题：https://github.com/webpack-contrib/thread-loader/issues/135
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
  ["cache-loader", "style-loader", "css-loader", "postcss-loader", "less-loader", "sass-loader", "sass-resources-loader"]
); */

let webpackConfig = merge(baseWebpackConfig, {
  mode,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash].js"),
    publicPath: config.build.assetsPublicPath,
  },
  devtool: config.build.devtool,
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    usedExports: true,
  },
  // sideEffects: ["*.css"],
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
          // "thread-loader",
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
    new CleanWebpackPlugin({
      output: {
        path: config.build.assetsRoot,
      },
    }),
    // new MiniCssExtractPlugin({
    //   filename: utils.assetsPath("css/[name].[hash].css"),
    //   ignoreOrder: true,
    // }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: utils.resolve(`public/index.html`),
    }),
    new HtmlDynamicInjectionPlugin(config.build.externalLibs),
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

/* 后置插件 */
const tailPlugins = [
  new VueLoaderPlugin(),

  new SpriteLoaderPlugin({ plainSprite: false }),
  new MiniCssExtractPlugin({
    filename: utils.assetsPath("css/[name].[contenthash].css"),
    ignoreOrder: true,
  }),
];

if (isShowAnalyzer) {
  //说明：smp包裹一层会导致HtmlWebpackPlugin.getHook重新创建hooks对象，导致auto-external-plugin注册的alterAssetTags事件丢失，以至于无法注入配置的CDN
  //所以将smp挪至仅用于npm run build:analyzer方式打包查看分析结果
  const wrapConfig = smp.wrap(webpackConfig);

  //说明：由于VueLoaderPlugin和MiniCssExtractPlugin与smp版本不兼容，报："You forgot to add 'mini-css-extract-plugin' plugin"，所以需要单独抽出来此处
  //参考文献：https://github.com/stephencookdev/speed-measure-webpack-plugin/issues/167
  wrapConfig.plugins.push(tailPlugins);
  wrapConfig.plugins.push(new BundleAnalyzerPlugin());

  webpackConfig = wrapConfig;
} else {
  webpackConfig.plugins.push(...tailPlugins);
}

module.exports = webpackConfig;
