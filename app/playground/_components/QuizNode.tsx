import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import React, { memo } from 'react'
import { Handle, Position } from 'reactflow'
import QuizDialog from './QuizDialog'

const QuizNode = ({
  id,
  data,
  isConnectable,
  selected,
  ...rest
}: {
  id: string
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
        isConnectable={isConnectable}
      />
      <Card className={cn('border-primary', selected && 'bg-accent')}>
        <CardHeader className="p-4">
          <CardTitle className="text-xl">{title}</CardTitle>
          {summary && (
            <CardDescription className="max-w-sm text-lg line-clamp-2">
              {summary}
            </CardDescription>
          )}
        </CardHeader>

        {summary && <QuizDialog id={id} summary={summary} title={title} />}
      </Card>
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
