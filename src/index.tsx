import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyle from "./Styles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/authcontext/AuthContext";

const app: JSX.Element = (
  <AuthProvider>
    <BrowserRouter>
      <App />
      <GlobalStyle />
    </BrowserRouter>
  </AuthProvider>
);

ReactDOM.render(app, document.getElementById("root"));
