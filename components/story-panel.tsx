'use client'

import { useEffect, useState, useRef, useTransition } from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import Textarea from 'react-textarea-autosize'

import { useGraphStore } from '@/lib/store'
import { generateTopics } from '@/app/new-actions'
import { nanoid } from 'ai'
import { Edge, Node } from 'reactflow'
import { useParams } from 'next/navigation'
import { saveStory } from '@/lib/actions/story'
import { Skeleton } from './ui/skeleton'

export function StoryPanel() {
  const [loading, setLoading] = useState(false)

  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [showEmptyScreen, setShowEmptyScreen] = useState(false)

  const selectedNodeId = useGraphStore(state => state.selectedNodeId)
  const nodes = useGraphStore(state => state.nodes)
  const edges = useGraphStore(state => state.edges)

  const setNodes = useGraphStore(state => state.setNodes)
  const setEdges = useGraphStore(state => state.setEdges)

  const { id } = useParams()

  useEffect(() => {
    // focus on input when the page loads
    inputRef.current?.focus()
  }, [])

  const disabled = nodes.length > 1 && !selectedNodeId

  return (
    <div className={'w-full flex flex-col items-center justify-center'}>
      {nodes.length > 0 && (
        <p className="text-muted-foreground py-2">
          Select a new node and add your prompt.
        </p>
      )}
      {loading && (
        <div className="w-full px-4">
          <Skeleton className="w-full h-[48px] p-2 flex items-center justify-center">
            Loading prompt...
          </Skeleton>
        </div>
      )}
      {!loading && (
        <form
          onSubmit={async e => {
            e.preventDefault()
            const findNode = nodes.find(node => node.id === selectedNodeId)
            const data = new FormData(e.currentTarget)
            const value = data.get('input')

            let selectedNode = findNode
            const oldNodes = [...nodes]

            if (nodes.length === 0) {
              const newNode = {
                id: nanoid(),
                data: {
                  title: value,
                  summary: ''
                },
                type: 'quiz',
                position: {
                  x: 0,
                  y: 0
                }
              }
              selectedNode = newNode
              oldNodes.push(newNode)

              setNodes([newNode])
            }

            if (!selectedNode) return

            setLoading(true)
            const { topics, title } = await generateTopics({
              lastPrompt: selectedNode.data.title,
              lastSummary: selectedNode.data.summary,
              prompt: value as string,
              withTitle: nodes.length === 0
            })

            setLoading(false)
            const newNodes = topics.map((topic, index) => ({
              id: nanoid(),
              data: {
                title: topic.topic,
                summary: topic.summary
              },
              type: 'quiz',
              position: {
                x: selectedNode.position.x + 400,
                y: selectedNode.position.y + 200 * (index + 1)
              }
            })) as Node[]

            const newEdges = newNodes.map(node => ({
              id: `${node.id}-${selectedNode.id}`,
              source: selectedNode.id,
              target: node.id,
              sourceHandle: 'a',
              targetHandleId: 'b'
            })) as Edge[]

            const formatNodes = [...oldNodes, ...newNodes] as Node[]
            const formatEdges = [...edges, ...newEdges] as Edge[]

            setNodes(formatNodes)
            setEdges(formatEdges)

            if (!id) {
              const newId = nanoid()
              await saveStory({
                id: newId,
                edges: formatEdges,
                nodes: formatNodes,
                title: (title ?? value) as string
              })

              window.history.replaceState(
                {},
                `/playground/${newId}`,
                `/playground/${newId}`
              )
            }
          }}
          className="w-full px-6"
        >
          <div className="relative flex items-center w-full">
            <Textarea
              disabled={disabled}
              ref={inputRef}
              name="input"
              rows={1}
              maxRows={5}
              tabIndex={0}
              placeholder="Ask a question..."
              spellCheck={false}
              value={input}
              className="resize-none w-full disabled:opacity-50 min-h-12 rounded-fill bg-muted border border-input pl-4 pr-10 pt-3 pb-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'"
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
      )}
    </div>
  )
}
