'use client';

import * as React from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { SplineScene } from "./spline";
// import { Spotlight } from "./spotlight";
import { motion } from "framer-motion";
import * as THREE from "three";

/* -------------------------------- CARD COMPONENTS -------------------------------- */

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg bg-card text-card-foreground shadow-sm", className)}
    {...props}
  />
));
Card.displayName = "Card";

/* -------------------------------- THREE.JS BACKGROUND -------------------------------- */

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    containerRef.current.appendChild(renderer.domElement);

    /** Particles **/
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 1800;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: "#ffffff",
      transparent: true,
      opacity: 0.7,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    /** Animate **/
    let rafId = 0;
    const animate = () => {
      particles.rotation.x += 0.0008;
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    /** Resize **/
    const onResize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };
    addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      removeEventListener("resize", onResize);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      // remove renderer DOM if present
      if (containerRef.current && renderer.domElement.parentElement === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "#000000" }}   // PURE BLACK
    />
  );
}

/* ------------------------------ ANIMATION VARIANTS ------------------------------ */

const containerVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

/* ------------------------------ MAIN COMPONENT ------------------------------ */

export function SplineSceneBasic() {
  // optional: ref to spline wrapper if you later need to call methods
  const splineWrapperRef = useRef<HTMLDivElement | null>(null);

  // test handler: logs mouse coords when moving over the spline area
  const handleSplineMouseMove = (e: React.MouseEvent) => {
    // client coords relative to viewport
    const { clientX, clientY } = e;
    // optional: normalized device coords (0..1)
    const nx = clientX / window.innerWidth;
    const ny = clientY / window.innerHeight;
    // quick debug log — remove in production
    // eslint-disable-next-line no-console
    console.log("Spline mouse:", { clientX, clientY, nx, ny });
    // If you want to forward this to the Spline scene, do it here (e.g. via postMessage or API)
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Black gradient at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent z-30 pointer-events-none" />

      {/* BACKGROUND (lowest layer) */}
      {/* <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <ThreeBackground />
      </div> */}

      {/* ROBOT (middle layer, fully visible) */}
      {/* IMPORTANT: this wrapper is pointer-events-auto so Spline can receive mouse */}
      <div
        ref={splineWrapperRef}
        className="absolute inset-0 w-full h-[calc(100%-20px)] mt-[20px] z-20 pointer-events-auto"

        // attach a mouse handler to validate events reach here
        onMouseMove={handleSplineMouseMove}
      >
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* SPOTLIGHT (above robot) — doesn't block mouse because pointer-events-none */}
      {/* <div className="absolute inset-0 z-30 pointer-events-none">
        <Spotlight size={100} intensity={1} />
      </div> */}

      {/* TEXT (topmost) */}
      {/* Make the outer container pointer-events-none so it doesn't block the Spline.
          Only the small UI card (motion.div) inside keeps pointer-events-auto for buttons. */}
      <div className="absolute inset-0 z-40 flex items-center justify-end p-8 pointer-events-none">
        <motion.div
          className="max-w-xl text-right pointer-events-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold 
                       bg-clip-text text-transparent 
                       bg-gradient-to-b from-[#fffac7] via-[#ffd700] to-[#b8860b]"
          >
            Interactive 3D
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg text-neutral-300 max-w-md ml-auto"
          >
            Bring your UI to life with beautiful 3D scenes. Create immersive
            experiences that capture attention and enhance your design.
          </motion.p>

       
         
        </motion.div>
      </div>
    </div>
  );
}