import { create, createStore, useStore } from 'zustand'
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges
} from 'reactflow'

import { createZustandContext } from './zustand'

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'quiz',
    data: {
      title: 'I want to learn about geography',
      summary: `General topics about Geography`
    },
    position: { x: 250, y: 25 }
  }
]
const initialEdges: Edge[] = []
type RFState = {
  selectedNodeId: string | null
  nodes: Node[]
  edges: Edge[]
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
  setSelectedNodeId: (id: string | null) => void
}

export const GraphStore = createZustandContext(() => {
  return createStore<RFState>((set, get) => ({
    selectedNodeId: null,
    nodes: initialNodes,
    edges: initialEdges,
    onNodesChange: (changes: NodeChange[]) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes)
      })
    },
    onEdgesChange: (changes: EdgeChange[]) => {
      set({
        edges: applyEdgeChanges(changes, get().edges)
      })
    },
    onConnect: (connection: Connection) => {
      set({
        edges: addEdge(connection, get().edges)
      })
    },

    setNodes: (nodes: Node[]) => {
      set({ nodes })
    },
    setEdges: (edges: Edge[]) => {
      set({ edges })
    },
    setSelectedNodeId: id =>
      set({
        selectedNodeId: id
      })
  }))
})

export const useGraphStore = <T>(selector: (state: RFState) => T) =>
  useStore(GraphStore.useContext(), selector)

export default useStore
