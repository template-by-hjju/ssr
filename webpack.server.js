const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  mode: "development",
  target: "node",
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_moduels/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ],
  },
  externals: [nodeExternals()],
};
