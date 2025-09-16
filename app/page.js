'use client'

import Navigation from '@/components/Navigation'
import ImageCarousel from '@/components/ImageCarousel'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#3e4246] relative">
      <Navigation />
      
      <main className="relative w-full h-screen">
        <ImageCarousel />
      </main>
    </div>
  )
}
