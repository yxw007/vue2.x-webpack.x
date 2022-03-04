const webpack = require("webpack");
const utils = require("./utils");

module.exports = {
  entry: utils.resolve("src/main.js"),
  output: {
    filename: utils.assetsPath("js/[name].js"),
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    aliasFields: ["browser"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": utils.resolve("src"),
    },
  },
  resolveLoader: {
    modules: [utils.resolve("node_modules")],
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: "vue-loader",
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        include: [utils.resolve("src"), utils.resolve("node_modules/webpack-dev-server/client")],
        use: [
          {
            loader: "babel-loader?cacheDirectory=true",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: { version: 3 },
                    targets: {
                      browsers: ["> 1%", "last 2 versions", "ie >= 11"],
                    },
                    modules: false,
                  },
                ],
              ],
              sourceType: "unambiguous",
              ignore: [/[/\\]core-js/, /@babel[/\\]runtime/],
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    corejs: false,
                    helpers: true,
                    regenerator: false,
                  },
                ],
                /* [
                  "component",
                  {
                    libraryName: "element-ui",
                    styleLibraryName: "theme-chalk",
                  },
                ], */
                "babel-plugin-syntax-dynamic-import",
              ],
            },
          },
        ],
      },
      {
        test: /.html$/i,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /.svg$/,
        include: [utils.resolve("src/assets/font")],
        loader: "svg-sprite-loader",
        generator: {
          filename: utils.assetsPath("fonts/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: utils.assetsPath("img/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: utils.assetsPath("media/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: utils.assetsPath("fonts/[name].[hash:7].[ext]"),
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
  ],
};
