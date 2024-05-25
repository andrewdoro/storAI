'use client'
import React, { useEffect, useMemo } from 'react'
import ReactFlow, {
  Controls,
  Background,
  OnSelectionChangeFunc
} from 'reactflow'
import 'reactflow/dist/style.css'

import ColorSelectorNode from './_components/QuizNode'
import { StoryPanel } from '@/components/story-panel'
import { StreamableValue } from 'ai/rsc'
import { useGraphStore } from '@/lib/store'
import QuizNode from './_components/QuizNode'

const initBgColor = '#1A192B'

const connectionLineStyle = { stroke: '#fff' }
const snapGrid = [20, 20] as [number, number]
const nodeTypes = {
  selectorNode: ColorSelectorNode
}

type GroupedMessage = {
  id: string
  components: React.ReactNode[]
  isCollapsed?: StreamableValue<boolean> | undefined
}
const defaultViewport = { x: 0, y: 0, zoom: 1.5 }

const CustomNodeFlow = () => {
  const nodes = useGraphStore(state => state.nodes)
  const edges = useGraphStore(state => state.edges)
  const onNodesChange = useGraphStore(state => state.onNodesChange)
  const onEdgesChange = useGraphStore(state => state.onEdgesChange)
  const setSelectedNodeId = useGraphStore(state => state.setSelectedNodeId)

  const onChange: OnSelectionChangeFunc = params => {
    setSelectedNodeId(params.nodes[0]?.id)
  }

  const nodeTypes = useMemo(() => ({ quiz: QuizNode }), [])

  return (
    <div className="relative w-full flex flex-col gap-8 py-4 pb-12 col-span-4">
      <ReactFlow
        className="border-b"
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onSelectionChange={onChange}
        fitView
        nodeTypes={nodeTypes}
      >
        <Background />
        {/* <MiniMap
            nodeStrokeColor={n => {
              if (n.type === 'input') return '#0041d0'
              if (n.type === 'selectorNode') return bgColor
              if (n.type === 'output') return '#ff0072'
              return ''
            }}
            nodeColor={n => {
              if (n.type === 'selectorNode') return bgColor
              return '#fff'
            }}
          /> */}
        <Controls />
      </ReactFlow>
      <div className="mt-auto">
        <StoryPanel />
      </div>
    </div>
  )
}

export default CustomNodeFlow
