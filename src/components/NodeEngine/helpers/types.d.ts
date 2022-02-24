

export interface NodeData {
    category: string
    type: string
    inputs: Record<string, any>[]
    outputs: Record<string, any>[]
    id: string
    inputData: Record<string, any>
    isLocked?: boolean
}