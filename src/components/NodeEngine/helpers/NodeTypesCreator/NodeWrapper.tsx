import React, { memo } from "react";
import getAccentColor from "../getNodeAccentColors";
import shadeColor from "../shadeColor";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

const NodeWrapper: React.FC<
  React.PropsWithChildren<{ data?: any; selected?: boolean }>
> = ({ children, data, selected }) => {
  const accentColor = getAccentColor(data?.category);

  const borderColor = selected ? shadeColor(accentColor, 0) : "inherit";

  return (
    <Box
      sx={{
        backgroundColor: grey[700],
        borderWidth: data?.invalid ? "2px" : "0.5px",
        borderColor,
        borderRadius: "10px",
        py: 1,
        boxShadow: 3,
        transition: "0.15s ease-in-out",
      }}
    >
      {children}
    </Box>
  );
};

export default memo(NodeWrapper);
