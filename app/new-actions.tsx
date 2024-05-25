'use server'

import { createStreamableValue } from 'ai/rsc'
import { CoreMessage, generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'

export async function generateTopics({
  lastPrompt,
  lastSummary,
  prompt,
  withTitle
}: {
  lastPrompt: string
  lastSummary: string
  prompt?: string
  withTitle?: boolean
}) {
  'use server'

  const result = await generateObject({
    model: openai('gpt-4o'),
    maxTokens: 500,
    prompt: `I want you to imagine that you are a teacher with infinite knowledge about the world. Your role is to provide concrete and precise information to your students. 
    Information will be provided in the following way: You will respond with concise and accurate topics about what your student wants to learn. 
    The student will be the one discussing with you. So the learner could chose what will he like to learn.
      
     This is the last prompt: ${lastPrompt} Focus on this this is very important
     This is the last prompt summary: ${lastSummary}

     Also take into consideration users's prompt:
     ${prompt}

      `,

    schema: z.object({
      ...(withTitle && { title: z.string().max(200) }),
      topics: z
        .array(
          z.object({
            topic: z.string().max(200),
            summary: z.string().max(300)
          })
        )
        .max(6)
    })
  })

  return result.object
}
