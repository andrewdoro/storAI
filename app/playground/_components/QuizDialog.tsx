import { generateLessonContent } from '@/app/new-actions'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { readStreamableValue } from 'ai/rsc'
import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'

interface QuizDialogProps {
  id: string
  title: string
  summary: string
}
const QuizDialog = ({ id, summary, title }: QuizDialogProps) => {
  const [content, setContent] = useState<string>('')

  useEffect(() => {}, [])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full rounded-none rounded-b-md">
          Quiz
        </Button>
      </DialogTrigger>
      <DialogContent className={cn(content && 'max-w-5xl mx-auto')}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{summary}</DialogDescription>
        </DialogHeader>

        {content && (
          <ScrollArea className="max-h-[70vh]">
            <Markdown className="prose dark:prose-invert border p-6 w-full max-w-none rounded-lg">
              {content}
            </Markdown>
          </ScrollArea>
        )}
        <DialogFooter>
          <Button
            onClick={async () => {
              const result = await generateLessonContent({ summary, title })

              for await (const content of readStreamableValue(result)) {
                if (content) setContent(content)
              }
            }}
          >
            {content ? 'Regenerate' : 'Generate Lesson'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default QuizDialog
