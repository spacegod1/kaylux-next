'use client'

import { useState, useEffect, useRef } from 'react'
import Navigation from '@/components/Navigation'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  
  const projectTypes = [
    { value: 'interior-design', label: 'Interior Design' },
    { value: 'architecture', label: 'Architecture' },
    { value: 'consultation', label: 'Design Consultation' },
    { value: 'renovation', label: 'Renovation' },
    { value: 'other', label: 'Other' }
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSelectProject = (value) => {
    setFormData({
      ...formData,
      subject: value
    })
    setIsDropdownOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-stone-800 to-amber-800 relative" style={{
      backgroundImage: `
        radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(101, 67, 33, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(160, 82, 45, 0.1) 0%, transparent 50%)
      `
    }}>
      <Navigation />
      
      {/* Main Content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-italiana mb-4">
                Get in Touch
              </h1>
            {/* <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto">
              Ready to transform your space? Let's discuss your vision and bring it to life.
            </p> */}
          </div>

          {/* Contact Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-2xl p-6 md:p-8 shadow-xl">
              <h2 className="text-2xl font-rajdhani font-medium text-gray-900 mb-6 uppercase tracking-wide">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type
                  </label>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all text-left flex items-center justify-between hover:bg-white/80"
                    >
                      <span className={formData.subject ? 'text-gray-900' : 'text-gray-500'}>
                        {formData.subject ? projectTypes.find(type => type.value === formData.subject)?.label : 'Select a service'}
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-xl overflow-hidden">
                        {projectTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => handleSelectProject(type.value)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center justify-between group"
                          >
                            <span className="text-gray-900 group-hover:text-gray-700">{type.label}</span>
                            {formData.subject === type.value && (
                              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about your project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all resize-none"
                    placeholder="Describe your vision, space, timeline, and any specific requirements..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Information */}
              <div className="bg-white/80 backdrop-blur-sm border border-white/40 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-rajdhani font-medium text-gray-900 mb-6 uppercase tracking-wide">
                  Visit Our Studio
                </h2>
                
                <div className="space-y-5">
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-gray-900 rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Address</h3>
                      <p className="text-gray-600 leading-relaxed">
                        KayLux Design Studio<br />
                        East Legon, Accra<br />
                        Ghana
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-gray-900 rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Contact</h3>
                      <p className="text-gray-600">
                        +233 55 349 1023 / +233 53 773 5441<br />
                        kayluxdesigns7@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-gray-900 rounded-full flex-shrink-0 mt-1"></div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: By appointment
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-rajdhani font-medium mb-4 uppercase tracking-wide">
                  What to Expect
                </h3>
                <div className="space-y-4 text-gray-300">
                  <p className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full flex-shrink-0"></span>
                    <span>Initial consultation within 24 hours</span>
                  </p>
                  <p className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full flex-shrink-0"></span>
                    <span>Detailed project proposal within 3-5 days</span>
                  </p>
                  <p className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full flex-shrink-0"></span>
                    <span>Transparent pricing and timeline</span>
                  </p>
                  <p className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-white rounded-full flex-shrink-0"></span>
                    <span>Dedicated project management</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}