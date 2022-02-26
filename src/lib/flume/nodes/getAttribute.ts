import { NodeConfig } from "flume";
import { NodeType } from ".";
import { PortType } from "../ports";

const nodeType = "getAttribute"

export type GetAttributeType = typeof nodeType

export const GetAttributeNode : NodeConfig<NodeType, PortType> = {
  type:  nodeType,
  label: "Base Attribute",
  description: "Get the value of a base attribute",
  inputs: (ports) => [ports.baseAttribute({ label: "Attribute", hidePort: true })],
  outputs: (ports) => [ports.number()],
}