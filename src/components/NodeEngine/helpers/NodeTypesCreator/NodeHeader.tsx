import React, { memo } from "react";
import Box from "@mui/material/Box";
import getNodeAccentColors from "../getNodeAccentColors";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const NodeTypesCreator: React.FC<{ data: any; width?: string }> = ({
  data,
  width,
}) => {
  const { category, type } = data;
  return (
    <Box
      sx={{
        height: "auto",
        borderStyle: "solid",
        borderWidth: 0,
        borderBottomColor: getNodeAccentColors(category),
        borderBottomWidth: "4px",
      }}
    >
      <Stack direction="row">
        <Box sx={{ mx: "auto" }}>{category} icon</Box>
        <Box sx={{ mx: "auto" }}>
          <Typography sx={{ fontWeight: 700 }}>{type.toUpperCase()}</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default memo(NodeTypesCreator);
