import App from "./App";
import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { WalletProvider } from "xrpl-connect/context";
import "./index.css";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
  <BrowserRouter>
    <WalletProvider apiEndpoint={import.meta.env.VITE_BACKEND_API_ENDPOINT}>
      <App />
    </WalletProvider>
  </BrowserRouter>
);
