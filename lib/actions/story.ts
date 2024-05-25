'use server'

import { Edge, Node } from 'reactflow'
import { redis } from '../redis'
import { ip } from '../utils/ip'

export type Story = {
  id: string
  userId: string
  title: string
  nodes: Node[]
  edges: Edge[]
}
export const getStory = async (id: string) => {
  const chat = await redis.hgetall<Story>(`story:${id}`)
  return chat
}

export const saveStory = async (story: Omit<Story, 'userId'>, id: string) => {
  const pipeline = redis.pipeline()

  const userId = ip()
  pipeline.hmset(`story:${id}`, story)
  pipeline.zadd(`user:story:${userId}`, {
    score: Date.now(),
    member: `story:${id}`
  })
  await pipeline.exec()
}

export async function getStories() {
  const userId = ip()
  if (!userId) {
    return []
  }
  try {
    const pipeline = redis.pipeline()
    const stories: string[] = await redis.zrange(
      `user:story:${userId}`,
      0,
      -1,
      {
        rev: true
      }
    )

    for (const story of stories) {
      pipeline.hgetall(story)
    }

    const results = await pipeline.exec()

    return results as Story[]
  } catch (error) {
    return []
  }
}
