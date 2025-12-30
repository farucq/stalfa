"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MouseFollower({ className = '' }: { className?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a');

      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <>
      {/* Main outer cursor */}
      <motion.div
        className={`fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] ${className}`}
        style={{
          transform: 'translateZ(0)',
          willChange: 'transform',
          // boxShadow: '0 0 0 1px rgba(0,0,0,0.5)'
        }}
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0.5 : 1,
          opacity: isHovering ? 0.7 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Trailing cursor */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 border-2 border-white rounded-full pointer-events-none z-[9998] ${className}`}
        style={{
          transform: 'translateZ(0)',
          willChange: 'transform',
          // background: 'rgba(255, 255, 255, 0.1)'
        }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
      />
    </>
  );
}