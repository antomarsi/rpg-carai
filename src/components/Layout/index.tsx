import Box from "@mui/material/Box";
import React from "react";

// import { Container } from './styles';

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
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
  );
};

export default Layout;

/**
 * PL - Page List
 * PC - Page Content
 */
