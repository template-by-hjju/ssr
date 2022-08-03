import React from "react";
import ReactDom from "react-dom/client";
import App from "./App.js";

ReactDom.hydrateRoot(document.getElementById("root"), <App />);
