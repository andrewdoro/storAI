'use server'

import { createStreamableValue } from 'ai/rsc'
import { CoreMessage, generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'

export async function continueConversation({
  prompt,
  summary
}: {
  prompt: string
  summary: string
}) {
  'use server'

  const result = await generateObject({
    model: openai('gpt-4o'),
    maxTokens: 500,
    prompt: `You are an AI assistant. Your role is to assist the user in their task. 
      The user asks you a question, and you response with of topis required to learn relevant information for that domain
      
      This is the last prompt: ${prompt}
     This is the last prompt summary: ${summary}

     Write a new topic conntected to the last promp
      `,
    schema: z.object({
      topics: z
        .array(
          z.object({
            topic: z.string().max(200),
            summary: z.string().max(300)
          })
        )
        .max(3)
    })
  })
  return { topics: result.object }
}
