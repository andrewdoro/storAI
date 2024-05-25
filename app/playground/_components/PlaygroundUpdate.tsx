'use client'
import { Spinner } from '@/components/ui/spinner'
import { saveStory } from '@/lib/actions/story'
import { useGraphStore } from '@/lib/store'
import { minDelay } from '@/lib/utils'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useTransition } from 'react'
import { Edge, Node } from 'reactflow'
import { toast } from 'sonner'
import { useDebouncedCallback } from 'use-debounce'

const PlaygroundUpdate = () => {
  const wait = useRef(false)

  const nodes = useGraphStore(state => state.nodes)
  const edges = useGraphStore(state => state.edges)

  const { id } = useParams()
  const debounceUpdate = useDebouncedCallback(
    async ({
      id,
      nodes,
      edges
    }: {
      id: string
      nodes: Node[]
      edges: Edge[]
    }) => {
      const promise = minDelay(saveStory({ id, nodes, edges }), 900)
      toast.promise(promise, {
        loading: 'Saving...',
        success: 'Saved!',
        error: 'Failed to save.'
      })
    },
    1000
  )

  useEffect(() => {
    setTimeout(() => (wait.current = true), 3000)
  }, [])
  useEffect(() => {
    if (!wait.current) return
    debounceUpdate({ id: id as string, nodes, edges })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(edges), JSON.stringify(nodes)])

  return null
}

export default PlaygroundUpdate
