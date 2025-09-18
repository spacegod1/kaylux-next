'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const carouselImages = [
  {
    src: '/images/cactus_hallway.png',
    alt: 'Cactus Hallway Design',
    title: 'CACTUS HALLWAY'
  },
  {
    src: '/images/orchid_kitchen.png',
    alt: 'Orchid Kitchen Design',
    title: 'ORCHID KITCHEN AREA'
  },
  {
    src: '/images/cactus_living_area.png',
    alt: 'Cactus Living Area Design',
    title: 'CACTUS LIVING AREA'
  },
  {
    src: '/images/marigold_living_area.jpg',
    alt: 'Marigold Living Area Design',
    title: 'MARIGOLD LIVING AREA'
  },
  {
    src: '/images/cactus_living area_extended.png',
    alt: 'Cactus Living Area Extended',
    title: 'CACTUS LIVING SPACE'
  },
  {
    src: '/images/marigold_living_area2.jpg',
    alt: 'Marigold Living Area Extended',
    title: 'MARIGOLD LIVING SPACE'
  },
]

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 7000) // Change slide every 7 seconds

    return () => clearInterval(interval)
  }, [])

  const goToNext = () => {
    setCurrentIndex(currentIndex === carouselImages.length - 1 ? 0 : currentIndex + 1)
  }

  const goToPrev = () => {
    setCurrentIndex(currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={carouselImages[currentIndex].src}
            alt={carouselImages[currentIndex].alt}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            sizes="100vw"
          />
          
          {/* Overlay Content */}
          <div className="
            absolute inset-0 
            flex items-end
            bg-gradient-to-t from-black/50 to-transparent
          ">
            <div className="
              text-white p-8 md:p-16 pb-28 md:pb-32
              max-w-2xl
            ">
              <motion.h5 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="
                  text-lg md:text-xl
                  font-medium tracking-wide
                  mb-4
                "
              >
                {carouselImages[currentIndex].title}
              </motion.h5>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Link
                  href="/projects"
                  className="
                    inline-block text-white
                    border-b border-white/50
                    pb-1 hover:border-white
                    transition-all duration-300
                    text-sm md:text-base
                    font-light
                  "
                >
                  VIEW PROJECTS →
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <button
        onClick={goToPrev}
        className="
          absolute left-4 md:left-8 top-1/2 -translate-y-1/2
          text-white/70 hover:text-white
          transition-colors duration-300
          z-10
        "
        aria-label="Previous image"
      >
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="
          absolute right-4 md:right-8 top-1/2 -translate-y-1/2
          text-white/70 hover:text-white
          transition-colors duration-300
          z-10
        "
        aria-label="Next image"
      >
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="
        absolute bottom-8 left-1/2 -translate-x-1/2
        flex space-x-2 z-10
      ">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${index === currentIndex 
                ? 'bg-white' 
                : 'bg-white/40 hover:bg-white/60'
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
