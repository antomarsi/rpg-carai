import * as React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Main from "./pages";
import theme from "./lib/theme";
import { SnackbarProvider } from "notistack";
import { PlayerProvider } from "./hooks/PlayerState";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <PlayerProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Main />
        </PlayerProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App
