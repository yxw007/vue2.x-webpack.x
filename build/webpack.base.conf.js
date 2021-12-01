const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const config = require("../config");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

function assetsPath(subPath) {
  const assetsSubDirectory = process.env.NODE_ENV === "production" ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, subPath);
}

module.exports = {
  entry: ["./src/main.js"],
  output: {
    filename: assetsPath("js/[name].js"),
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src"),
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
        include: [resolve("src"), resolve("node_modules/webpack-dev-server/client")],
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
        include: [resolve("src/icons")],
        options: { symbolId: "icon-[name]" },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        exclude: [resolve("src/icons")],
        options: {
          limit: 10000,
          name: assetsPath("img/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: assetsPath("media/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: assetsPath("fonts/[name].[hash:7].[ext]"),
            },
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
