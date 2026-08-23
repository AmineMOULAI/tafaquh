'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export const HexPattern = ({ speed = 50 }: { speed?: number }) => {
  const ref = useRef(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { scrollYProgress } = useScroll(
    isMounted && ref.current
      ? { target: ref, offset: ["start end", "end start"] }
      : {}
  )
  const y = useTransform(scrollYProgress, [0, 1], [0, speed])

  return (
    <motion.div 
      ref={ref}
      style={{ y }}
      className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
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
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { scrollYProgress } = useScroll(
    isMounted && ref.current
      ? { target: ref, offset: ["start end", "end start"] }
      : {}
  )
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

/**
 * Official Brand SVG Emblem:
 * Golden Circle + Open Book + Dark Green Calligraphy Elements
 */
export const TafaqquhEmblem = ({ className = "w-16 h-16" }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer Golden Geometric Rotating / Shimmering Circle */}
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="goldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9E498" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
          <linearGradient id="darkEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B3B2C" />
            <stop offset="100%" stopColor="#062319" />
          </linearGradient>
        </defs>

        {/* Outer Circular Ring with 8-Point Star Accents */}
        <circle cx="60" cy="60" r="54" stroke="url(#goldRingGrad)" strokeWidth="2.5" strokeDasharray="6 3" />
        <circle cx="60" cy="60" r="48" stroke="url(#goldRingGrad)" strokeWidth="1" opacity="0.6" />

        {/* 8 Islamic Star Dots */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const cx = 60 + 54 * Math.cos(rad)
          const cy = 60 + 54 * Math.sin(rad)
          return <circle key={i} cx={cx} cy={cy} r="2" fill="#D4AF37" />
        })}

        {/* Inner Emerald Field */}
        <circle cx="60" cy="60" r="44" fill="url(#darkEmeraldGrad)" stroke="url(#goldRingGrad)" strokeWidth="1.5" />

        {/* Open Book Motif */}
        <path
          d="M38 72C46 70 54 72 60 76C66 72 74 70 82 72V48C74 46 66 48 60 52C54 48 46 46 38 48V72Z"
          fill="none"
          stroke="#F9E498"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Book Spine */}
        <path d="M60 52V76" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />

        {/* Stylized Arabic "تَفَقَّه" Calligraphy Accent over book */}
        <path
          d="M48 42C52 38 68 38 72 42M60 34V39"
          stroke="#D4AF37"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="56" cy="32" r="1.5" fill="#D4AF37" />
        <circle cx="64" cy="32" r="1.5" fill="#D4AF37" />
      </svg>
    </div>
  )
}

/**
 * Islamic Watermark Pattern for Card Backgrounds
 */
export const IslamicWatermark = ({ className = "opacity-5" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
        <pattern id="cardIslamicGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M10 0L20 10L10 20L0 10Z" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
          <circle cx="10" cy="10" r="3" stroke="#D4AF37" strokeWidth="0.3" fill="none" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#cardIslamicGrid)" />
      </svg>
    </div>
  )
}

