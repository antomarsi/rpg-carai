import { Colors, Controls, PortConfig } from "flume";
import { PortType } from ".";

const portType = "number";

export type NumberType = typeof portType;

export const NumberPort: PortConfig<PortType> = {
  type: portType,
  name: "number",
  label: "Number",
  color: Colors.blue,
  acceptTypes: [portType],
  controls: [
    Controls.number({
      name: "number",
      label: "Number",
    }),
  ],
};
