import { cn } from '@/lib/utils'
import React, { memo } from 'react'
import { Handle, Position } from 'reactflow'

const QuizNode = ({
  data,
  isConnectable,
  selected,
  ...rest
}: {
  data: {
    title: string
    summary: string
  }
  selected: boolean
  isConnectable: boolean
}) => {
  const { title, summary } = data
  return (
    <>
      <Handle
        id="a"
        type="target"
        position={Position.Left}
        onConnect={params => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div
        className={cn(
          'p-4 border rounded-md bg-background hover:bg-accent',
          selected && 'bg-accent'
        )}
      >
        {title}
      </div>
      {/* <input
        className="nodrag"
        type="color"
        onChange={data.onChange}
        defaultValue={data.color}
      /> */}
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </>
  )
}
export default memo(QuizNode)
