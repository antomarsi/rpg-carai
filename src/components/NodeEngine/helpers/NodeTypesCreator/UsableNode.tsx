import React, { memo } from "react";
import NodeWrapper from "./NodeWrapper";
import { Stack, Typography, Box } from "@mui/material";
import NodeHeader from "./NodeHeader";
import BottomArea from "./BottomArea";
import CreateUsableInputs from "./CreateUsableInputs";
import CreateUsableOutputs from "./CreateUsableOutputs";

const UsableNode: React.FC<{
  data: any;
  selected?: boolean;
}> = ({ data, selected }) => {
  return (
    <NodeWrapper data={data} selected={selected}>
      <Stack sx={{ minWidth: "240px" }}>
        <NodeHeader data={data} />

        {data.inputs.length && (
          <Box sx={{ mx: "auto" }}>
            <Typography>INPUTS</Typography>
          </Box>
        )}
        <CreateUsableInputs data={data} />
        {data.outputs.length && (
          <Box sx={{ mx: "auto" }}>
            <Typography>OUTPUTS</Typography>
          </Box>
        )}
        <CreateUsableOutputs data={data} />
        <BottomArea data={data} />
      </Stack>
    </NodeWrapper>
  );
};

export default memo(UsableNode);
