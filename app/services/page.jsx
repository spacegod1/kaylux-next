'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const services = [
  {
    title: "REAL ESTATE",
    description: "Our real estate activities at the Klux Inc. company include a variety of services relating to the provision of property, that is buying, selling and renting of commercial and residential properties or land handled by our team of professional realtors."
  },
  {
    title: "CONSTRUCTION", 
    description: "Klux Inc Company offers a range of services, including general construction: supervision, inspection, designing and building. We also provide cost estimates, timelines, and constructability analysis. In addition, we provide a special service called the K-Joint Unit where we materialise your dream of having property built on land you own, finishing your building or renovating an existing building. In the partnership with Klux Inc Company, you will leave the task of developing the property in good and able hands in exchange for a fair percentage yet to be discussed."
  },
  {
    title: "ARCHITECTURE",
    description: "Our architects at Klux Inc provide the best support for clients by determining their housing, office or space needs while efficiently utilising the client set budget. We calculate the client office, housing or space furniture needs in millimetres, applying their preferences in a 3D environment to show the structure of their office, housing or space before production. At Klux Inc we believe flawless design is the real beauty of a construction. We are skilled at what we do and we can perfect works."
  }
]

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-[#94af9f] min-h-[500px] md:min-h-[700px] lg:min-h-[790px] w-full text-black pt-24 md:pt-28 px-4 md:px-8 lg:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-7xl leading-tight font-italiana text-[#2f2e2e] mb-4 md:mb-8">
              Crafting spaces that inspire and reflect your style, from vision to reality.
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <div className="lg:pl-14">
              <p className="text-base md:text-lg lg:text-xl leading-relaxed font-inter font-extralight">
                At Klux, we look at finding answers to typical issues in the constantly evolving real estate, architecture and interior design industries which has never been more crucial than it is right now. We approach every project uniquely, with a sense of creativity and function to suit our clients' ideas into a production ready design and then manage it through to a successful handover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="w-full">
        <div className="relative w-full h-[400px] lg:h-[750px]">
          <Image
            src="/images/living_room_concept.jpg"
            alt="Living Room Concept"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-16 lg:py-24 px-4 md:px-8 lg:px-36">
        <div className="max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8 border-b border-gray-100 last:border-b-0"
            >
              <div className="lg:col-span-4">
                <h6 className="font-space-grotesk text-lg lg:text-2xl font-medium text-gray-900">
                  {service.title}
                </h6>
              </div>
              <div className="lg:col-span-8">
                <p className="font-inter text-sm lg:text-base leading-relaxed font-light text-gray-700">
                  {service.description.split('K-Joint Unit').map((part, i, arr) => 
                    arr.length > 1 && i === 0 ? (
                      <span key={i}>
                        {part}
                        <em><strong>K-Joint Unit</strong></em>
                      </span>
                    ) : part
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interior Design Section */}
      <section className="w-full bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center p-8 lg:p-20 order-2 lg:order-1"
          >
            <p className="font-inter text-sm lg:text-base leading-loose lg:leading-loose font-light text-gray-700">
              We boast our top notch expertise in interior design and specialising in creative thinking, high quality design and furnishing. Our strength lies in our passion for creativity, bringing unique elements to both modern and traditional designs and adding that magic touch to environments that are ergonomic and welcoming. In collaborative approach with clients, we apply design principles, space analysis and knowledge integration in order to produce an interior space which is attractive, productive and reflects client's preference.
            </p>
          </motion.div>
          <div className="relative h-[400px] lg:h-[850px] order-1 lg:order-2">
            <Image
              src="/images/hallway.jpg"
              alt="Interior Design Hallway"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
