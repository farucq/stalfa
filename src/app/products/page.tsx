// src/app/products/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SparklesCore } from '@/components/ui/sparkles-core';
import { AnimatedTabs } from '@/components/ui/animated-tabs';
import { getCardStyles } from '@/lib/card-styles';

const products = [
  {
    id: 'tab1',
    label: 'Kindle',
    content: (() => {
      const styles = getCardStyles();
      return (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670" 
              className={styles.image}
              alt="Kindle" 
            />
          </div>
          <div className={styles.content}>
            <div>
              <p className={styles.brand}>Amazon</p>
              <h2 className={styles.title}>Kindle Paperwhite</h2>
              <p className={styles.description}>
                The thinnest, lightest Kindle Paperwhite yet with a 6.8" display and adjustable warm light.
                Now with a 10-week battery life and 20% faster page turns.
              </p>
            </div>
            <button className={styles.button}>
              Explore <span className="ml-1">→</span> 
            </button>
          </div>
        </div>
      );
    })(),
  },
  {
    id: 'tab2',
    label: 'Bose',
    content: (() => {
      const styles = getCardStyles();
      return (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2615" 
              className={styles.image}
              alt="Bose Headphones" 
            />
          </div>
          <div className={styles.content}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className={styles.brand}>Bose</p>
              </div>
              <h2 className={styles.title}>Headphones 700</h2>
              <p className={styles.description}>
                Premium wireless noise cancelling headphones with 11 levels of active noise cancellation.
                Features crystal-clear calls and up to 20 hours of battery life.
              </p>
            </div>
            <button className={styles.button}>
              Explore <span className="ml-1">→</span> 
            </button>
          </div>
        </div>
      );
    })(),
  },
  {
    id: 'tab3',
    label: 'Sony',
    content: (() => {
      const styles = getCardStyles();
      return (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img 
              src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2670" 
              className={styles.image}
              alt="Sony Headphones" 
            />
          </div>
          <div className={styles.content}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className={styles.brand}>Sony</p>
              </div>
              <h2 className={styles.title}>WH-1000XM5</h2>
              <p className={styles.description}>
                Industry-leading noise cancellation with 30-hour battery life.
                Features crystal clear hands-free calling and multipoint connection.
              </p>
            </div>
            <button className={styles.button}>
              Explore <span className="ml-1">→</span> 
            </button>
          </div>
        </div>
      );
    })(),
  },
  {
    id: 'tab4',
    label: 'MacBook Pro',
    content: (() => {
      const styles = getCardStyles('#F5F5F7', true);
      return (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670" 
              className={styles.image}
              alt="MacBook Pro" 
            />
          </div>
          <div className={styles.content}>
            <div>
              <p className={styles.brand}>Apple</p>
              <h2 className={styles.title}>MacBook Pro 16"</h2>
              <p className={styles.description}>
                The most powerful MacBook Pro ever with M2 Pro or M2 Max chip.
                Up to 22 hours of battery life and a stunning Liquid Retina XDR display.
              </p>
            </div>
            <button className={styles.button}>
              Explore <span className="ml-1">→</span> 
            </button>
          </div>
        </div>
      );
    })(),
  },
  {
    id: 'tab5',
    label: 'Sony Camera',
    content: (() => {
      const styles = getCardStyles('#000000', true);
      return (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img 
              src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2669" 
              className={styles.image}
              alt="Sony Camera" 
            />
          </div>
          <div className={styles.content}>
            <div>
              <p className={styles.brand}>Sony</p>
              <h2 className={styles.title}>Alpha 7 IV</h2>
              <p className={styles.description}>
                A full-frame mirrorless camera with 33MP sensor and 4K 60p video.
                Features real-time eye AF and 10fps continuous shooting.
              </p>
            </div>
            <button className={styles.button}>
              Explore <span className="ml-1">→</span> 
            </button>
          </div>
        </div>
      );
    })(),
  },
  {
    id: 'tab6',
    label: 'DJI Drone',
    content: (() => {
      const styles = getCardStyles('#F7F7F7');
      return (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2672" 
              className={styles.image}
              alt="DJI Drone" 
            />
          </div>
          <div className={styles.content}>
            <div>
              <p className={styles.brand}>DJI</p>
              <h2 className={styles.title}>Mavic 3 Pro</h2>
              <p className={styles.description}>
                Professional aerial photography drone with Hasselblad camera.
                Features 5.1K video, 46 minutes of flight time, and omnidirectional obstacle sensing.
              </p>
            </div>
            <button className={styles.button}>
              Explore <span className="ml-1">→</span>
            </button>
          </div>
        </div>
      );
    })(),
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen text-white relative bg-black">
      <div className="fixed inset-0 z-0 bg-black" />

      <main className="relative z-10">
        <section className="relative h-[70vh] w-full bg-black flex flex-col items-center justify-center overflow-hidden mt-16">
          <div className="relative z-20 flex flex-col items-center gap-4 px-4 text-center">
            <motion.h1 
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white"><span className="text-yellow-400">P</span>roducts</span>
            </motion.h1>
            <motion.p 
              className="text-neutral-400 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover our exclusive collection of premium products
            </motion.p>
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

        <div className="relative z-10 w-full pb-24 -mt-10">
          <AnimatedTabs tabs={products} />
        </div>
      </main>
    </div>
  );
}