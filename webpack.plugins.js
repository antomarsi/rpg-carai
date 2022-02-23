const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

const plugins = [new ForkTsCheckerWebpackPlugin()];

if (isDevelopment) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = plugins;
