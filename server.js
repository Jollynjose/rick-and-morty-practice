require("dotenv").config();
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const app = express();
const webpackConfig = require("./webpack.config");
const compiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);
app.use(
  webpackHotMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  })
);

app.use((req, res, next) => {
  res.status(404).send("<h1>error 404 not found</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`server started on PORT: ${process.env.PORT}`);
});
