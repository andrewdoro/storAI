"use client";

import React from 'react'; // Import React
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface DivPullUpProps {
  children: React.ReactNode;
  delayMultiple?: number;
  wrapperFramerProps?: Variants;
  framerProps?: Variants;
  className?: string;
  delay: number;
}

export default function DivPullUp({
  children,
  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
  },
  framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
  className,
  delay,
  delayMultiple = 0.1, // Default value for delayMultiple
}: DivPullUpProps) {
  return (
    <motion.div
      variants={wrapperFramerProps}
      initial="hidden"
      animate="show"
      transition={{ delay }}
      className={cn(
        "font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]",
        className,
      )}
    >
      {React.Children.map(children, (child, i) => (
        <motion.div
          key={i}
          variants={framerProps}
          style={{ display: "inline-block", paddingRight: "15px" }}
          transition={{ delay: delay + i * delayMultiple }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
