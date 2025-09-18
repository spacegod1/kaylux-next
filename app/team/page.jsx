// 'use client'

// import { motion } from 'framer-motion'
// import Navigation from '@/components/Navigation'
// import { teamMembers } from '@/data/team'

// export default function Team() {
//   return (
//     <div className="min-h-screen bg-stone-100">
//       <Navigation />
      
//       <div className="pt-28 md:pt-32 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: 'easeOut' }}
//           className="mb-16 text-center"
//         >
//           <h1 className="text-4xl md:text-6xl font-normal font-italiana tracking-tight text-black mb-6">
//             OUR TEAM
//           </h1>
//           <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Meet the talented individuals who bring your design dreams to life. Our team combines decades of experience with fresh perspectives to deliver exceptional results.
//           </p>
//         </motion.div>

//         {/* CEO Section */}
//         <motion.section
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="mb-20"
//         >
//           <h2 className="text-2xl md:text-3xl font-light tracking-tight text-black mb-12 text-center">
//             LEADERSHIP
//           </h2>
          
//           <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
//             <div className="text-center mb-8">
//               <h3 className="text-3xl md:text-4xl font-light tracking-tight text-black mb-2">
//                 {teamMembers.ceo.name}
//               </h3>
//               <p className="text-xl text-gray-600 font-medium">
//                 {teamMembers.ceo.role}
//               </p>
//             </div>
            
//             <p className="text-gray-700 leading-relaxed text-center mb-8 max-w-3xl mx-auto">
//               {teamMembers.ceo.bio}
//             </p>
            
//             <div className="grid md:grid-cols-3 gap-6 text-center">
//               <div>
//                 <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide block mb-2">Education</span>
//                 <p className="text-gray-600">{teamMembers.ceo.education}</p>
//               </div>
//               <div>
//                 <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide block mb-2">Experience</span>
//                 <p className="text-gray-600">{teamMembers.ceo.experience}</p>
//               </div>
//               <div>
//                 <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide block mb-2">Specialties</span>
//                 <div className="flex flex-wrap gap-2 justify-center">
//                   {teamMembers.ceo.specialties.map((specialty) => (
//                     <span 
//                       key={specialty}
//                       className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
//                     >
//                       {specialty}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.section>

//         {/* Designers Section */}
//         <motion.section
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="mb-20"
//         >
//           <h2 className="text-2xl md:text-3xl font-light tracking-tight text-black mb-12 text-center">
//             DESIGN TEAM
//           </h2>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {teamMembers.designers.map((designer, index) => (
//               <motion.div
//                 key={designer.name}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.6 + (index * 0.2) }}
//                 className="bg-white rounded-2xl shadow-lg p-6"
//               >
//                 <div className="text-center mb-4">
//                   <h3 className="text-xl md:text-2xl font-light tracking-tight text-black mb-1">
//                     {designer.name}
//                   </h3>
//                   <p className="text-gray-600 font-medium">
//                     {designer.role}
//                   </p>
//                 </div>
                
//                 <p className="text-gray-700 leading-relaxed text-sm mb-4 text-center">
//                   {designer.bio}
//                 </p>
                
//                 <div className="space-y-3 text-sm">
//                   <div className="text-center">
//                     <span className="text-xs font-semibold text-gray-800 uppercase tracking-wide block mb-1">Education</span>
//                     <p className="text-gray-600">{designer.education}</p>
//                   </div>
//                   <div className="text-center">
//                     <span className="text-xs font-semibold text-gray-800 uppercase tracking-wide block mb-1">Experience</span>
//                     <p className="text-gray-600">{designer.experience}</p>
//                   </div>
//                   <div className="text-center">
//                     <span className="text-xs font-semibold text-gray-800 uppercase tracking-wide block mb-2">Specialties</span>
//                     <div className="flex flex-wrap gap-1.5 justify-center">
//                       {designer.specialties.map((specialty) => (
//                         <span 
//                           key={specialty}
//                           className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
//                         >
//                           {specialty}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.section>

//         {/* Call to Action */}
//         <motion.section
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.8 }}
//           className="text-center mb-20 bg-white rounded-2xl shadow-lg p-12"
//         >
//           <h3 className="text-2xl md:text-3xl font-light tracking-tight text-black mb-4">
//             Ready to Work Together?
//           </h3>
//           <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//             Let's discuss how our team can bring your vision to life. Get in touch to start your design journey.
//           </p>
//           <motion.a
//             href="/contact"
//             className="
//               inline-block bg-black text-white
//               px-8 py-3 rounded-full
//               transition-all duration-300
//               hover:bg-gray-800 hover:scale-105
//               font-medium tracking-wide
//             "
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             GET IN TOUCH
//           </motion.a>
//         </motion.section>
//       </div>
//     </div>
//   )
// }
