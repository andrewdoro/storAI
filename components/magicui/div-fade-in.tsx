'use client'

import React from 'react' // Import React
import { motion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DivFadeInProps {
  children: React.ReactNode
  delayMultiple?: number
  wrapperFramerProps?: Variants
  framerProps?: Variants
  className?: string
  delay: number
}

export default function DivFadeIn({
  children,
  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  },
  framerProps = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  },
  className,
  delay,
  delayMultiple = 0.1 // Default value for delayMultiple
}: DivFadeInProps) {
  return (
    <motion.div
      variants={wrapperFramerProps}
      initial="hidden"
      animate="show"
      transition={{ delay }}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div
          key={i}
          variants={framerProps}
          transition={{ delay: delay + i * delayMultiple }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
