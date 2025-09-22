'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { teamMembers } from '@/data/team'

export default function Team() {
  const [expandedMember, setExpandedMember] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  

  // Combine all team members into a single array with leadership first
  const allMembers = teamMembers ? [
    { ...teamMembers.ceo, type: 'leadership' },
    ...(teamMembers.designers || []).map(designer => ({ 
      ...designer, 
      type: designer.role?.includes('Co-Founder') || designer.role?.includes('Manager') ? 'leadership' : 'design' 
    }))
  ] : []

  const filteredMembers = allMembers.filter(member => {
    if (activeFilter === 'all') return true
    return member.type === activeFilter
  })

  const handleMemberClick = (index) => {
    setExpandedMember(expandedMember === index ? null : index)
  }

  // Show loading if team data hasn't loaded yet
  if (!teamMembers) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-stone-200 text-lg">Loading team...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <div className="pt-28 md:pt-28 px-6 md:px-8 lg:px-16 max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-6xl font-normal font-italiana tracking-tight text-stone-200 mb-6 md:mb-8">
            TEAM
          </h1>
          
          {/* Filter Tabs */}
          <div className="flex space-x-4 md:space-x-8 border-b border-stone-700">
            <button
              onClick={() => setActiveFilter('all')}
              className={`pb-3 md:pb-4 text-xs tracking-wider transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'text-stone-200 border-b-2 border-stone-200 font-medium'
                  : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setActiveFilter('leadership')}
              className={`pb-3 md:pb-4 text-xs tracking-wider transition-all duration-300 ${
                activeFilter === 'leadership'
                  ? 'text-stone-200 border-b-2 border-stone-200 font-medium'
                  : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              LEADERSHIP
            </button>
            <button
              onClick={() => setActiveFilter('design')}
              className={`pb-3 md:pb-4 text-xs tracking-wider transition-all duration-300 ${
                activeFilter === 'design'
                  ? 'text-stone-200 border-b-2 border-stone-200 font-medium'
                  : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              DESIGN TEAM
            </button>
          </div>
        </motion.div>

        {/* Team Members List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-2 md:space-y-6"
        >
          {filteredMembers.map((member, index) => member && (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                onClick={() => handleMemberClick(index)}
                className="block group cursor-pointer"
              >
                <div className="flex items-center justify-between py-4 md:py-6 border-b border-stone-700 hover:border-stone-600 transition-all duration-300">
                  
                  {/* Member Info */}
                  <div className="flex-1">
                    <div className="flex items-baseline">
                      <h2 className="text-xl md:text-3xl font-light tracking-tight text-stone-200 group-hover:text-stone-300 transition-colors duration-300">
                        {member.name}
                      </h2>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-stone-400">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    animate={{ rotate: expandedMember === index ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedMember === index && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    style={{ originY: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 ml-0 md:ml-6 mr-0">
                      <div className="bg-gradient-to-r from-stone-800 to-stone-700 rounded-xl md:rounded-2xl shadow-2xl border border-stone-600 overflow-hidden">
                        <div className="p-4 md:p-8 lg:p-12">
                          {/* Bio Section */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mb-6 md:mb-10"
                          >
                            <p className="text-stone-300 leading-relaxed text-base md:text-lg font-light max-w-4xl">
                              {member.bio}
                            </p>
                          </motion.div>

                          {/* Specialties */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="space-y-3 md:space-y-4"
                          >
                            <div className="flex items-center">
                              <div className="w-2 md:w-3 h-2 md:h-3 bg-stone-400 rounded-full mr-3"></div>
                              <h4 className="text-xs md:text-sm font-rajdhani uppercase tracking-widest text-stone-300 font-medium">
                                Specialties
                              </h4>
                            </div>
                            <div className="pl-5 md:pl-6">
                              <div className="flex flex-wrap gap-2 md:gap-3">
                                {(member.specialties || []).map((specialty, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 md:px-4 py-1.5 md:py-2 bg-stone-600 hover:bg-stone-500 text-stone-200 text-xs md:text-sm rounded-full transition-colors duration-200 border border-stone-500"
                                  >
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center my-20 bg-stone-800 rounded-2xl shadow-2xl p-12 border border-stone-700"
        >
          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-stone-200 mb-4">
            Ready to Work Together?
          </h3>
          <p className="text-stone-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how our team can bring your vision to life. Get in touch to start your design journey.
          </p>
          <motion.a
            href="/contact"
            className="
              inline-block bg-stone-200 text-gray-900
              px-8 py-3 rounded-full
              transition-all duration-300
              hover:bg-stone-100 hover:scale-105
              font-medium tracking-wide
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GET IN TOUCH
          </motion.a>
        </motion.section>

        {/* Bottom Spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  )
}