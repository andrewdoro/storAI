'use client'
import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import GridPattern from '@/components/magicui/grid-pattern'
import DivPullUp from '@/components/magicui/word-pull-up'
import DivFadeIn from '@/components/magicui/div-fade-in'
import TextShimmer from '@/components/magicui/animated-shiny-text'
import {
  Lightbulb,
  Earth,
  Telescope,
  Swords,
  Pyramid,
  Banknote
} from 'lucide-react'
import Link from 'next/link'

const Page = () => {
  const topics = [
    {
      topic: 'Programming',
      context:
        'Discover unique programming languages: learn to code in Rust, React, and Python today!',
      positionY: '3rem',
      positionX: 'left: 8rem',
      width: '14rem',
      icon: Banknote
    },
    {
      topic: 'Astronomy',
      context:
        'Explore planets, stars, and galaxies. How well do you know astronomy?',
      positionY: '16rem',
      positionX: 'left: 2rem',
      width: '12rem',
      icon: Telescope
    },
    {
      topic: 'Business',
      context:
        'Unlock financial success: learn the strategies of making money and mastering business skills!',
      positionY: '30rem',
      positionX: 'left: 7rem',
      width: '14rem',
      icon: Banknote
    },
    {
      topic: 'Geography',
      context:
        "Explore the world's continents, countries, and capitals. Can you name them all? Let's learn geography!",
      positionY: '3rem',
      positionX: 'right: 18rem',
      width: '14rem',
      icon: Earth
    },
    {
      topic: 'Mathematics',
      context:
        'Master math: dive deep into the fascinating worlds of geometry and algebra!',
      positionY: '15rem',
      positionX: 'right: 6rem',
      width: '16rem',
      icon: Pyramid
    },
    {
      topic: 'History',
      context:
        'Unlock the past: dive into history and discover the events that shaped our world.',
      positionY: '30rem',
      positionX: 'right: 14rem',
      width: '18rem',
      icon: Swords
    }
  ]
  return (
    <div className="h-[100vh] w-[100vw]">
      <div className="relative flex h-[100vh] w-full  items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
        <div className="relative -top-10 -left-20">
          <DivPullUp delay={0} delayMultiple={0.75} className="my-custom-class">
            <p className="absolute -mt-[12rem] -ml-[12rem] font-bold font-mono select-none tracking-[-0.02em] text-black dark:text-white md:text-5xl md:leading-[5rem]">
              Knowledge?
            </p>
            <p className="absolute -mt-[9rem] -ml-[7rem] font-semibold font-mono select-none tracking-[-0.02em] text-black dark:text-white md:text-6xl md:leading-[5rem]">
              +
            </p>
            <p className="absolute -mt-[6rem] -ml-[5rem] font-bold font-mono select-none tracking-[-0.02em] text-black dark:text-white md:text-5xl md:leading-[5rem]">
              Fun?
            </p>
            <div className="absolute -mt-[2rem] -ml-[0rem] w-[15rem] font-bold font-mono select-none  text-black dark:text-white md:text-5xl ">
              =&gt; <span className="text-[#f6b700]">storAI</span>
            </div>
            <div className="absolute z-10 flex min-h-[16rem] w-[10rem] items-center justify-center">
              <Link href="/playground">
                <div
                  className={cn(
                    'group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800'
                  )}
                >
                  <TextShimmer className="inline-flex font-normal items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                    <span className="whitespace-nowrap flex flex-row gap-1">
                      <Lightbulb className="w-4" strokeWidth={3} /> Start your
                      journey
                    </span>
                  </TextShimmer>
                </div>
              </Link>
            </div>
          </DivPullUp>
        </div>
        <div>
          <DivFadeIn delay={3} delayMultiple={0.5}>
            {topics.map((topic, index) => (
              <div
                key={index}
                className="z-20 absolute max-h-[12rem] max-w-[16rem] bg-neutral-200/90 dark:bg-neutral-800/90 rounded-xl transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-3 line-clamp-4 select-none"
                style={{
                  top: topic.positionY,
                  ...Object.fromEntries([
                    topic.positionX.split(': ').map(s => s.trim())
                  ])
                }}
              >
                <div className="flex flex-col gap-2 font-normal px-2 py-1 transition ease-out text-neutral-600/50 dark:text-neutral-400/50 hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <span className="flex flex-wrap gap-1">
                    <topic.icon
                      className="w-4 text-[#f6b700]"
                      strokeWidth={3}
                    />
                    {topic.topic}
                  </span>
                </div>
                <div
                  style={{ width: topic.width }}
                  className="font-light text-sm px-2 py-1 transition ease-out dark:text-neutral-400 hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"
                >
                  {topic.context}
                </div>
              </div>
            ))}
          </DivFadeIn>
        </div>
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          className={cn(
            '[mask-image:linear-gradient(to_bottom_right,rgb(255,255,255,.7),rgb(255,255,255,.5),rgb(255,255,255,.1))] '
          )}
        />
      </div>
    </div>
  )
}

export default Page
