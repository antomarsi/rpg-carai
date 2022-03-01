import { FlumeConfig } from "flume";
import { ports, PortType } from "./ports";
import { nodes, NodeType } from "./nodes";
import { rootNodes } from './nodes/index';

const config = new FlumeConfig<PortType, NodeType>();

ports.forEach((port) => config.addPortType(port))
nodes.forEach((node) => config.addNodeType(node));

rootNodes.forEach(rootNode => config.addRootNodeType(rootNode))

export default config;
