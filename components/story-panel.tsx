'use client'

import { useEffect, useState, useRef } from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import Textarea from 'react-textarea-autosize'

import { useGraphStore } from '@/lib/store'
import { continueConversation } from '@/app/new-actions'
import { nanoid } from 'ai'
import { Edge, Node } from 'reactflow'

export function StoryPanel() {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [showEmptyScreen, setShowEmptyScreen] = useState(false)

  const selectedNodeId = useGraphStore(state => state.selectedNodeId)
  const nodes = useGraphStore(state => state.nodes)
  const edges = useGraphStore(state => state.edges)

  const setNodes = useGraphStore(state => state.setNodes)
  const setEdges = useGraphStore(state => state.setEdges)

  useEffect(() => {
    // focus on input when the page loads
    inputRef.current?.focus()
  }, [])
  return (
    <div className={'w-full flex flex-col items-center justify-center'}>
      <form
        onSubmit={async e => {
          e.preventDefault()
          const node = nodes.find(node => node.id === selectedNodeId)

          if (!node) return

          const { topics } = await continueConversation(node.data)
          const newNodes = topics.topics.map((topic, index) => ({
            id: nanoid(),
            data: {
              title: topic.topic,
              summary: topic.summary
            },
            type: 'quiz',
            position: {
              x: node.position.x + 200,
              y: node.position.y + 50 * (index + 1)
            }
          })) as Node[]

          const newEdges = newNodes.map(node => ({
            id: `${node.id}-${selectedNodeId}`,
            source: selectedNodeId,
            target: node.id,
            sourceHandle: 'a',
            targetHandleId: 'b'
          })) as Edge[]
          setNodes([...nodes, ...newNodes])
          setEdges([...edges, ...newEdges])
        }}
        className="w-full px-6"
      >
        <div className="relative flex items-center w-full">
          <Textarea
            disabled={selectedNodeId === null}
            ref={inputRef}
            name="input"
            rows={1}
            maxRows={5}
            tabIndex={0}
            placeholder="Ask a question..."
            spellCheck={false}
            value={input}
            className="resize-none w-full min-h-12 rounded-fill bg-muted border border-input pl-4 pr-10 pt-3 pb-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'"
            onChange={e => {
              setInput(e.target.value)
              setShowEmptyScreen(e.target.value.length === 0)
            }}
            onKeyDown={e => {
              // Enter should submit the form
              if (
                e.key === 'Enter' &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                // Prevent the default action to avoid adding a new line
                if (input.trim().length === 0) {
                  e.preventDefault()
                  return
                }
                e.preventDefault()
                const textarea = e.target as HTMLTextAreaElement
                textarea.form?.requestSubmit()
              }
            }}
            onHeightChange={height => {
              // Ensure inputRef.current is defined
              if (!inputRef.current) return

              // The initial height and left padding is 70px and 2rem
              const initialHeight = 70
              // The initial border radius is 32px
              const initialBorder = 32
              // The height is incremented by multiples of 20px
              const multiple = (height - initialHeight) / 20

              // Decrease the border radius by 4px for each 20px height increase
              const newBorder = initialBorder - 4 * multiple
              // The lowest border radius will be 8px
              inputRef.current.style.borderRadius =
                Math.max(8, newBorder) + 'px'
            }}
            onFocus={() => setShowEmptyScreen(true)}
            onBlur={() => setShowEmptyScreen(false)}
          />
          <Button
            type="submit"
            size={'icon'}
            variant={'ghost'}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            disabled={input.length === 0}
          >
            <ArrowRight size={20} />
          </Button>
        </div>
        {/* <EmptyScreen
          submitMessage={message => {
            setInput(message)
          }}
          className={cn(showEmptyScreen ? 'visible' : 'invisible')}
        /> */}
      </form>
    </div>
  )
}
