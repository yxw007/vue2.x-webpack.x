module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
        targets: {
          browsers: ["> 1%", "last 2 versions", "ie >= 11"],
        },
        modules: false,
      },
    ],
  ],
  sourceType: "unambiguous",
  ignore: [/[\/\\]core-js/, /@babel[\/\\]runtime/],
  plugins: ["@babel/plugin-transform-runtime"],
};
