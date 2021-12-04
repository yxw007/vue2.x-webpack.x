const VueLoaderPlugin = require("vue-loader/lib/plugin");
const utils = require("./utils");

module.exports = {
  entry: utils.resolve("src/main.js"),
  output: {
    filename: utils.assetsPath("js/[name].js"),
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": utils.resolve("src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [utils.resolve("src"), utils.resolve("node_modules/webpack-dev-server/client")],
        use: [
          {
            loader: "babel-loader?cacheDirectory=true",
            options: {
              plugins: ["babel-plugin-syntax-dynamic-import"],
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        include: [utils.resolve("src/icons")],
        options: { symbolId: "icon-[name]" },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        exclude: [utils.resolve("src/icons")],
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: utils.assetsPath("fonts/[name].[hash:7].[ext]"),
            },
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
