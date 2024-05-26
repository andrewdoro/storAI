import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import React, { useEffect } from 'react'

const WelcomeDialog = () => {
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to storAI</DialogTitle>
          <DialogDescription>
            After closing this dialog, you can start using the playground to
            create your own story.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center">
          <p>You can add a prompt similar to this:</p>
          <span className="text-muted-foreground text-center">
            I want to learn about the history of the United States.
          </span>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button className="w-full">Start your journey</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default WelcomeDialog
