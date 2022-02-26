import { NodeConfig } from "flume";
import { NodeType } from "..";
import { PortType } from "../../ports";

const nodeType = "finalAttributes";

export type FinalAttributesType = typeof nodeType;

export const FinalAttributesNode: NodeConfig<NodeType, PortType> = {
  type: nodeType,
  label: "Attributos finais",
  description: "Set final Attributes",
  inputs: (ports) => [
    ports.number({ name: "final_force", label: "Força final" }),
    ports.number({ name: "final_wisdom", label: "Sabedoria Final" }),
  ],
};
