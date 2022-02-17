const path = require("path");
const config = require("../config");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

function assetsPath(subPath) {
  const assetsSubDirectory = process.env.NODE_ENV === "production" ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, subPath);
}

module.exports = {
  resolve,
  assetsPath,
};
