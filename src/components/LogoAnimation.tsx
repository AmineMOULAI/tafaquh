'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function LogoAnimation() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        duration: 1,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.05 }}
      className="relative w-24 h-24 md:w-32 md:h-32"
    >
      <Image
        src="/images/logo-tafaquh.png"
        alt="TAFAQUH Logo"
        fill
        className="object-contain"
      />
      <motion.div
        animate={{ 
          rotate: 360,
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 border-2 border-gold/20 rounded-full border-dashed"
      />
    </motion.div>
  )
}
