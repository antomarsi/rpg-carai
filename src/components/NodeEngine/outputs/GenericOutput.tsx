import React, { memo } from "react";
import OutputContainer from "./OutputContainer";
import { Typography } from "@mui/material";

const GenericOutput: React.FC<{
  label: string;
  data?: any;
  index?: number;
  hasHandle?: boolean;
}> = ({ label, data, index, hasHandle = true }) => {
  const { id } = data;
  return (
    <OutputContainer hasHandle={hasHandle} id={id} index={index}>
      <Typography
        sx={{
          textAlign: "right",
          width: "100%",
          marginInlineEnd: "0.5rem",
        }}
      >
        {label}
      </Typography>
    </OutputContainer>
  );
};

export default memo(GenericOutput);
