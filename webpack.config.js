const path = require("path");

module.exports = {
  mode: "development", // 개발모드로 만듬
  target: "web", // 웹브라우저에서 돌릴거라서
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },

  module: {
    // rule에 맞춰 Js를 컴파일한다.
    rules: [
      {
        test: /.jsx?$/, // 대상파일에 대해서
        loader: "babel-loader", // 해당 로더를 사용한다.
        exclude: /node_moduels/, // 해당 파일은 제외한다.
        // 옵션에서는 넣을 옵션을 정해준다.
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ],
  },
};
