'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const HexPattern = ({ speed = 50 }: { speed?: number }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, speed])

  return (
    <motion.div 
      ref={ref}
      style={{ y }}
      className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern id="hexagons" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
          <path 
            d="M50 0 L100 28.87 L100 86.6 L50 115.47 L0 86.6 L0 28.87 Z" 
            fill="none" 
            stroke="var(--color-gold)" 
            strokeWidth="1.5"
            strokeDasharray="5,5"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </motion.div>
  )
}

export const StarPattern = ({ speed = -100 }: { speed?: number }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, speed])

  return (
    <motion.div 
      ref={ref}
      style={{ y }}
      className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern id="stars" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse" patternTransform="scale(1.2) rotate(15)">
          <path 
            d="M60 0 L75 45 L120 60 L75 75 L60 120 L45 75 L0 60 L45 45 Z" 
            fill="var(--color-gold)" 
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#stars)" />
      </svg>
    </motion.div>
  )
}
