import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./axios.config.js";
import "./monaco-editor-config.js";

import App from "./App";

function BrowserRouterApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<BrowserRouterApp />);
