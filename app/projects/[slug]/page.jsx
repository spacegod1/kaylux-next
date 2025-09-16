'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { projects } from '@/data/projects'

export default function ProjectPage() {
  const { slug } = useParams()
  const [currentSection, setCurrentSection] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const containerRef = useRef(null)
  const sectionsRef = useRef([])
  
  // Find current project and next project
  const project = projects.find(p => p.id === slug)
  const currentIndex = projects.findIndex(p => p.id === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    let scrollTimeout = null
    let scrollAccumulator = 0

    const handleWheel = (e) => {
      const sections = sectionsRef.current.filter(Boolean)
      const totalSections = sections.length
      const currentSectionElement = sections[currentSection]
      
      // Special handling for gallery section (index 2)
      if (currentSection === 2 && currentSectionElement) {
        const isScrollable = currentSectionElement.scrollHeight > currentSectionElement.clientHeight
        
        if (isScrollable) {
          const scrollTop = currentSectionElement.scrollTop
          const scrollHeight = currentSectionElement.scrollHeight
          const clientHeight = currentSectionElement.clientHeight
          const isAtTop = scrollTop <= 5
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5
          
          // If trying to scroll down and already at bottom, move to next section
          if (e.deltaY > 0 && isAtBottom && currentSection < totalSections - 1) {
            e.preventDefault()
            setCurrentSection(prev => prev + 1)
            return
          }
          
          // If trying to scroll up and already at top, move to previous section
          if (e.deltaY < 0 && isAtTop && currentSection > 0) {
            e.preventDefault()
            setCurrentSection(prev => prev - 1)
            return
          }
          
          // Allow normal scrolling within the gallery
          return
        }
      }
      
      // For all other sections, prevent default and use smooth section transitions
      e.preventDefault()
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      
      // Accumulate scroll delta for smoother experience
      scrollAccumulator += e.deltaY
      
      // Set a small timeout for responsiveness
      scrollTimeout = setTimeout(() => {
        // Check if accumulated scroll is significant enough
        if (Math.abs(scrollAccumulator) > 30) { // Lower threshold for more responsive
          if (scrollAccumulator > 0) {
            // Scrolling down
            if (currentSection < totalSections - 1) {
              setCurrentSection(prev => prev + 1)
            }
          } else {
            // Scrolling up
            if (currentSection > 0) {
              setCurrentSection(prev => prev - 1)
            }
          }
          
          // Reset accumulator
          scrollAccumulator = 0
        }
      }, 50) // Faster response time
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      
      return () => {
        container.removeEventListener('wheel', handleWheel)
        if (scrollTimeout) {
          clearTimeout(scrollTimeout)
        }
      }
    }
  }, [currentSection, isDesktop])

  if (!project) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-italiana text-gray-800">Project not found</h1>
          <Link href="/projects" className="text-gray-600 hover:text-gray-800 mt-4 inline-block">
            ← Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  const sections = [
    { id: 'hero', title: 'Project' },
    { id: 'about', title: 'About' },
    { id: 'images', title: 'Gallery' },
    { id: 'videos', title: 'Videos' },
    { id: 'next', title: 'Next Project' }
  ]

  return (
    <>
      <Navigation />
      
      <div 
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden bg-stone-100"
      >
        {/* Desktop Horizontal Scroll */}
        {isDesktop ? (
          <motion.div
            className="flex h-full"
            animate={{ 
              x: `-${currentSection * 100}vw` 
            }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 100,
              duration: 0.8
            }}
          >
            {/* Hero Section */}
            <section 
              ref={el => sectionsRef.current[0] = el}
              className="w-screen h-full flex-shrink-0 relative"
            >
              <div className="relative w-full h-full">
                <Image
                  src={project.hero_image}
                  alt={project.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 pb-32 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <h1 className="text-4xl md:text-7xl font-italiana mb-4">
                      {project.name}
                    </h1>
                    <div className="flex flex-wrap gap-6 text-lg md:text-xl font-light">
                      <span>{project.year}</span>
                      <span>•</span>
                      <span>{project.location}</span>
                      <span>•</span>
                      <span>{project.type}</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section 
              ref={el => sectionsRef.current[1] = el}
              className="w-screen h-full flex-shrink-0 flex items-center justify-center p-8 md:p-16"
            >
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: currentSection >= 1 ? 1 : 0, x: currentSection >= 1 ? 0 : 100 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-5xl md:text-6xl font-italiana mb-8 text-black">
                    About
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 font-light">
                    {project.about}
                  </p>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {project.description}
                    </p>
                  </div>
                  
                  {/* Project Details */}
                  <div className="mt-12 grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-rajdhani text-sm uppercase tracking-wider text-gray-500 mb-3">
                        Project Details
                      </h3>
                      <div className="space-y-2 text-gray-700">
                        <p><span className="font-medium">Client:</span> {project.client}</p>
                        <p><span className="font-medium">Duration:</span> {project.duration}</p>
                        <p><span className="font-medium">Year:</span> {project.year}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-rajdhani text-sm uppercase tracking-wider text-gray-500 mb-3">
                        Materials & Finishes
                      </h3>
                      <ul className="space-y-1 text-gray-700">
                        {project.materials?.map((material, index) => (
                          <li key={index} className="text-sm">• {material}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Images Section */}
            <section 
              ref={el => sectionsRef.current[2] = el}
              className="w-screen h-full flex-shrink-0 overflow-y-auto p-8 md:p-16"
              style={{ scrollBehavior: 'smooth' }}
            >
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: currentSection >= 2 ? 1 : 0, x: currentSection >= 2 ? 0 : 100 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-5xl md:text-6xl font-italiana mb-8 text-black">
                  Gallery
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.images?.map((image, index) => (
                    <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={image}
                        alt={`${project.name} - Image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Videos Section */}
            <section 
              ref={el => sectionsRef.current[3] = el}
              className="w-screen h-full flex-shrink-0 flex items-center justify-center p-8 md:p-16"
            >
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: currentSection >= 3 ? 1 : 0, x: currentSection >= 3 ? 0 : 100 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center"
              >
                <h2 className="text-5xl md:text-6xl font-italiana mb-8 text-black">
                  Process
                </h2>
                {project.videos?.length > 0 ? (
                  <div className="space-y-8">
                    {project.videos.map((video, index) => (
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                        <video
                          controls
                          className="w-full h-full object-cover"
                          poster={project.hero_image}
                        >
                          <source src={video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-2xl text-gray-500 font-light">
                    Process videos coming soon...
                  </p>
                )}
              </motion.div>
            </section>

            {/* Next Project Section */}
            <section 
              ref={el => sectionsRef.current[4] = el}
              className="w-screen h-full flex-shrink-0 relative"
            >
              <div className="relative w-full h-full">
                <Image
                  src={nextProject.hero_image}
                  alt={nextProject.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: currentSection >= 4 ? 1 : 0, x: currentSection >= 4 ? 0 : 100 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8"
                >
                  <h3 className="text-lg font-rajdhani uppercase tracking-widest mb-4">
                    Next Project
                  </h3>
                  <h2 className="text-4xl md:text-6xl font-italiana mb-8">
                    {nextProject.name}
                  </h2>
                  <div className="flex gap-8 text-lg mb-12">
                    <span>{nextProject.year}</span>
                    <span>•</span>
                    <span>{nextProject.location}</span>
                  </div>
                  <div className="flex gap-6">
                    <Link
                      href={`/projects/${nextProject.id}`}
                      className="bg-white text-black px-8 py-3 font-medium hover:bg-gray-100 transition-colors"
                    >
                      View Project
                    </Link>
                    <Link
                      href="/projects"
                      className="border border-white text-white px-8 py-3 font-medium hover:bg-white hover:text-black transition-colors"
                    >
                      All Projects
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        ) : (
          /* Mobile Vertical Scroll */
          <div className="h-full overflow-y-auto">
            {/* Mobile Hero */}
            <section className="h-screen relative">
              <Image
                src={project.hero_image}
                alt={project.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h1 className="text-3xl font-italiana mb-4">
                  {project.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span>{project.year}</span>
                  <span>•</span>
                  <span>{project.location}</span>
                  <span>•</span>
                  <span>{project.type}</span>
                </div>
              </div>
            </section>

            {/* Mobile About */}
            <section className="py-16 px-6 bg-white">
              <h2 className="text-3xl font-italiana mb-6 text-black">
                About
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {project.about}
              </p>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-8">
                {project.description}
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-rajdhani text-sm uppercase tracking-wider text-gray-500 mb-3">
                    Project Details
                  </h3>
                  <div className="space-y-1 text-gray-700 text-sm">
                    <p><span className="font-medium">Client:</span> {project.client}</p>
                    <p><span className="font-medium">Duration:</span> {project.duration}</p>
                    <p><span className="font-medium">Year:</span> {project.year}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-rajdhani text-sm uppercase tracking-wider text-gray-500 mb-3">
                    Materials
                  </h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    {project.materials?.map((material, index) => (
                      <li key={index}>• {material}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Mobile Images */}
            <section className="py-16 px-6 bg-stone-50">
              <h2 className="text-3xl font-italiana mb-8 text-black">
                Gallery
              </h2>
              <div className="space-y-6">
                {project.images?.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`${project.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Mobile Videos */}
            {project.videos?.length > 0 && (
              <section className="py-16 px-6 bg-white">
                <h2 className="text-3xl font-italiana mb-8 text-black">
                  Process
                </h2>
                <div className="space-y-6">
                  {project.videos.map((video, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                      <video
                        controls
                        className="w-full h-full object-cover"
                        poster={project.hero_image}
                      >
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Mobile Next Project */}
            <section className="h-screen relative">
              <Image
                src={nextProject.hero_image}
                alt={nextProject.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                <h3 className="text-sm font-rajdhani uppercase tracking-widest mb-4">
                  Next Project
                </h3>
                <h2 className="text-3xl font-italiana mb-6">
                  {nextProject.name}
                </h2>
                <div className="flex gap-4 text-sm mb-8">
                  <span>{nextProject.year}</span>
                  <span>•</span>
                  <span>{nextProject.location}</span>
                </div>
                <div className="flex flex-col gap-4 w-full max-w-xs">
                  <Link
                    href={`/projects/${nextProject.id}`}
                    className="bg-white text-black px-6 py-3 font-medium hover:bg-gray-100 transition-colors text-center"
                  >
                    View Project
                  </Link>
                  <Link
                    href="/projects"
                    className="border border-white text-white px-6 py-3 font-medium hover:bg-white hover:text-black transition-colors text-center"
                  >
                    All Projects
                  </Link>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Desktop Progress Indicator */}
        {isDesktop && (
          <div className="fixed right-8 top-1/2 -translate-y-1/2 z-10">
            <div className="flex flex-col space-y-3">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(index)}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300 cursor-pointer
                    ${currentSection === index 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                    }
                  `}
                  title={section.title}
                />
              ))}
            </div>
          </div>
        )}

        {/* Desktop Scroll Hint */}
        {isDesktop && currentSection === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white text-center z-10"
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm font-light">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-6 h-10 border border-white/50 rounded-full flex justify-center"
              >
                <div className="w-1 h-3 bg-white rounded-full mt-2" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  )
}
