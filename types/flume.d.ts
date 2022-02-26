declare module "flume" {
  export namespace Colors {
    const yellow: string;
    const orange: string;
    const red: string;
    const pink: string;
    const purple: string;
    const blue: string;
    const green: string;
    const grey: string;
  }

  type ControlType =
    | "text"
    | "number"
    | "checkbox"
    | "select"
    | "multiselect"
    | "custom";

  type ControlSetValueFn<V> = (newData: V, oldData: V) => V;

  type CustomControlRenderFn<V> = <C = Object, I = Object>(
    data: V,
    onChange: (data: V) => void,
    context: C,
    redraw: () => void, // TODO: type
    portProps: PortProps<V>,
    inputData: I
  ) => JSX.Element;

  export interface SelectControlOption {
    value: string;
    label?: string;
    description?: string;
  }

  interface Control<V> {
    type: ControlType;
    label: string;
    name: string;
    setValue?: ControlSetValueFn<V>;
  }

  interface TextControl extends Control {
    type: "text";
    placeholder?: string; // FixMe doesnt work for now
    defaultValue: string;
  }

  interface NumberControl extends Control {
    type: "number";
    defaultValue: number;
    step?: number;
  }

  interface CheckboxControl extends Control {
    type: "checkbox";
    defaultValue: boolean;
  }

  interface SelectControl extends Control {
    type: "select";
    getOptions?: () => void; // TODO: type
    placeholder?: string;
    options: SelectControlOption[];
    defaultValue: string;
  }

  interface MultiSelectControl extends Control {
    type: "multiselect";
    getOptions?: () => void; // TODO: type
    placeholder?: string;
    options: SelectControlOption[];
    defaultValue: string[];
  }

  interface CustomControl<V> extends Control {
    type: "custom";
    defaultValue: V;
    render: CustomControlRenderFn<V>;
  }

  export interface ControlConfig<V> {
    name: string;
    label: string;
    setValue?: ControlSetValueFn<V>;
  }

  export interface TextControlConfig extends ControlConfig<string> {
    placeholder?: string; // FixMe doesnt work for now
    defaultValue?: string;
  }

  export interface NumberControlConfig extends ControlConfig<number> {
    step?: number;
    defaultValue?: number;
  }

  export interface CheckboxControlConfig extends ControlConfig<boolean> {
    defaultValue?: boolean;
  }

  export interface SelectControlConfig extends ControlConfig<string> {
    options: SelectControlOption[];
    defaultValue?: string;
  }

  export interface MultiSelectControlConfig extends ControlConfig<string[]> {
    options: SelectControlOption[];
    defaultValue?: string[];
  }

  export interface CustomControlConfig<V> extends ControlConfig<V> {
    render: CustomControlRenderFn<V>;
  }

  export namespace Controls {
    function text(config: TextControlConfig): TextControl;
    function select(config: SelectControlConfig): SelectControl;
    function number(config: NumberControlConfig): NumberControl;
    function checkbox(config: CheckboxControlConfig): CheckboxControl;
    function multiselect(config: MultiSelectControlConfig): MultiSelectControl;
    function custom<V>(config: CustomControlConfig<V>): CustomControl;
  }

  interface PortProps<V> {
    label: string;
    inputLabel: string;
    name: string;
    portName: string;
    defaultValue: V;
    inputData: V;
  }

  interface PortConfig<P> {
    type: P;
    name: string;
    label: string;
    color?: string;
    acceptTypes?: P[];
    hidePort?: boolean;
    controls?: Control[];
  }

  interface Port {
    // ForInternalUse
  }

  type GetPortsFn<P> = (
    ports: Record<P, (port?: Partial<PortConfig<P>>) => Port>
  ) => Port;

  export interface NodeConfig<N, P> {
    type: N;
    label: string;
    description?: string;
    initialWidth?: number;
    sortIndex?: number;
    addable?: boolean;
    deletable?: boolean;
    root?: boolean;
    inputs?: GetPortsFn<P>;
    noControls?: boolean;
    outputs?: GetPortsFn<P>;
  }

  export interface FlumePlainConfig<P, N> {
    nodeTypes: Record<N, NodeConfig>;
    portTypes: Record<P, PortConfig>;
  }

  export class FlumeConfig<P = keyof {}, N = keyof {}>
    implements FlumePlainConfig<P, N>
  {
    constructor(config?: FlumePlainConfig<P, N>);
    nodeTypes: Record<N, NodeConfig<N, P>>;
    portTypes: Record<P, PortConfig<P>>;
    addRootNodeType(config: NodeConfig<N, P>): this;
    addNodeType(config: NodeConfig<N, P>): this;
    removeNodeType(type: N): this;
    addPortType(config: PortConfig<P>): this;
    removePortType(
      type: P,
      { skipDynamicNodesCheck }?: { skipDynamicNodesCheck?: boolean }
    ): this;
  }

  interface NodeEditorConfigProps {
    comments?: any;
    nodes?: any;
    nodeTypes?: Object;
    portTypes?: Object;
    defaultNodes?: any[];
    context?: Object;
    onChange?: any;
    onCommentsChange?: any;
    initialScale?: any;
    spaceToPan?: boolean;
    hideComments?: boolean;
    disableComments?: boolean;
    disableZoom?: boolean;
    disablePan?: boolean;
    circularBehavior?: any;
    debug?: any;
  }

  type resolvePortsFn<P> = (portType: P, data: Record<string, any>, context: Record<string, any>) => any;

  type resolveNodesFn<N, P> = (
    node: NodeConfig<N, P>,
    inputValues: Record<string, any>,
    noteType: N,
    context: Record<string, any>
  ) => object;

  export class RootEngine<N, P, C = keyof {}> {
    constructor(
      config?: FlumeConfig<P, N>,
      resolvePorts?: resolvePortsFn<P>,
      resolveNodes?: resolveNodesFn<N, P>
    )
    resolveRootNode: (nodes: N, context: C) => Record<string, any>
  }

  type useRootEngineFn<N = keyof {}, P = keyof {}, C = any> = (nodes: any, engine: RootEngine<N, P>, context: C) => Record<string, any>

  export const useRootEngine: useRootEngineFn

  export function NodeEditor(params: NodeEditorConfigProps): JSX.Element;
}