import React from 'react'
import { getStory } from '@/lib/actions/story'
import PlaygroundWrapper from '../_components/PlaygroundWrapper'

const IndividualPlaygroundPage = async ({
  params
}: {
  params: { id: string }
}) => {
  const id = params.id
  const story = await getStory(id)

  if (!story) {
    return null
  }

  return <PlaygroundWrapper story={story} />
}

export default IndividualPlaygroundPage
