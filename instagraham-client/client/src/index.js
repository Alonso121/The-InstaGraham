import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ReducerProvider } from "./components/reducers/reducerContext";

ReactDOM.render(
  <ReducerProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReducerProvider>,
  document.getElementById("root")
);
