'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ThreeBackground } from '@/components/ui/spline-scene-basic';
import { SparklesCore } from '@/components/ui/sparkles-core';

export default function BlogPage() {
  return (
    <div className="min-h-screen text-white relative">
      {/* Background layers */}
      <div className="fixed inset-0 z-0">
        <ThreeBackground />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative h-[73vh] w-full bg-black flex flex-col items-center justify-center overflow-hidden">     
          <div className="relative z-20 flex flex-col items-center gap-4 px-4 mt-25 text-center">
            <motion.h1 
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our <span className="text-amber-400">Blog</span>
            </motion.h1>
            <p className="text-neutral-400 max-w-xl">
              Latest articles, tutorials, and insights about 3D printing
            </p>
          </div>

          <div className="w-full max-w-3xl h-32 md:h-40 relative mt-10">
            {/* GOLD Accent Lines */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent h-px w-3/4" />

            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-yellow-300 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-yellow-300 to-transparent h-px w-1/4" />

            {/* Sparkles */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />

            {/* Radial Fade */}
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
          </div>
        </section>

        {/* Blog Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">Coming Soon</h2>
            <p className="text-gray-300">We're working on some amazing content for you. Stay tuned!</p>
          </div>
        </div>
      </main>
    </div>
  );
}
