import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./axios.config.js";
import "./monaco-editor-config.js";

import App from "./App";

function BrowserRouterApp() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  return (
    <BrowserRouter>
      <ThemeProvider theme={createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : "light",
        },
      })}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<BrowserRouterApp />);
