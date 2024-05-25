'use client'
import React, { ReactNode } from 'react'
import QuizNode from './_components/QuizNode'
import { GraphStore } from '@/lib/store'

const PlaygroundLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-5 mb-8 h-[calc(100vh-57px)]">
      <div className="border-r" />
      <GraphStore.Provider initialValue={{}}>{children}</GraphStore.Provider>
    </div>
  )
}

export default PlaygroundLayout
