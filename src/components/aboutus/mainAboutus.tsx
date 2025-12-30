'use client';

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";
import {
  PenTool, Layers, Box as Cube, Cpu, Zap, Rocket, MonitorSmartphone,
  Users, Award, Calendar, TrendingUp, ArrowRight, Sparkles, CheckCircle
} from "lucide-react";
import { ThreeBackground } from "@/components/ui/spline-scene-basic";

// TYPES
interface ServiceItemProps {
  icon: React.ReactNode;
  sec: React.ReactNode;
  title: string;
  desc: string;
  pos: "left" | "right";
}

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
}

/* ===========================================================
                     MAIN PAGE WRAPPER 
=========================================================== */
export default function MainAboutUs() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* GLOBAL THREE BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <ThreeBackground />
        <div className="absolute inset-0 " />
      </div>

      {/* HERO SECTION */}
      <section className="h-screen flex items-center justify-center text-center px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            About Stalfa3D
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Building next-generation 3D, AR/VR, and digital engineering solutions for businesses around the world.
          </p>
        </motion.div>
      </section>

      {/* FULL ABOUT SECTION */}
      <AboutSectionFull />
    </div>
  );
}

/* ===========================================================
                 ABOUT SECTION WITH 3D BACKGROUND
=========================================================== */
function AboutSectionFull() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  /* ===========================================================
                        SERVICES (IT VERSION)
  ============================================================ */
  const services = [
    {
      icon: <Cube />,
      sec: <Sparkles />,
      title: "3D Development",
      desc: "High-precision 3D modeling, environments, simulations, and real-time visualization for enterprise and creative industries.",
      pos: "left" as const,
    },
    {
      icon: <MonitorSmartphone />,
      sec: <CheckCircle />,
      title: "AR / VR Applications",
      desc: "Immersive AR & VR experiences built for training, walkthroughs, product demos, education, and enterprise workflows.",
      pos: "left" as const,
    },
    {
      icon: <Cpu />,
      sec: <Sparkles />,
      title: "Custom Software Engineering",
      desc: "End-to-end software development, automation tools, and interactive engines tailored to business needs.",
      pos: "left" as const,
    },
    {
      icon: <Layers />,
      sec: <Sparkles />,
      title: "Product Visualization",
      desc: "Showcase your products with photorealistic 3D visuals, digital twins, and interactive configurators.",
      pos: "right" as const,
    },
    {
      icon: <PenTool />,
      sec: <CheckCircle />,
      title: "UI / UX for 3D",
      desc: "Human-centered interface design optimized for immersive applications and real-time interaction.",
      pos: "right" as const,
    },
    {
      icon: <Rocket />,
      sec: <Sparkles />,
      title: "Innovation & R&D",
      desc: "We experiment, prototype, and engineer future-forward solutions that keep businesses ahead of the curve.",
      pos: "right" as const,
    },
  ] as const;

  /* ===========================================================
                        STATS (IT VERSION)
  ============================================================ */
  const stats = [
    { icon: <Award />, value: 180, label: "Projects Delivered", suffix: "+" },
    { icon: <Users />, value: 950, label: "Global Clients", suffix: "+" },
    { icon: <Calendar />, value: 7, label: "Years of Innovation", suffix: "" },
    { icon: <TrendingUp />, value: 99, label: "Client Satisfaction", suffix: "%" },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 px-4 text-white relative overflow-hidden z-10"
    >
      {/* Animated floating lights */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-yellow-400/10 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-blue-300/10 blur-3xl"
        style={{ y: y2 }}
      />

      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span className="text-yellow-400 font-medium flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" /> WHO WE ARE
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-light mt-2 mb-3">
            A Technology Studio Built for the Future
          </h2>
          <div className="w-24 h-1 mx-auto bg-yellow-500" />
        </div>

        {/* Intro Content */}
        <p className="text-center max-w-3xl mx-auto mb-20 text-gray-200 leading-relaxed">
          Stalfa3D is a next-generation innovation studio specializing in 3D development,
          AR/VR solutions, interactive engineering, and digital product creation.
          We help businesses modernize workflows, enhance customer experience,
          and unlock new possibilities through immersive technology, automation,
          and high-performance software systems.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-16">
            {services.filter(s => s.pos === "left").map((s, i) => (
              <ServiceItem key={i} index={i} {...s} />
            ))}
          </div>

          <CenterImage y1={y1} y2={y2} />

          <div className="space-y-16">
            {services.filter(s => s.pos === "right").map((s, i) => (
              <ServiceItem key={i} index={i} {...s} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((s, i) => (
            <StatItem key={i} index={i} {...s} />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 bg-black/30 backdrop-blur-xl border border-white/20 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h3 className="text-2xl font-medium mb-1">
              Let&apos;s Build Something Revolutionary
            </h3>
            <p className="text-gray-300">
              From concept to full-scale development — we turn ideas into interactive reality.
            </p>
          </div>

          <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg flex items-center gap-2 font-semibold">
            Start Your Project <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ===========================================================
                   SUB COMPONENTS
=========================================================== */

function ServiceItem({
  icon,
  sec,
  title,
  desc,
  index,
}: ServiceItemProps & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group"
    >
      <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-yellow-500/30 transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500/20 transition-colors">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="mt-2 text-gray-300">{desc}</p>
          </div>
        </div>
        <div className="absolute -top-3 -right-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">
          {sec}
        </div>
      </div>
    </motion.div>
  );
}

function CenterImage({
  y1,
  y2,
}: {
  y1: MotionValue<number>;
  y2: MotionValue<number>;
}) {
  return (
    <motion.div className="relative w-full max-w-xs mx-auto h-[700px]">
      <div className="relative w-full h-full rounded-md overflow-hidden shadow-2xl">
        <Image
          src="https://thumbs.dreamstime.com/b/futuristic-dark-vertical-backdrop-glowing-hexagonal-patterns-bright-technological-elements-background-displays-elegant-372570974.jpg"
          alt="3D Technology Workspace"
          fill
          sizes="(max-width: 400px) 100vw, 400px"
          className="object-cover"
          priority
        />
      </div>

      <motion.div className="absolute inset-0 border-4 border-blue-200/50 rounded-md -m-3 pointer-events-none" style={{ height: 'calc(100% + 1.5rem)' }} />

      <motion.div
        className="absolute -top-4 -right-8 w-16 h-16 rounded-full bg-yellow-300/20 blur-lg"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute -bottom-6 -left-10 w-20 h-20 rounded-full bg-blue-300/20 blur-lg"
        style={{ y: y2 }}
      />
    </motion.div>
  );
}

function StatItem({
  icon,
  value,
  label,
  suffix,
  index,
}: StatItemProps & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const animated = useSpring(0, { stiffness: 50, damping: 10 });

  useEffect(() => {
    if (isInView) animated.set(value);
    else animated.set(0);
  }, [isInView, animated, value]);

  return (
    <motion.div
      ref={ref}
      className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="w-14 h-14 mx-auto rounded-full bg-white/10 flex items-center justify-center text-yellow-400 mb-3">
        {icon}
      </div>

      <motion.div className="text-3xl font-bold text-white flex justify-center">
        {Math.round(animated.get())}{suffix}
      </motion.div>

      <p className="text-gray-300 text-sm mt-1">{label}</p>
    </motion.div>
  );
}