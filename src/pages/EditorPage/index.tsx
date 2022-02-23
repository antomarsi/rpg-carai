import Box from "@mui/material/Box";
import React from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import { GlobalProvider } from "../../components/NodeEngine/helpers/GlobalNodeState";

// import { Container } from './styles';

const nodeTypes = {
  //  selectorNode: ColorSelectorNode,
};

const EditorPage: React.FC = () => {
  return (
    <ReactFlowProvider>
      <GlobalProvider nodeTypes={nodeTypes}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
          }}
        >
          This is the editor page:
        </Box>
      </GlobalProvider>
    </ReactFlowProvider>
  );
};

export default EditorPage;
