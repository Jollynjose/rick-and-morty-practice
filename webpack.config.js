const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./server.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      { test: /.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pages/home.html",
      filename: "home.html",
      excludeChunks: ["server"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/about.html",
      filename: "about.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/list.html",
      filename: "list.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/404.html",
      filename: "404.html",
    }),
    new ESLintPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
