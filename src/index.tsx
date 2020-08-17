import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyle from "./Styles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";

const app: JSX.Element = (
  <BrowserRouter>
    <App />
    <GlobalStyle />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));
