import * as React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./pages";
import theme from "./theme";
import { SnackbarProvider } from "notistack";

function render() {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
      </SnackbarProvider>
    </ThemeProvider>,
    document.getElementById("root")
  );
}

render();
