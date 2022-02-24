import { ipcRenderer } from "electron";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Edge,
  Elements,
  getOutgoers,
  isEdge,
  isNode,
  Node,
  NodeTypesType,
  Connection,
  removeElements as rfRemoveElements,
  useZoomPanHelper,
  XYPosition,
  FlowElement,
} from "react-flow-renderer";
import { useHotkeys } from "react-hotkeys-hook";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "./hooks/useLocalStorage";
import useUndoHistory from "./hooks/useMultipleUndoHistory";
import useSessionStorage from "./hooks/useSessionStorage";
import { migrate } from "./migrations";

type CreateNodeFunc = (node: {
  type: string;
  position: XYPosition;
  data: any;
}) => void;

type ConnectionFunc = (connection: Connection) => void

export interface GlobalContextType {
  nodes: Node[];
  edges: Edge[];
  elements: Elements;
  createNode: CreateNodeFunc;
  createConnection: ConnectionFunc;
  convertToUsableFormat: () => Record<string, any>
  removeElements: (elements: Elements) => void
  reactFlowInstance: any;
  setReactFlowInstance: React.Dispatch<any>;
  updateRfi: () => void;
  isValidConnection: (connection: Connection) => boolean;
  useInputData: (id: string, index: number) => any[];
  useAnimateEdges: () => any[];
  removeNodeById: (id: string) => void;
  removeEdgeById: (id: string) => void;
  useNodeLock: (id: any) => any[];
  useNodeValidity: (id: string) => (string | boolean)[]
  duplicateNode: (id: string) => void
  clearNode: (id: string) => void
  // setSelectedElements,
  outlineInvalidNodes: (nodes: Node[]) => void;
  unOutlineInvalidNodes: (nodes: Node[]) => void;
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

const createUniqueId = () => uuidv4();

export const GlobalProvider: React.FC<
  React.PropsWithChildren<{ nodeTypes: NodeTypesType }>
> = ({ children, nodeTypes }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [reactFlowInstanceRfi, setRfi] = useSessionStorage("rfi", null);

  // cut/copy/paste
  // const [selectedElements, setSelectedElements] = useState([]);
  // const [copiedElements, setCopiedElements] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [undo, redo, push, current] = useUndoHistory(10);

  const { transform } = useZoomPanHelper();

  const dumpStateToJSON = async () => {
    const output = JSON.stringify({
      version: await ipcRenderer.invoke("get-app-version"),
      content: reactFlowInstanceRfi,
      timestamp: new Date(),
    });
    return output;
  };

  const setStateFromJSON = (savedData: any, loadPosition = false) => {
    if (savedData) {
      const nodeTypesArr = Object.keys(nodeTypes);
      const validNodes =
        savedData.elements.filter(
          (element: FlowElement) =>
            isNode(element) && nodeTypesArr.includes(element.type)
        ) || [];
      setEdges([]);
      setNodes(validNodes);
      setEdges(
        savedData.elements
          .filter(
            (element: FlowElement) =>
              isEdge(element) &&
              validNodes.some((el: FlowElement) => el.id === element.target) &&
              validNodes.some((el: FlowElement) => el.id === element.source)
          )
          .map((edge: Edge) => ({
            ...edge,
            animated: false,
          })) || []
      );
      if (loadPosition) {
        const [x = 0, y = 0] = savedData.position;
        transform({ x, y, zoom: savedData.zoom || 0 });
      }
    }
  };

  const clearState = () => {
    setEdges([]);
    setNodes([]);
    transform({ x: 0, y: 0, zoom: 0 });
  };

  useHotkeys("ctrl+z", undo, {}, [reactFlowInstanceRfi, nodes, edges]);
  useHotkeys("ctrl+r", redo, {}, [reactFlowInstanceRfi, nodes, edges]);
  useHotkeys("ctrl+shift+z", redo, {}, [reactFlowInstanceRfi, nodes, edges]);
  useHotkeys("ctrl+n", clearState, {}, []);

  // Push state to undo history
  // useEffect(() => {
  //   push(dumpStateToJSON());
  // }, [nodeData, nodeLocks, reactFlowInstanceRfi, nodes, edges]);

  const convertToUsableFormat = () => {
    const result: Record<string, any> = {};

    // Set up each node in the result
    nodes.forEach((element) => {
      const { type, id, data } = element;
      const { category } = data;
      // Node
      result[id] = {
        category,
        node: type,
        id,
        inputs: {},
        outputs: {},
      };
    });

    // Apply input data to inputs when applicable
    nodes.forEach((node) => {
      const inputData = node.data?.inputData;
      if (inputData) {
        Object.keys(inputData).forEach((index) => {
          result[node.id].inputs[index] = inputData[index];
        });
      }
    });

    // Apply inputs and outputs from connections
    // Note: As-is, this will overwrite inputted data from above
    edges.forEach((element) => {
      const {
        // eslint-disable-next-line no-unused-vars
        id,
        sourceHandle,
        targetHandle,
        source,
        target,
        type,
      } = element;
      // Connection
      console.log(sourceHandle, sourceHandle.split("-").slice(-1))
      result[source].outputs[sourceHandle.split("-").slice(-1)[0]] = {
        id: targetHandle,
      };
      result[target].inputs[targetHandle.split("-").slice(-1)[0]] = {
        id: sourceHandle,
      };
    });

    // Convert inputs and outputs to arrays
    Object.keys(result).forEach((id) => {
      result[id].inputs = Object.values(result[id].inputs);
      result[id].outputs = Object.values(result[id].outputs);
    });

    // console.log(JSON.stringify(result));

    return result;
  };

  const removeElements = (elements: Elements) => {
    const removedElements = rfRemoveElements(elements, [...nodes, ...edges]);
    setEdges(removedElements.filter((element) => isEdge(element)) as Edge[]);
    setNodes(removedElements.filter((element) => isNode(element)) as Node[]);
  };

  const removeNodeById = (id: string) => {
    const nodeToRemove = nodes.find((node) => node.id === id);
    const newElements = rfRemoveElements([nodeToRemove], [...nodes, ...edges]);
    setEdges(newElements.filter((element) => isEdge(element)) as Edge[]);
    setNodes(newElements.filter((element) => isNode(element)) as Node[]);
  };

  const removeEdgeById = (id: string) => {
    const edgeToRemove = edges.find((node) => node.id === id);
    const newElements = rfRemoveElements([edgeToRemove], [...edges]);
    setEdges(newElements.filter((element) => isEdge(element)) as Edge[]);
  };

  const getInputDefaults = (nodeData: any) => {
    const defaultData: Record<string, any> = {};
    if (nodeData.inputs) {
      nodeData.inputs.forEach((input: any, i: number) => {
        if (input.def || input.def === 0) {
          defaultData[i] = input.def;
        } else if (input.default || input.default === 0) {
          defaultData[i] = input.default;
        } else if (input.options) {
          defaultData[i] = input.options[0].value;
        }
      });
    }
    return defaultData;
  };

  const createNode: CreateNodeFunc = ({ type, position, data }) => {
    const id = createUniqueId();
    const newNode: Node = {
      type,
      id,
      position,
      data: { ...data, id, inputData: getInputDefaults(data) },
    };
    console.log(newNode)
    setNodes([...nodes, newNode]);
    return id;
  };

  const createConnection: ConnectionFunc = ({
    source,
    sourceHandle,
    target,
    targetHandle,
  }: Connection) => {
    const id = createUniqueId();
    const newEdge = {
      id,
      sourceHandle,
      targetHandle,
      source,
      target,
      type: "main",
      animated: false,
      style: { strokeWidth: 2 },
      data: {
        sourceType: nodes.find((n) => n.id === source)?.data.category,
      },
    };
    setEdges([
      ...edges.filter((edge) => edge.targetHandle !== targetHandle),
      newEdge,
    ]);
  };

  useEffect(() => {
    const flow = JSON.parse(sessionStorage.getItem("rfi"));
    if (flow) {
      const [x = 0, y = 0] = flow.position;
      setNodes(flow.elements.filter((element: any) => isNode(element)) || []);
      setEdges(flow.elements.filter((element: any) => isEdge(element)) || []);
      transform({ x, y, zoom: flow.zoom || 0 });
    }
  }, []);

  // Updates the saved reactFlowInstance object
  useEffect(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      setRfi(flow);
    }
  }, [nodes, edges]);

  // Update rfi when drag and drop on drag end
  const updateRfi = () => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      setRfi(flow);
    }
  };

  const isValidConnection = ({
    target,
    targetHandle,
    source,
    sourceHandle,
  }: Connection) => {
    if (source === target) {
      return false;
    }
    const [sourceHandleIndex] = sourceHandle.split("-").slice(-1);
    const [targetHandleIndex] = targetHandle.split("-").slice(-1);

    const sourceNode = nodes.find((node) => node.id === source);
    const targetNode = nodes.find((node) => node.id === target);

    const sourceOutput = sourceNode.data.outputs[sourceHandleIndex];
    const targetInput = targetNode.data.inputs[targetHandleIndex];

    const checkTargetChildren = (parentNode: Node): any => {
      const targetChildren = getOutgoers(parentNode, [...nodes, ...edges]);
      if (!targetChildren.length) {
        return false;
      }
      return targetChildren.some((childNode) => {
        if (childNode.id === sourceNode.id) {
          return true;
        }
        return checkTargetChildren(childNode);
      });
    };
    const isLoop = checkTargetChildren(targetNode);

    return sourceOutput.type === targetInput.type && !isLoop;
  };

  const useInputData = (id: string, index: number) => {
    const nodeById = nodes.find((node) => node.id === id) ?? { data: {} };
    const nodeData = nodeById?.data;

    if (!nodeData) {
      return [];
    }

    let inputData = nodeData?.inputData;
    if (!inputData) {
      inputData = getInputDefaults(nodeData);
    }

    const inputDataByIndex = inputData[index];
    const setInputData = (data: any) => {
      const nodeCopy = { ...nodeById };
      if (nodeCopy && nodeCopy.data) {
        nodeCopy.data.inputData = {
          ...inputData,
          [index]: data,
        };
      }
      const filteredNodes = nodes.filter((n) => n.id !== id) as Node[];
      setNodes([...filteredNodes, nodeCopy as Node]);
    };
    return [inputDataByIndex, setInputData];
  };

  const useAnimateEdges = () => {
    const animateEdges = () => {
      setEdges(
        edges.map((edge) => ({
          ...edge,
          animated: true,
        }))
      );
    };

    const unAnimateEdges = () => {
      setEdges(
        edges.map((edge) => ({
          ...edge,
          animated: false,
        }))
      );
    };

    const completeEdges = (finished: string[]) => {
      setEdges(
        edges.map((edge) => {
          const complete = finished.includes(edge.source);
          return {
            ...edge,
            animated: !complete,
            data: {
              ...edge.data,
              complete,
            },
          };
        })
      );
    };

    const clearCompleteEdges = () => {
      setEdges(
        edges.map((edge) => ({
          ...edge,
          animated: false,
          data: {
            ...edge.data,
            complete: false,
          },
        }))
      );
    };

    return [animateEdges, unAnimateEdges, completeEdges, clearCompleteEdges];
  };

  // TODO: performance concern? runs twice when deleting node
  const useNodeLock = useCallback(
    (id) => {
      // console.log('perf check (node lock)');
      const node = nodes.find((n) => n.id === id);
      if (!node) {
        return [];
      }
      const isLocked = node.data?.isLocked ?? false;
      const toggleLock = () => {
        node.draggable = isLocked;
        node.connectable = isLocked;
        node.data.isLocked = !isLocked;
        setNodes([...nodes.filter((n) => n.id !== id), node]);
      };
      return [isLocked, toggleLock];
    },
    [nodes]
  );

  const useNodeValidity = useCallback(
    (id: string) => {
      // console.log('perf check (node validity)');
      // This should never happen, but I'd rather not have this function crash if it does
      const node = nodes.find((n) => n.id === id);
      if (!node) {
        return [false, "Node not found."];
      }
      // This should also never happen.
      const { inputs } = node.data;
      if (!inputs) {
        return [false, "Node has no inputs."];
      }
      const inputData = node.data.inputData ?? {};
      const filteredEdges = edges.filter((e) => e.target === id);
      // Check to make sure the node has all the data it should based on the schema.
      // Compares the schema against the connections and the entered data
      const nonOptionalInputs = inputs.filter((input: any) => !input.optional);
      const emptyInputs = Object.entries(inputData)
        .filter(
          ([, value]) => value === "" || value === undefined || value === null
        )
        .map(([key]) => String(key));
      if (
        nonOptionalInputs.length >
          Object.keys(inputData).length + filteredEdges.length ||
        emptyInputs.length > 0
      ) {
        // Grabs all the indexes of the inputs that the connections are targeting
        const edgeTargetIndexes = edges
          .filter((edge) => edge.target === id)
          .map((edge) => edge.targetHandle.split("-").slice(-1)[0]);
        // Grab all inputs that do not have data or a connected edge
        const missingInputs = nonOptionalInputs.filter(
          (input: any, i: number) =>
            !Object.keys(inputData).includes(String(i)) &&
            !edgeTargetIndexes.includes(String(i))
        );
        // TODO: This fails to output the missing inputs when a node is connected to another
        return [
          false,
          `Missing required input data: ${missingInputs
            .map((input: any) => input.label)
            .join(", ")}`,
        ];
      }

      return [true];
    },
    [edges, nodes]
  ); // nodeData

  const duplicateNode = (id: string) => {
    // const rfiNodes = reactFlowInstance.getElements();
    const node = nodes.find((n) => n.id === id);
    const x = node.position.x + 200;
    const y = node.position.y + 200;
    createNode({
      type: node.type,
      position: { x, y },
      data: node.data,
    });
  };

  const clearNode = (id: string) => {
    const nodesCopy = [...nodes];
    const node = nodesCopy.find((n) => n.id === id);
    node.data.inputData = getInputDefaults(node.data);
    setNodes([...nodes.filter((n) => n.id !== id), node]);
  };

  const outlineInvalidNodes = (invalidNodes: Node[]) => {
    const invalidIds = invalidNodes.map((node) => node.id);
    const mappedNodes = invalidNodes.map((node) => {
      const nodeCopy = { ...node };
      nodeCopy.data.invalid = true;
      return nodeCopy;
    });
    setNodes([
      ...nodes.filter((node) => !invalidIds.includes(node.id)),
      ...mappedNodes,
    ]);
  };

  const unOutlineInvalidNodes = (invalidNodes: Node[]) => {
    const invalidIds = invalidNodes.map((node) => node.id);
    const mappedNodes = invalidNodes.map((node) => {
      const nodeCopy = { ...node };
      nodeCopy.data.invalid = false;
      return nodeCopy;
    });
    setNodes([
      ...nodes.filter((node) => !invalidIds.includes(node.id)),
      ...mappedNodes,
    ]);
  };

  const contextValue = useMemo(
    () => ({
      nodes: nodes,
      edges: edges,
      elements: [...nodes, ...edges],
      createNode,
      createConnection,
      convertToUsableFormat,
      removeElements,
      reactFlowInstance: reactFlowInstance,
      setReactFlowInstance,
      updateRfi,
      isValidConnection,
      useInputData,
      useAnimateEdges,
      removeNodeById,
      removeEdgeById,
      useNodeLock,
      useNodeValidity,
      duplicateNode,
      clearNode,
      // setSelectedElements,
      outlineInvalidNodes,
      unOutlineInvalidNodes,
    }),
    [nodes, edges, reactFlowInstance]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
