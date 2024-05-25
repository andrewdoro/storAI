'use client'
import { Story } from '@/lib/actions/story'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

interface PlaygroundSelectorProps {
  stories: Story[]
}
const PlaygroundSelector = ({ stories }: PlaygroundSelectorProps) => {
  const { id } = useParams()
  return (
    <div className="flex flex-col gap-2">
      {stories.map(story => (
        <Link
          href={`/playground/${story.id}`}
          className={cn(
            'text-muted-foreground font-mono hover:text-primary font-semibold bg-background rounded-md',
            id === story.id && 'text-primary'
          )}
          key={story.title}
        >
          {story.title}
        </Link>
      ))}
    </div>
  )
}

export default PlaygroundSelector
