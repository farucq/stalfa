'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ThreeBackground } from '@/components/ui/spline-scene-basic';
import { Settings, Video, Layout, Glasses, Lightbulb, Printer } from 'lucide-react';

const MainServices = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      
      {/* Background layers */}
      <div className="fixed inset-0 -z-10">
        <ThreeBackground />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* MAIN HERO SECTION */}
      <section className="h-screen flex items-center justify-center text-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg"
          >
            Transforming Ideas into <span className="text-yellow-400">3D Reality</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
          >
            We provide cutting-edge 3D services that bring imagination into motion — from modeling to printing and immersive AR/VR creation.
          </motion.p>

          <motion.a
            href="#services"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="inline-block mt-10 px-8 py-3 bg-yellow-500 text-black font-bold text-lg rounded-full shadow-lg hover:bg-yellow-400 cursor-pointer"
          >
            Explore Services ↓
          </motion.a>
        </motion.div>
      </section>

      {/* SERVICES CONTENT SECTION */}
      <section id="services" className="py-24 px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-4xl md:text-5xl font-bold text-white mb-16"
        >
          Our Premium 3D Services
        </motion.h2>

        {/* 3D Glass Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10 }}
              className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 
                         shadow-xl hover:shadow-yellow-500/20 transition-all duration-500"
            >
              {/* Icon */}
              <div className="text-yellow-400 mb-6 text-5xl flex items-center justify-center">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold text-white text-center mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-lg text-center">
                {service.description}
              </p>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="mt-8 w-full py-3 bg-yellow-500 text-black rounded-full 
                           font-semibold text-lg shadow-md hover:shadow-yellow-500/40"
              >
                Learn More →
              </motion.button>

            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               Services Data                                */
/* -------------------------------------------------------------------------- */

const services = [
  {
    title: '3D Modeling',
    description: 'Ultra-detailed 3D assets for games, film, AR/VR, architecture, and virtual worlds.',
    icon: <Settings className="w-14 h-14" />,
  },
  {
    title: 'Animation',
    description: 'Cinematic-quality animation sequences for characters, objects, and environments.',
    icon: <Video className="w-14 h-14" />,
  },
  {
    title: 'Visualization',
    description: 'Realistic renders for architecture, product showcases, and industrial design.',
    icon: <Layout className="w-14 h-14" />,
  },
  {
    title: 'AR & VR Development',
    description: 'Full-scale immersive augmented and virtual reality experiences.',
    icon: <Glasses className="w-14 h-14" />,
  },
  {
    title: '3D Printing',
    description: 'Turn digital 3D designs into real-world objects with precision manufacturing.',
    icon: <Printer className="w-14 h-14" />,
  },
  {
    title: '3D Consulting',
    description: 'Strategic guidance and support for your 3D product, XR, or digital pipeline.',
    icon: <Lightbulb className="w-14 h-14" />,
  },
];

export default MainServices;
