import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import React from "react";
import ServerButton from './ServerButton';
import {RouteItem} from '../pages/routes'

const ServerList: React.FC<{items: RouteItem}> = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gridArea: "PL",
        flexDirection: "column",
        alignItems: "center",
        padding: "11px 0px",
        maxHeight: "100vh",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {items.map(item => {
        if (item.isHome) {
          return <React.Fragment key={item.path}>
            <ServerButton isHome />
      <Box
        sx={{
          minWidth: "32px",
          minHeight: "2px",
          background: grey[600],
          mb: "8px",
        }}
      />
          </React.Fragment>
        }
        return <ServerButton key={item.path}/>
      })}
    </Box>
  );
};

export default ServerList;
