import React from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  Edge,
  Elements,
  MiniMap,
  OnConnectFunc,
  OnEdgeUpdateFunc,
  Position,
  ReactFlowProps,
  ReactFlowProvider,
  removeElements,
  updateEdge,
} from "react-flow-renderer";
import ColorSelectorNode from "./nodes/ColorSelectorNode";
import CustomEdge from './helpers/CustomEdge'

const nodeTypes = {
  selectorNode: ColorSelectorNode,
};

const edgeTypes = {
  main: CustomEdge,
};
const initialElements: Elements<any> = [
  {
    id: "1",
    type: "input",
    data: { label: "An input node" },
    position: { x: 0, y: 50 },
    sourcePosition: Position.Right,
  },
  {
    id: "2",
    type: "selectorNode",
    data: { onChange: () => {}, color: "#FFF" },
    style: { border: "1px solid #777", padding: 10 },
    position: { x: 300, y: 50 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output A" },
    position: { x: 650, y: 25 },
    targetPosition: Position.Left,
  },
  {
    id: "4",
    type: "output",
    data: { label: "Output B" },
    position: { x: 650, y: 100 },
    targetPosition: Position.Left,
  },

  {
    id: "e1-2",
    source: "1",
    target: "2",
    style: { stroke: "#fff" },
  },
  {
    id: "e2a-3",
    source: "2",
    target: "3",
    sourceHandle: "a",
    style: { stroke: "#fff" },
  },
  {
    id: "e2b-4",
    source: "2",
    target: "4",
    sourceHandle: "b",
    style: { stroke: "#fff" },
  },
];

const NodeEngine: React.FC = () => {
  const [elements, setElements] = React.useState(initialElements);

  const onEdgeUpdate: OnEdgeUpdateFunc = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));
  const onConnect = (params: Edge | Connection) =>
    setElements((els) => addEdge(params, els));

  const onElementsRemove = (elsRemove : Elements<any>) => {
    console.log("removing")
    setElements((els) => removeElements(elsRemove, els))
  }

  return (
    <ReactFlowProvider>
      <ReactFlow
        elements={elements}
        snapToGrid
        snapGrid={[16, 16]}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onElementsRemove={onElementsRemove}
        onEdgeUpdate={onEdgeUpdate}
        onConnect={onConnect}
      >
        <Background color={"#FFF000"} gap={16} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </ReactFlowProvider>
  );
};

export default NodeEngine;
