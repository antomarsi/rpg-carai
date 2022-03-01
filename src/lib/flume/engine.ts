import { resolveNodesFn, resolvePortsFn, RootEngine } from 'flume'
import config from './config'
import { NodeType } from './nodes'
import { PortType } from './ports'

const resolvePorts: resolvePortsFn<PortType> = (portType, data, context) => {
  console.log("Resolve port", portType, data)
  switch (portType) {
    case 'baseAttribute':
      return context.character[data.base_attribute] || 0
    case 'number':
      return data.number
    default:
      return data
  }
}

const resolveNodes: resolveNodesFn<NodeType, PortType> = (node, inputValues, nodeType, context) => {
  console.log("Resolving node", node.type)
  console.log(inputValues)
  switch (node.type) {
    case 'getAttribute':
      return { number: inputValues.base_attribute }
    case 'multiply':
      return { number: inputValues.number1 * inputValues.number2 }
    default:
      return inputValues
  }
}


const engine = new RootEngine<NodeType, PortType, any>(config, resolvePorts, resolveNodes)

export default engine