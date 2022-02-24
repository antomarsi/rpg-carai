import React from "react";

import Stack from "@mui/material/Stack";
import GenericOutput from "../outputs/GenericOutput";
import NodeWrapper from "./NodeTypesCreator/NodeWrapper";
import NodeHeader from "./NodeTypesCreator/NodeHeader";
import UsableNode from "./NodeTypesCreator/UsableNode";
import GenericInput from "../inputs/GenericInput";

export const createRepresentativeInputs = (category: string, node: any) =>
  node.inputs.map((input: any, i: number) => (
    <GenericInput key={i} label={input.label} hasHandle={false} />
  ));

export const createRepresentativeOutputs = (category: string, node: any) =>
  node.outputs.map((output: any, i: number) => (
    <GenericOutput key={i} label={output.label} hasHandle={false} />
  ));

export const createRepresentativeNode = (category: string, node: any) => (
  <NodeWrapper>
    <Stack>
      <NodeHeader data={{ category, type: node.name }} width="240px" />
    </Stack>
  </NodeWrapper>
);

export const createNodeTypes = (data: any[]) => {
  const nodesList: Record<string, React.ReactNode> = {};
  if (data) {
    data.forEach(({ category, nodes }) => {
      nodes.forEach((node: any) => {
        nodesList[node.name] = UsableNode;
      });
    });
  }
  return nodesList;
};

export const createRepresentativeNodeTypes = (data: any[]) => {
  const nodesList: Record<string, React.ReactNode> = {};
  if (data) {
    data.forEach(({ category, nodes }) => {
      nodes.forEach((node: any) => {
        const newNode = () => createRepresentativeNode(category, node);
        nodesList[node.name] = newNode;
      });
    });
  }
  return nodesList;
};
