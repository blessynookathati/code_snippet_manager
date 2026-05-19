import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SnippetProvider } from "./context/SnippetContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SnippetProvider>
        <App />
      </SnippetProvider>
    </BrowserRouter>
  </React.StrictMode>
);