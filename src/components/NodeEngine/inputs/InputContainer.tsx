import React, { memo, useContext } from "react";
import { Handle, OnConnectFunc, Position } from "react-flow-renderer";
import { GlobalContext } from "../helpers/GlobalNodeState";
import { Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const InputContainer: React.FC<
  React.PropsWithChildren<{
    hasHandle?: boolean;
    index: number;
    id: string;
    label?: string;
    onConnect?: OnConnectFunc
  }>
> = ({ children, hasHandle, index, id, label, onConnect }) => {
  const { isValidConnection } = useContext(GlobalContext);

  let contents = children;
  if (hasHandle) {
    const handleColor = "#171923";
    const borderColor = "#F7FAFC";
    const connectHandler: OnConnectFunc = (params) => {
      console.log("handle onConnect", params)
      onConnect(params)
    }

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
        <div style={{ position: "absolute", left: "-4px", width: 0 }}>
          <Handle
            className="input-handle"
            type="target"
            position={Position.Left}
            id={`${id}-${index}`}
            style={{
              width: "15px",
              height: "15px",
              borderWidth: "1px",
              borderColor,
              transition: "0.25s ease-in-out",
              background: handleColor,
            }}
            onConnect={connectHandler}
            isConnectable
            isValidConnection={isValidConnection}
          />
        </div>
      </Stack>
    );
  }

  return (
    <Box sx={{ p: 2, backgroundColor: grey[600], width: "100%" }}>
      <Typography
        sx={{
          textAlign: "center",
          p: 1,
          pt: -1,
          mt: -1,
          display: label ? "block" : "none",
        }}
      >
        {label}
      </Typography>
      {contents}
    </Box>
  );
};

export default memo(InputContainer);
