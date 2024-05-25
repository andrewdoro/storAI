import React, { ReactNode } from 'react'
import { getStories } from '@/lib/actions/story'
import Link from 'next/link'
import { Bot, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PlaygroundSelector from './_components/PlaygroundSelector'
import PlaygroundUpdate from './_components/PlaygroundUpdate'

const PlaygroundLayout = async ({ children }: { children: ReactNode }) => {
  const stories = await getStories()
  return (
    <div className="grid grid-cols-5 mb-8 h-[calc(100vh-57px)]">
      <div className="flex flex-col border-r gap-2 p-4">
        <p className="text-lg flex gap-2 tracking-tight font-semibold">
          <Bot />
          Chats
        </p>
        <PlaygroundSelector stories={stories} />
        <Link href="/playground" className="mt-auto">
          <Button className="gap-2 w-full ">
            <Plus />
            New Chat
          </Button>
        </Link>
      </div>
      {children}
    </div>
  )
}

export default PlaygroundLayout
