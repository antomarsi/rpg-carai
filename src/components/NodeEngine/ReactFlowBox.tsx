import { Box } from "@mui/material";
import log from "electron-log";
import React, { createContext, useCallback, useContext } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  EdgeTypesType,
  Node,
  NodeTypesType,
  XYPosition,
} from "react-flow-renderer";
import { GlobalContext } from "./helpers/GlobalNodeState";

export const NodeDataContext = createContext({});

// eslint-disable-next-line react/prop-types
const ReactFlowBox: React.FC<
  {
    nodeTypes: NodeTypesType;
    edgeTypes: EdgeTypesType;
    wrapperRef: React.MutableRefObject<any>;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ wrapperRef, nodeTypes, edgeTypes, ...props }) => {
  const {
    elements,
    createNode,
    createConnection,
    reactFlowInstance,
    setReactFlowInstance,
    removeElements,
    updateRfi,
  } = useContext(GlobalContext);

  const onLoad = useCallback(
    (rfi) => {
      if (!reactFlowInstance) {
        setReactFlowInstance(rfi);
        console.log("flow loaded:", rfi);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event: React.DragEvent) => {
    log.info("dropped");
    event.preventDefault();

    const reactFlowBounds = wrapperRef.current.getBoundingClientRect();

    try {
      const type = event.dataTransfer.getData("application/reactflow/type");
      const inputs = JSON.parse(
        event.dataTransfer.getData("application/reactflow/inputs")
      );
      const outputs = JSON.parse(
        event.dataTransfer.getData("application/reactflow/outputs")
      );
      const category = event.dataTransfer.getData(
        "application/reactflow/category"
      );
      const offsetX = event.dataTransfer.getData(
        "application/reactflow/offsetX"
      );
      const offsetY = event.dataTransfer.getData(
        "application/reactflow/offsetY"
      );
      log.info(type, inputs, outputs, category);
      const position: XYPosition = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left - Number(offsetX),
        y: event.clientY - reactFlowBounds.top - Number(offsetY),
      });

      const nodeData = {
        category,
        type,
        inputs,
        outputs,
      };

      createNode({ type, position, data: nodeData });
    } catch (err) {
      console.log(
        "Oops! This probably means something was dragged here that should not have been.", err
      );
    }
  };

  const onNodeContextMenu = (event: React.MouseEvent, node: Node) => {
    console.log(event, node);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }} ref={wrapperRef} {...props}>
      <ReactFlow
        elements={elements}
        onConnect={createConnection}
        onElementsRemove={removeElements}
        onLoad={onLoad}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeDragStop={updateRfi}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeContextMenu={onNodeContextMenu}
        style={{ zIndex: 0 }}
        maxZoom={8}
        minZoom={0.125}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={0.5} />
        <Controls />
      </ReactFlow>
    </Box>
  );
};

export default ReactFlowBox;
