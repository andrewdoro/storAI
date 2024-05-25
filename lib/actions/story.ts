'use server'

import { Edge, Node } from 'reactflow'
import { redis } from '../redis'

export type Story = {
  nodes: Node[]
  edges: Edge[]
}
export const getStory = async (id: string) => {
  const chat = await redis.hgetall<Story>(`story:${id}`)
  return chat
}

export const saveStory = async (story: Story, id: string) => {
  const pipeline = redis.pipeline()
  pipeline.hmset(`story:${id}`, story)
  await pipeline.exec()
}

export const getAllStories = async () => {
  const stories = await redis.hgetall('story:*')

  console.log(stories)
  return stories
}
