"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, useMotionValue, useSpring, useTransform } from "framer-motion";
import ModalPortal from "@/components/ui/modal-portal";
import { MapPin, ArrowRight, Code, GitBranch, Cloud, Shield, Zap, GitMerge, CpuIcon, Network, Code2, Terminal, Server, Database, Cpu, X } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, SingleOrMultiple } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";

const SparklesCore = (props: {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
}) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;

  const [init, setInit] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: { duration: 1 },
      });
    }
  };

  const generatedId = React.useId();

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id || generatedId}
          className="h-full w-full"
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: background || "#000000",
              },
            },
            fullScreen: {
              enable: false,
              zIndex: 1,
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: false,
                  mode: "repulse",
                },
              resize: { enable: true },
              },
              modes: {
                push: { quantity: 4 },
                repulse: { distance: 200, duration: 0.4 },
              },
            },
            particles: {
              bounce: {
                horizontal: { value: 1 },
                vertical: { value: 1 },
              },
              collisions: {
                absorb: { speed: 2 },
                bounce: {
                  horizontal: { value: 1 },
                  vertical: { value: 1 },
                },
                enable: false,
                maxSpeed: 50,
                mode: "bounce",
                overlap: {
                  enable: true,
                  retries: 0,
                },
              },
              color: {
                value: particleColor || "#ffffff",
              },
              effect: {
                close: true,
                fill: true,
                options: {},
                type: {} as SingleOrMultiple<string> | undefined,
              },
              move: {
                angle: { offset: 0, value: 90 },
                attract: {
                  distance: 200,
                  enable: false,
                  rotate: { x: 3000, y: 3000 },
                },
                center: {
                  x: 50,
                  y: 50,
                  mode: "percent",
                  radius: 0,
                },
                decay: 0,
                direction: "none",
                drift: 0,
                enable: true,
                gravity: {
                  acceleration: 9.81,
                  enable: false,
                  inverse: false,
                  maxSpeed: 50,
                },
                outModes: { default: "out" },
                random: false,
                size: false,
                speed: { min: 0.1, max: 1 },
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  width: 400,
                  height: 400,
                },
                limit: {
                  mode: "delete",
                  value: 0,
                },
                value: particleDensity || 120,
              },
              opacity: {
                value: { min: 0.1, max: 1 },
                animation: {
                  count: 0,
                  enable: true,
                  speed: speed || 4,
                  decay: 0,
                  delay: 0,
                  sync: false,
                  mode: "auto",
                  startValue: "random",
                  destroy: "none",
                },
              },
              shape: {
                close: true,
                fill: true,
                options: {},
                type: "circle",
              },
              size: {
                value: {
                  min: minSize || 1,
                  max: maxSize || 3,
                },
              },
              zIndex: {
                value: 0,
                opacityRate: 1,
                sizeRate: 1,
                velocityRate: 1,
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
};

/* ------------------------ 3D CARD COMPONENT ------------------------ */

const ThreeDCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className={cn("relative transition-transform duration-200 ease-out", className)}
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
};

/* ------------------------ TYPES ------------------------ */

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  color: string;
}

/* ------------------------ DATA ------------------------ */

const jobs: Job[] = [
  { id: "1", title: "Front-end Designer", location: "Sidney, Australia", type: "Full Time", salary: "$90k - $120k", description: "Craft pixel-perfect interfaces for our core 3D platform.", color: "bg-blue-500" },
  { id: "2", title: "Lead Designer", location: "San Francisco, USA", type: "Remote", salary: "$140k - $180k", description: "Lead the visual direction of our spatial computing products.", color: "bg-purple-500" },
  { id: "3", title: "Head of Idea", location: "Sidney, Australia", type: "Full Time", salary: "$110k - $150k", description: "Conceptualize the next generation of VR/AR interactions.", color: "bg-pink-500" },
  { id: "4", title: "Lead Engine Architect", location: "Remote", type: "Full Time", salary: "$160k - $200k", description: "Develop high-performance rendering pipelines.", color: "bg-emerald-500" },
  { id: "5", title: "UI/UX Researcher", location: "London, UK", type: "Hybrid", salary: "$85k - $115k", description: "Study how users interact with immersive 3D environments.", color: "bg-amber-500" },
];



/* ------------------------ MAIN COMPONENT ------------------------ */

export default function CareerPage() {
  const [activeJob, setActiveJob] = useState<Job | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeJob) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeJob]);


  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-500/30">
      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] w-full flex flex-col items-center justify-center overflow-hidden bg-black">     
        <div className="relative z-20 flex flex-col items-center gap-4 px-4 mt-25 text-center">
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Careers
          </motion.h1>
          <motion.p 
            className="text-neutral-400 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Join a team of innovators shaping the future of 3D, AR, and VR technology.
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

      {/* 2. WORK WITH US SECTION (IMAGE + TEXT) */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 md:p-16 h-full min-h-[500px] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] w-full rounded-[2rem] overflow-hidden border border-white/10 group"
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070" 
              alt="Team working" 
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-white inline-block">Why Join Our Tech Team?</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1 text-gray-400"><Code size={24} /></div>
                <div>
                  <h4 className="font-bold text-lg">Cutting-Edge Tech Stack</h4>
                  <p className="text-gray-400 text-sm">Work with the latest technologies and frameworks in AI, cloud computing, and distributed systems.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 text-gray-400"><GitBranch size={24} /></div>
                <div>
                  <h4 className="font-bold text-lg">Open Source Culture</h4>
                  <p className="text-gray-400 text-sm">Contribute to open-source projects and share your work with the global developer community.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 text-gray-400"><Cpu size={24} /></div>
                <div>
                  <h4 className="font-bold text-lg">High-Performance Hardware</h4>
                  <p className="text-gray-400 text-sm">Top-tier development workstations and access to cloud resources for all your development needs.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 text-gray-400"><Zap size={24} /></div>
                <div>
                  <h4 className="font-bold text-lg">Rapid Innovation</h4>
                  <p className="text-gray-400 text-sm">Fast-paced environment where your ideas can quickly become production features.</p>
                </div>
              </div>
            </div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* 3. JOB GRID SECTION */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <div className="relative flex items-center justify-center mb-20">
  <div className="h-px bg-white/10 w-full max-w-60" />
  <h2 className="px-6 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-white inline-block whitespace-nowrap">
    Similar Openings
  </h2>
  <div className="h-px bg-white/10 w-full max-w-60" />
</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <ThreeDCard key={job.id}>
                <motion.div
                  layoutId={`card-${job.id}`}
                  onClick={() => setActiveJob(job)}
                  className="h-80 bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-between cursor-pointer hover:border-white/10 hover:bg-black/30 transition-all group shadow-2xl"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className={`w-12 h-1.5 rounded-full ${job.color}`} />
                      <span className="text-[10px] font-bold text-neutral-500 group-hover:text-white uppercase tracking-widest">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
  {job.title}
</h3>
                    <div className="flex items-center gap-2 text-neutral-500 text-sm">
                      <MapPin size={14} className="text-neutral-500" />
                      {job.location}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-white/10">
                    <button className="px-4 py-2  text-neutral-500 text-sm font-medium transition-colors">
                      View & Apply
                    </button>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-all">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </motion.div>
              </ThreeDCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MODAL OVERLAY - Using Portal */}
      <AnimatePresence>
        {activeJob && (
          <ModalPortal>
            <div className="fixed inset-0 flex items-center justify-center p-4">
              {/* Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveJob(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
              />
              
              {/* Modal content */}
              <motion.div 
                layoutId={`card-${activeJob.id}`}
                className="relative w-full max-w-2xl bg-black/90 border border-white/10 rounded-3xl p-12 overflow-y-auto max-h-[90vh] shadow-[0_0_50px_-12px_rgba(245,158,11,0.3)] z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setActiveJob(null)} 
                  className="absolute top-8 right-8 p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X size={24} className="text-neutral-500 hover:text-white" />
                </button>
                
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs">
                      {activeJob.type}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold">{activeJob.title}</h2>
                    <p className="text-yellow-400 font-mono text-lg">
                      {activeJob.location}
                    </p>
                  </div>

                  <div className="h-px w-full bg-white/10" />

                  <div className="space-y-4">
                    <h4 className="text-white font-bold text-lg">About the role</h4>
                    <p className="text-neutral-400 leading-relaxed text-lg">
                      {activeJob.description} We are looking for someone who pushes the boundaries of what's possible in the browser.
                    </p>
                  </div>

                  <button className="w-full py-5 bg-yellow-400 text-black font-black rounded-2xl hover:bg-yellow-300 transition-all transform active:scale-[0.98] shadow-xl shadow-yellow-400/20 uppercase tracking-widest">
                    Apply for this position
                  </button>
                </div>
              </motion.div>
            </div>
          </ModalPortal>
        )}
      </AnimatePresence>
    </div>
  );
}