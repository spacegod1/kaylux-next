'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' }
]

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Determine if current page has light background
  const isLightBackground = pathname === '/projects' || pathname === '/services' || pathname === '/contact'
  
  // Dynamic text colors based on background
  const textColors = {
    logo: isLightBackground ? 'text-gray-800' : 'text-white/95',
    navLink: isLightBackground ? 'text-gray-700' : 'text-white/80',
    navLinkHover: isLightBackground ? 'hover:text-gray-900' : 'hover:text-white',
    activeLink: isLightBackground ? 'text-gray-900' : 'text-white',
    menuButton: isLightBackground ? 'text-gray-700 hover:text-gray-900' : 'text-white/80 hover:text-white'
  }

  // Dynamic background for active states
  const activeBg = isLightBackground ? 'bg-gray-900/10 shadow-inner shadow-gray-900/20' : 'bg-white/15 shadow-inner shadow-white/20'
  const hoverBg = isLightBackground ? 'hover:bg-gray-900/5' : 'hover:bg-white/10'
  
  // Mobile menu: cleaner backgrounds without borders for smooth animation
  const mobileActiveBg = isLightBackground ? 'bg-gray-900/15' : 'bg-white/20'
  const mobileHoverBg = isLightBackground ? 'hover:bg-gray-900/8' : 'hover:bg-white/15'
  
  // Dynamic glass background and border with consistent outward appearance
  const glassBackground = isLightBackground ? 'bg-white/40' : 'bg-white/10'
  const glassBorder = isLightBackground ? 'border-white/60' : 'border-white/20'
  const glassGradient = isLightBackground 
    ? 'before:bg-gradient-to-b before:from-white/20 before:to-transparent' 
    : 'before:bg-gradient-to-r before:from-white/5 before:to-transparent'
  
  // Consistent outward shadow for pill effect
  const glassOuterShadow = isLightBackground 
    ? 'shadow-xl shadow-gray-400/30' 
    : 'shadow-2xl shadow-black/30'
  
  // Inner highlight for raised effect
  const glassInnerHighlight = isLightBackground
    ? 'after:absolute after:inset-[1px] after:rounded-full after:bg-gradient-to-b after:from-white/40 after:to-white/10 after:pointer-events-none'
    : 'after:absolute after:inset-[1px] after:rounded-full after:bg-gradient-to-b after:from-white/20 after:to-white/5 after:pointer-events-none'

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="
          fixed top-6 left-1/2 -translate-x-1/2 z-50
          hidden md:block
        "
      >
        <div className={`
          ${glassBackground} backdrop-blur-xl
          rounded-full px-8 py-2
          border ${glassBorder}
          ${glassOuterShadow}
          before:absolute before:inset-0 before:rounded-full 
          ${glassGradient}
          before:pointer-events-none
          ${glassInnerHighlight}
          relative overflow-hidden
        `}>
          <div className="flex items-center space-x-10">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8">
                <object 
                  data="/images/navlogo.svg" 
                  className="w-full h-full"
                  aria-label="KayLux Logo"
                />
              </div>
              <span className={`${textColors.logo} font-space-grotesk font-medium text-lg`}>
                KayLux
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                        className={`
                          relative px-5 py-1.5 rounded-full text-sm font-medium
                          transition-all duration-300 ease-out
                          ${pathname === item.href
                            ? `${textColors.activeLink} ${activeBg}`
                            : `${textColors.navLink} ${textColors.navLinkHover} ${hoverBg}`
                          }
                        `}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 rounded-full ${activeBg}`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="
          fixed top-4 left-4 right-4 z-50
          md:hidden
        "
      >
        <div className={`
          ${glassBackground} backdrop-blur-xl
          rounded-full px-5 py-2.5
          border ${glassBorder}
          ${glassOuterShadow}
          before:absolute before:inset-0 before:rounded-full 
          ${glassGradient}
          before:pointer-events-none
          ${glassInnerHighlight}
          relative overflow-hidden
        `}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              {/* <div className="w-7 h-7">
                <object 
                  data="/images/navlogo.svg" 
                  className="w-full h-full"
                  aria-label="KayLux Logo"
                />
              </div> */}
              <span className={`${textColors.logo} font-space-grotesk font-medium`}>
                KayLux
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`
                ${textColors.menuButton}
                transition-colors duration-300
                p-2
              `}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="
                fixed top-20 left-4 right-4 z-50
                md:hidden
              "
            >
              <div className={`
                ${glassBackground} backdrop-blur-2xl
                rounded-3xl p-6
                border ${glassBorder}
                ${isLightBackground ? 'shadow-xl shadow-gray-400/40' : 'shadow-2xl shadow-black/40'}
                before:absolute before:inset-0 before:rounded-3xl 
                before:bg-gradient-to-br ${isLightBackground ? 'before:from-white/20 before:via-white/10' : 'before:from-white/10 before:via-white/5'} before:to-transparent
                before:pointer-events-none
                ${isLightBackground ? 'after:absolute after:inset-[1px] after:rounded-3xl after:bg-gradient-to-br after:from-white/30 after:to-white/5 after:pointer-events-none' : ''}
                relative overflow-hidden
              `}>
                <motion.div className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1,
                        ease: 'easeOut'
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={toggleMobileMenu}
                        className={`
                          block px-4 py-3 rounded-2xl text-base font-medium
                          transition-all duration-300 ease-out
                          ${pathname === item.href
                            ? `${textColors.activeLink} ${mobileActiveBg}`
                            : `${textColors.navLink} ${textColors.navLinkHover} ${mobileHoverBg}`
                          }
                        `}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
