'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { projects } from '@/data/projects'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true
    return project.category === activeFilter
  })

  return (
    <div className="min-h-screen bg-stone-100">
      <Navigation />
      
      <div className="pt-28 md:pt-28 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-normal font-italiana tracking-tight text-black mb-8">
            PROJECTS
          </h1>
          
          {/* Filter Tabs */}
          <div className="flex space-x-8 border-b border-stone-200">
            <button
              onClick={() => setActiveFilter('all')}
              className={`pb-4 text-sm tracking-wider transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'text-black border-b-2 border-black font-medium'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              ALL PROJECTS
            </button>
            <button
              onClick={() => setActiveFilter('interiors')}
              className={`pb-4 text-sm tracking-wider transition-all duration-300 ${
                activeFilter === 'interiors'
                  ? 'text-black border-b-2 border-black font-medium'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              INTERIORS
            </button>
            <button
              onClick={() => setActiveFilter('architecture')}
              className={`pb-4 text-sm tracking-wider transition-all duration-300 ${
                activeFilter === 'architecture'
                  ? 'text-black border-b-2 border-black font-medium'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              ARCHITECTURE
            </button>
          </div>
        </motion.div>

        {/* Projects List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/projects/${project.id}`}
                className="block group"
              >
                <div className="flex items-center justify-between py-6 border-b border-stone-200 hover:border-stone-300 transition-all duration-300">
                  
                  {/* Project Info */}
                  <div className="flex-1">
                    <div className="flex items-baseline space-x-6">
                      <h2 className="text-2xl md:text-3xl font-light tracking-tight text-black group-hover:text-gray-600 transition-colors duration-300">
                        {project.name}
                      </h2>
                      <span className="text-sm text-gray-400 font-mono">
                        {project.year}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-500">
                        {project.location}
                      </span>
                      <span className="text-sm text-gray-400">
                        {project.type}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  )
}
