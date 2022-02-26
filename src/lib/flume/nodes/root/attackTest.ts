import { NodeConfig } from "flume";
import { NodeType } from "..";
import { PortType } from "../../ports";

const nodeType = "attackTest";

export type AttackTestType = typeof nodeType;

export const AttackTestNode: NodeConfig<NodeType, PortType> = {
  type: nodeType,
  label: "Attributos finais",
  description: "Set final Attributes",
  inputs: (ports) => [
    ports.number({ name: "quantity_attack", label: "Quantidade de ataque" }),
  ],
};
