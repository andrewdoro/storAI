import React, { ReactNode } from 'react'
import { getStories } from '@/lib/actions/story'
import Link from 'next/link'
import { Bot, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PlaygroundLayout = async ({ children }: { children: ReactNode }) => {
  const stories = await getStories()
  return (
    <div className="grid grid-cols-5 mb-8 h-[calc(100vh-57px)]">
      <div className="flex flex-col border-r gap-2 p-4">
        <p className="text-lg flex gap-2 font-semibold">
          <Bot />
          Chats
        </p>
        <div className="flex flex-col gap-2">
          {stories.map(story => (
            <Link
              href={`/playground/${story.id}`}
              className="text-muted-foreground font-mono hover:text-primary bg-background rounded-md"
              key={story.title}
            >
              {story.title}
            </Link>
          ))}
        </div>
        <Link href={`/playground`} className="mt-auto">
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
