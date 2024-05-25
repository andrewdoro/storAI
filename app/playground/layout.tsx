import React, { ReactNode } from 'react'
import QuizNode from './_components/QuizNode'
import { GraphStore } from '@/lib/store'
import { getAllStories } from '@/lib/actions/story'

const PlaygroundLayout = async ({ children }: { children: ReactNode }) => {
  const stories = await getAllStories()
  return (
    <div className="grid grid-cols-5 mb-8 h-[calc(100vh-57px)]">
      <div className="border-r"></div>
      {children}
    </div>
  )
}

export default PlaygroundLayout
