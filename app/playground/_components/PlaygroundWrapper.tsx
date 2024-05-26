'use client'
import React from 'react'
import Playground from './Playground'
import { GraphStore } from '@/lib/store'
import { Story } from '@/lib/actions/story'
import PlaygroundUpdate from './PlaygroundUpdate'

interface PlaygroundWrapperProps {
  story?: Story
}
const PlaygroundWrapper = ({ story }: PlaygroundWrapperProps) => {
  return (
    <GraphStore.Provider
      initialValue={{ edges: story?.edges ?? [], nodes: story?.nodes ?? [] }}
    >
      <Playground />
      {story && <PlaygroundUpdate />}
    </GraphStore.Provider>
  )
}

export default PlaygroundWrapper
