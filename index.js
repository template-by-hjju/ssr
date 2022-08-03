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
