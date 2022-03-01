import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Main from "./pages";
import theme from "./lib/theme";
import { SnackbarProvider } from "notistack";
import { PlayerProvider } from "./hooks/PlayerState";
import { UserProvider } from "./lib/firebase/context";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <UserProvider>
          <PlayerProvider>
            <CssBaseline />
            <Main />
          </PlayerProvider>
        </UserProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
