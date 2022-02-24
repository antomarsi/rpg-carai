import { Box, Stack } from "@mui/material";
import React from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  Edge,
  EdgeTypesType,
  Elements,
  MiniMap,
  OnConnectFunc,
  OnEdgeUpdateFunc,
  Position,
  ReactFlowProvider,
  updateEdge,
} from "react-flow-renderer";
import { GlobalProvider } from "./helpers/GlobalNodeState";
import { Split } from "@geoffcox/react-splitter";
import CustomEdge from "./helpers/CustomEdge";
import ReactFlowBox from "./ReactFlowBox";
import NodeSelector from "./NodeSelector";
import { useWindowSize } from '@react-hook/window-size';
import { createNodeTypes } from "./helpers/createNodeTypes";

const testData = [
  {
      "category": "Math",
      "nodes": [
          {
              "name": "Sum",
              "inputs": [
                  {
                      "type": "number::any",
                      "label": "Value 1",
                      "min": 0,
                      "def": 0
                  },
                  {
                      "type": "number::any",
                      "label": "Value 2",
                      "min": 0,
                      "def": 0
                  },
              ],
              "outputs": [
                  {
                      "type": "number::any",
                      "label": "Result"
                  }
              ],
              "description": "Sum 2 numbers"
          },
          {
              "name": "Multiply",
              "inputs": [
                {
                    "type": "number::any",
                    "label": "Value 1",
                    "min": 0,
                    "def": 0
                },
                {
                    "type": "number::any",
                    "label": "Value 2",
                    "min": 0,
                    "def": 0
                },
              ],
              "outputs": [
                  {
                      "type": "number::any",
                      "label": "Result"
                  }
              ],
              "description": "Multiply 2 numbers"
          }
      ]
  }
];

const edgeTypes : EdgeTypesType = {
  main: CustomEdge,
};

const NodeEngine: React.FC = () => {
  const reactFlowWrapper = React.useRef(null);
  const [nodeTypes, setNodeTypes] = React.useState(createNodeTypes(testData));
  const [width, height] = useWindowSize();

  return (
    <ReactFlowProvider>
      <GlobalProvider nodeTypes={nodeTypes}>
        <Stack
          direction="row"
          component={Split}
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
          }}
          initialPrimarySize="565px"
          minPrimarySize="290px"
          minSecondarySize="50%"
          splitterSize="10px"
          defaultSplitterColors={{
            color: "#71809633",
            hover: "#71809666",
            drag: "#718096EE",
          }}
        >
          <NodeSelector data={testData} height={height} />
          <ReactFlowBox
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            className="reactflow-wrapper"
            wrapperRef={reactFlowWrapper}
          />
        </Stack>
      </GlobalProvider>
    </ReactFlowProvider>
  );
};

export default NodeEngine;
