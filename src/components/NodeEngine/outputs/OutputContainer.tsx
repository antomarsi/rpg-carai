import React, { memo, useContext } from "react";
import { Handle, Position } from "react-flow-renderer";
import { GlobalContext } from "../helpers/GlobalNodeState";
import { Box, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";

const OutputContainer: React.FC<
  React.PropsWithChildren<{
    hasHandle: boolean;
    index: number;
    id: string;
  }>
> = ({ children, hasHandle, index, id }) => {
  const { isValidConnection } = useContext(GlobalContext);

  let contents = children;
  if (hasHandle) {
    const handleColor = "#171923";
    const borderColor = "#F7FAFC";
    contents = (
      <Stack
        sx={{
          height: "100%",
          ".react-flow__handle-connecting": {
            background: "#E53E3E !important",
            // cursor: 'not-allowed !important',
          },
          ".react-flow__handle-valid": {
            background: "#38A169 !important",
          },
        }}
      >
        {children}
        <div style={{ position: "absolute", right: "-4px", width: 0 }}>
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-${index}`}
            style={{
              width: "15px",
              height: "15px",
              borderWidth: "1px",
              borderColor,
              transition: "0.25s ease-in-out",
              background: handleColor,
            }}
            onConnect={(params) => console.log("handle onConnect", params)}
            isConnectable
            isValidConnection={isValidConnection}
          />
        </div>
      </Stack>
    );
  }

  return (
    <Box sx={{ p: 2, backgroundColor: grey[600], width: "100%" }}>
      {contents}
    </Box>
  );
};

export default memo(OutputContainer);
