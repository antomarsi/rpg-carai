import { NodeConfig } from "flume";
import { GetAttributeType, GetAttributeNode } from "./getAttribute";
import { PortType } from "../ports";
import { MultiplyNode, MultiplyType } from "./Multiply";
import { FinalAttributesNode, FinalAttributesType } from "./root/finalAttributes";
import { AttackTestNode, AttackTestType } from "./root/attackTest";

export type NodeType = GetAttributeType | MultiplyType | FinalAttributesType | AttackTestType

export const nodes: NodeConfig<NodeType, PortType>[] = [
  GetAttributeNode,
  MultiplyNode,
];

export const rootNodes : NodeConfig<NodeType, PortType>[] = [
  FinalAttributesNode,
  AttackTestNode
]