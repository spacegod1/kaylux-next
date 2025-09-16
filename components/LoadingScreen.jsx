'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onComplete, 500) // Allow fade-out to complete
    }, 2700)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`
        fixed inset-0 z-50 
        bg-black
        flex flex-col items-center justify-center
        transition-all duration-500 ease-in-out
        ${!isVisible ? 'pointer-events-none' : ''}
      `}
    >
      <div className="w-[300px] h-[300px] relative mb-4">
        <Image
          src="/images/K.png"
          alt="Kaylux logo"
          fill
          className="object-contain"
        />
      </div>
      
      <div className="w-12 h-12">
        <object 
          data="/images/Earth-2s-84px.svg"
          className="w-full h-full"
          aria-label="Loading animation"
        />
      </div>
    </motion.div>
  )
}

