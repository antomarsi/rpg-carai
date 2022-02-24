import React, { memo } from "react";
import InputContainer from "./InputContainer";
import { Typography } from "@mui/material";

const GenericInputs: React.FC<{
  label: string;
  data?: any;
  index?: number;
  hasHandle?: boolean;
}> = ({ label, data, index, hasHandle = true }) => {
  const { id } = data;
  return (
    <InputContainer hasHandle={hasHandle} id={id} index={index}>
      <Typography sx={{ width: "100%" }}>{label}</Typography>
    </InputContainer>
  );
};

export default memo(GenericInputs);
