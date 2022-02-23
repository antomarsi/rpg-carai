import { Home } from "@mui/icons-material";
import Box from "@mui/material/Box";
import React from "react";
import { grey, blue, purple, red } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

export interface Props {
  isHome?: boolean;
  hasNotifications?: boolean;
  mentions?: number;
  icon: React.ReactNode;
  to: string;
}

const ServerButton: React.FC<Props> = ({
  isHome,
  hasNotifications,
  mentions,
  icon,
  to,
}) => {
  return (
    <Box
      component={NavLink}
      to={to}
      sx={{
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        width: "48px",
        height: "48px",
        mb: "8px",
        backgroundColor: isHome ? "primary.main" : grey[600],
        cursor: "pointer",
        position: "relative",
        borderRadius: isHome ? "16px" : "100%",
        "&.active": {
          borderRadius: "16px"
        },
        transition: "border-radius .2s , background-color .2s",
        "&:hover": {
          borderRadius: "16px",
          backgroundColor: isHome ? purple[600] : blue[400],
        },
        "&::before": {
          content: `""`,
          width: "9px",
          height: "9px",
          position: "absolute",
          left: "-17px",
          top: "calc(50% - 4.5px)",
          backgroundColor: "white",
          borderRadius: "50%",
          display: hasNotifications ? "inline" : "none",
        },
        "&::after": {
          content: `"${mentions && mentions}"`,
          backgroundColor: red[300],
          width: "24px",
          height: "24px",
          padding: "0 4px",
          position: "absolute",
          bottom: "-4px",
          right: "-4px",
          borderRadius: "50%",
          border: "4px solid rgb(32,34,37)",
          textAlign: "right",
          fontSize: "13px",
          fontWeight: "bold",
          color: "white",
          display: mentions && mentions > 0 ? "inline" : "none",
        },
      }}
    >
      {icon}
    </Box>
  );
};

export default ServerButton;
