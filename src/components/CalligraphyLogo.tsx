'use client'

import { motion, Variants } from 'framer-motion'

export default function CalligraphyLogo({ className = "" }: { className?: string }) {
  // SVG path for "تفقه" in a stylized modern calligraphy style.
  // This is a simplified, elegant vector representation for demonstration.
  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.5, ease: [0.42, 0, 0.58, 1] },
        opacity: { duration: 0.5 }
      }
    }
  }

  return (
    <motion.svg
      viewBox="0 0 300 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full max-w-[400px] ${className}`}
    >
      {/* "تفقه" Stylized Path */}
      <motion.path
        d="M260 40C240 20 200 20 180 40C160 60 160 80 180 90C200 100 240 100 260 90M140 40C120 20 80 20 60 40C40 60 40 80 60 90C80 100 120 100 140 90M140 40V90M100 10V30"
        stroke="var(--color-gold)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />
      
      {/* Elegant Underline/Decorative Line */}
      <motion.path
        d="M20 110C60 100 240 100 280 110"
        stroke="var(--color-gold)"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1 }}
      />
      
      {/* Dots/Diacritics */}
      <motion.circle
        cx="100" cy="15" r="3"
        fill="var(--color-gold)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5 }}
      />
      <motion.circle
        cx="180" cy="15" r="3"
        fill="var(--color-gold)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.7 }}
      />
    </motion.svg>
  )
}
