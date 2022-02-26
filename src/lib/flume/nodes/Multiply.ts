import { NodeConfig } from "flume";
import { NodeType } from ".";
import { PortType } from "../ports";

const nodeType = "multiply";

export type MultiplyType = typeof nodeType;

export const MultiplyNode: NodeConfig<NodeType, PortType> = {
  type: nodeType,
  label: "Multiply",
  description: "Multiply 2 numbers",
  inputs: (ports) => [
    ports.number({ name: "number1" }),
    ports.number({ name: "number2" }),
  ],
  outputs: (ports) => [ports.number()],
};
