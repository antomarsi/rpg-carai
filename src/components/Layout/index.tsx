import { AppBar } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

// import { Container } from './styles';

const Layout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "71px auto",
          gridTemplateRows: "46px auto 52px",
          gridTemplateAreas: `"PL PC"
        "PL PC"
        "PL PC"`,
          height: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
