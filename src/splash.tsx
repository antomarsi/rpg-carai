import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ipcRenderer } from "electron";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import theme from "./theme";
import Lottie from "react-lottie";
import animationData from "./assets/lotties/sword_shield.json";
import { LinearProgress, Typography } from "@mui/material";

const Splash = () => {
  const [status, setStatus] = useState("Loading...");
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  // Register event listeners
  useEffect(() => {
    ipcRenderer.on("splash-finish", () => {
      setShowProgressBar(false);
      setStatus("Loading main application...");
    });

    ipcRenderer.on("progress", (event, percentage) => {
      setProgressPercentage(percentage);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Lottie
          isClickToPauseDisabled
          options={{
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={300}
          width={400}
        />
        <Typography variant="h6">{status}</Typography>
        {showProgressBar && (
          <LinearProgress variant="determinate" value={progressPercentage} />
        )}
      </Box>
    </ThemeProvider>
  );
};

ReactDOM.render(<Splash />, document.getElementById("root"));
