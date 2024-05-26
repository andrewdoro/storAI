import React from 'react'
import { ModeToggle } from './mode-toggle'
import { Lightbulb } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const Header: React.FC = async () => {
  return (
    <header className=" w-full p-2 border-b flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div>
        <Link href="/playground">
          <Image
            src="/logo.webp"
            alt="storAI"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="sr-only">storAI</span>
        </Link>
      </div>
      <div className="flex items-center gap-0.5">
        <div className="flex items-center text-primary font-semibold">
          <p className="text-lg">100</p>
          <Lightbulb className="w-5 h-5" />
        </div>
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header
