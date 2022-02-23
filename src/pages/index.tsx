import React from "react";
import Box from "@mui/material/Box";
import { ipcRenderer } from "electron";
import Layout from "../components/Layout";
import Routes from "./routes"

export default function App() {
  React.useEffect(() => {
    ipcRenderer.send("backend-ready");
  });

  return (
    <Box
      sx={{
        width: "100%"
      }}
    >
      <Layout>
        <Routes/>
      </Layout>
    </Box>
  );
}
