## ssr template
** create-react-app을 이용하는게 아닌 react library를 웹팩을 통해 직접 빌드하는 과정을 거칠 것.
--------------------------------------------------------------------------------------------------


```bash
# package.json 생성
yarn init -y

# React 설치 (for using React)
yarn add react react-dom

# 웹팩 설치 (for builing React library)
yarn add -D webpack webpack-cli

# babel 설치 (for compiling newest Js to plain Js)
yarn add -D @babel/core @babel/preset-env @babel/preset-react

# babel-loader 설치 (for linking babel-webpack)
yarn add -D babel-loader

# 앱 빌드를 위한 package.json 수정
"scripts": {
    "build": "webpack"
  },

# 리액트 코드 작성
# src 폴더 내부에 index.js와 App.js를 작성한다.

# webpack.config.js 작성

# 빌드
yarn run build

# 생성된 번들을 웹브라우저에 서빙해야함
# 서빙을 위해 웹서버 다운로드
yarn add express webpack-node-externals

# root 경로에 서버를 위한index.js를 만들어준다.
```
