"use client"

import React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TestimonialCarousel } from "./ui/Testimonial"

const TESTIMONIAL_DATA = [
  {
    id: 1,
    name: "Expert Engineering Team",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    description: "We bring years of experience in full-stack development, cloud architecture, AI, automation, and system design—delivering solutions built with precision and best-practice engineering."
  },
  {
    id: 2,
    name: "Tailored Solutions for Your Business",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    description: "Every product we build is customized to your exact needs. No generic templates—your business gets high-performance, scalable, and future-ready solutions."
  },
  {
    id: 3,
    name: "On-Time Delivery & Agile Execution",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    description: "Our agile process ensures consistent updates, fast iterations, and predictable delivery timelines—helping you launch faster with zero compromise on quality."
  },
  {
    id: 4,
    name: "Reliable Ongoing Support",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    description: "We don't just deliver and leave. We provide continuous monitoring, maintenance, optimization, and technical support to keep your systems running smoothly."
  }
]

export function ChooseUs() {
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const [scrollIndex, setScrollIndex] = React.useState(0)

  React.useLayoutEffect(() => {
    if (typeof window === "undefined") return
    const el = sectionRef.current
    if (!el) return
    gsap.registerPlugin(ScrollTrigger)

    const totalCards = 4
    const segment = () => "+=" + Math.max(1000, Math.min(2400, window.innerHeight * 2))

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: segment,
      scrub: true,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Map progress (0..1) to 0..totalCards-1
        const i = Math.min(totalCards - 1, Math.max(0, Math.floor(self.progress * totalCards + 0.0001)))
        setScrollIndex(i)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-10 md:py-10 lg:py-10 overflow-hidden bg-black" style={{
  background:
    "linear-gradient(to bottom, #000000 0%, #0d0d0d 15%, #f8e49a55 60%, #f8e49a22 85%, #00000000 100%)"
}}>
      {/* Background with reduced opacity */}
      {/* <div className="absolute inset-0 w-full h-full opacity-20 dark:opacity-10">
        <ThreeBackground />
      </div> */}
      
      {/* Content container with higher z-index */}
      <div className="relative z-10 pb-40 pt-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl 
             bg-clip-text text-transparent 
             bg-gradient-to-b from-[#fffac7] via-[#ffd700] to-[#b8860b]"
>
                Why Choose Us
              </h2>
              <p className="max-w-[700px] text-white-500 md:text-xl dark:text-gray-400 mt-4">
                Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with us.
              </p>
            </div>
            
            <div className="w-full max-w-4xl mx-auto mt-12">
              <TestimonialCarousel 
                testimonials={TESTIMONIAL_DATA}
                className="max-w-2xl mx-auto"
                externalIndex={scrollIndex}
                disableInteractions
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}