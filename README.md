## ssr template  
create-react-app을 이용하는게 아닌 react library를 다운받아 웹팩을 통해 직접 빌드하는 과정을 거칠 것 이다.  

1. 프로젝트를 시작할 폴더를 만들고 폴더 내부에서 package.json을 생성해준다.

```bash
# package.json 생성
yarn init -y
```

2. React, webpack, babel, babel-loader를 설치해준다.
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

3. 앱을 빌드하기 위해 package.json에 아래 scripts를 추가해준다.
```bash
# 앱 빌드를 위한 package.json 수정
"scripts": {
    "build": "webpack"
},
```

4. src 폴더를 만들고 내부에 index.js와 App.js를 작성한다. 이때, App.js에 리액트 코드를 작성해준다.
```javascript
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
```bash
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
