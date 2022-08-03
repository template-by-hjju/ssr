SSR template
============
create-react-app을 사용하지 않고 react library를 다운받아 웹팩을 통해 직접 빌드하는 과정을 거칠 것 이다.  
  
  
#### 1. 프로젝트를 시작할 폴더를 만들고 폴더 내부에서 package.json을 생성해준다.

```bash
# package.json 생성
yarn init -y
```

#### 2. React, webpack, babel, babel-loader를 설치해준다.
```bash
# React 설치 (for using React)
yarn add react react-dom

# webpack 설치 (for builing React library)
yarn add -D webpack webpack-cli

# babel 설치 (for compiling newest Js to plain Js)
yarn add -D @babel/core @babel/preset-env @babel/preset-react

# babel-loader 설치 (for linking babel-webpack)
yarn add -D babel-loader
```

#### 3. 앱을 빌드하기 위해 package.json에 아래 scripts를 추가해준다.
```bash
# 앱 빌드를 위한 package.json 수정
"scripts": {
    "build": "webpack"
},
```

#### 4. src 폴더를 만들고 내부에 index.js와 App.js를 작성한다. 이때, App.js에 리액트 코드를 작성해준다.
```javascript
// index.js
import React from "react";
import ReactDom from "react-dom/client";
import App from "./App.js";

ReactDom.hydrateRoot(document.getElementById("root"), <App />);
```
```javascript
// App.js
import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const increaseClick = () => setCount(count => count + 1);
  const decreaseClick = () => setCount(count => count - 1);

  return (
    <>
      <div>Count : {count}</div>

      <div>
        <button onClick={increaseClick}>Increase</button>
        <button onClick={decreaseClick}>Decrease</button>
      </div>
    </>
  );
}

export default App;
```

#### 5. jsx의 build를 위해 webpack.config.js를 작성한다.
```javascript
// webpack.config.js
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
        // 넣을 옵션을 정해준다.
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ],
  },
};

```

#### 6. jsx 파일을 빌드해준다.
```bash
# build jsx
yarn run build
```

#### 7. 생성된 bundle.js를 웹브라우저에 서빙하기 위해 웹서버를 다운로드 한다.
```bash
# 웹서버 다운로드
yarn add express webpack-node-externals
```

#### 8. root 경로에 서버를 위한 index.js를 만들어준다.
```javascript
// index.js
const express = require("express");
const ReactDomServer = require("react-dom/server");
const React = require("react");
const App = require("./src/App").default;

const app = express();

app.use(express.static("public"));

app.get("*", (req, res) => {
  // html은 성공적으로 뜨나 js동작을 하지않는다.
  const html = ReactDomServer.renderToString(<App />);
  // res.send(html);

  // js동작을 위해 추가한 코드
  const template = `
  <html>
  <head>
    <title>SSR React APP</title>
  </head>

  <body>
    <div id="root">${html}</div>
    <script src="bundle.js"></script>
  </body>
  </html>
  `;
  res.send(template);
});

app.listen(3000, () => {
  console.log("3000번 포트에서 서버 구동...");
});
```

#### 9. server 파일들을 build 하기위해 webpack.server.js를 만들어준다.
```javascript
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
```

#### 10. package.json의 script를 수정해준다.
```bash
# 앱 빌드를 위한 package.json 수정
  "scripts": {
    "build": "webpack", # for bundling front code
    "server": "node build/bundle.js", # start backend bundle
    "build:server": "webpack --config webpack.server.js" # for bundling back code
  },
  ```
