import { Colors, Controls, PortConfig } from "flume";
import { PortType } from ".";

const portType = "baseAttribute";

export type BaseAttributeType = typeof portType;

export const BaseAttributePort: PortConfig<PortType> = {
  type: portType,
  name: "base_attribute",
  label: "Base Attribute",
  color: Colors.red,
  controls: [
    Controls.select({
      name: "base_attribute",
      label: "Base Attribute",
      options: [
        { value: "strength", label: "Força" },
        { value: "wisdom", label: "Sabedoria" },
      ],
    }),
  ],
};
