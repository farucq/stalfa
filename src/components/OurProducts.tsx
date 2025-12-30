"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// -------------------- DATA --------------------
const testimonials = [
  {
    tempId: 0,
    testimonial:
      "Working with Stalfa3D has transformed our design process. The level of detail and realism in their 3D models is unmatched in the industry.",
    by: "Alex Johnson",
    role: "CEO at TechCorp",
    imgSrc: "/ss.png", // 1091 × 625 (kept native for perfect sharpness)
  },
  {
    tempId: 1,
    testimonial:
      "The team's expertise in 3D visualization has helped us present our architectural designs in ways we never thought possible.",
    by: "Sarah Williams",
    role: "Lead Architect at UrbanDesign",
    imgSrc:
      "https://plus.unsplash.com/premium_photo-1681666713689-cd1416a652f8?q=100&w=2000&auto=format&fit=crop",
  },
  {
    tempId: 2,
    testimonial:
      "Stalfa3D's attention to detail and quick turnaround time has made them an invaluable partner for our product visualization needs.",
    by: "Michael Chen",
    role: "Product Manager at InnovateCo",
    imgSrc: "https://i.pravatar.cc/2000?img=3",
  },
  {
    tempId: 3,
    testimonial:
      "Their 3D rendering services have elevated our marketing materials to a whole new level. The feedback from our clients has been phenomenal.",
    by: "Emily Rodriguez",
    role: "Marketing Director at BrandVision",
    imgSrc: "https://i.pravatar.cc/2000?img=4",
  },
  {
    tempId: 4,
    testimonial:
      "The quality of their 3D models is exceptional. They've helped us reduce development time and costs significantly.",
    by: "David Kim",
    role: "CTO at NextGen Tech",
    imgSrc: "https://i.pravatar.cc/2000?img=5",
  },
  {
    tempId: 5,
    testimonial:
      "Stalfa3D's innovative approach to 3D visualization has revolutionized how we showcase our products.",
    by: "Farook",
    role: "Creative Director at Visionary Studios",
    imgSrc: "https://i.pravatar.cc/2000?img=6",
  },
];

// -------------------- CARD --------------------
interface TestimonialCardProps {
  position: number;
  testimonial: (typeof testimonials)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;
  const isVisible = Math.abs(position) <= 3;

  if (!isVisible) return null;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer p-6 transition-all duration-500 ease-in-out bg-black rounded-xl overflow-hidden",
        isCenter ? "z-10 scale-105 shadow-xl" : "z-0 scale-95 opacity-100"
      )}
      style={{
        border: "2px solid transparent",
        backgroundImage: isCenter
          ? "linear-gradient(black, black), linear-gradient(45deg, #ffd700, #6c6c6c86, #ffd700)"
          : "linear-gradient(black, black), linear-gradient(45deg, rgba(255, 215, 0, 0.3), rgba(255, 255, 255, 0.3), rgba(255, 215, 0, 0.3))",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        width: cardSize,
        height: cardSize * 1.14,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.3) * position}px)
          translateY(${isCenter ? -40 : position % 2 ? 20 : -20}px)
          rotate(${isCenter ? 0 : position % 2 ? 3 : -3}deg)
        `,
        boxShadow: isCenter
          ? "0 20px 25px -5px rgba(0,0,0,0.2)"
          : "0 4px 6px -1px rgba(0,0,0,0.15)",
      }}
    >
      <div className="relative h-full flex flex-col items-center text-center">
        {/* ✅ ULTRA SHARP IMAGE */}
        <div className="relative mb-5 group" style={{ perspective: "1200px" }}>
          <div
            className="relative transition-all duration-700 group-hover:scale-[1.03] group-hover:rotate-1"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={testimonial.imgSrc}
                alt={testimonial.by}
                className="w-[360px] h-[220px] rounded-lg mx-auto object-cover transition-transform duration-1000 group-hover:scale-[1.07]"
                loading="lazy"
                style={{
                  transform: "translateZ(0)",
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.35)",
                  backfaceVisibility: "hidden",
                  willChange: "transform",
                  imageRendering: "auto",
                }}
                srcSet={
                  testimonial.imgSrc.startsWith("http")
                    ? `${testimonial.imgSrc} 2000w`
                    : undefined
                }
                sizes="360px"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/placeholder-image.jpg";
                }}
              />
            </div>
          </div>
        </div>

        <div className="w-full mb-3">
          <h4
            className={cn(
              "text-2xl font-bold mb-1",
              isCenter
                ? "text-transparent bg-clip-text bg-gradient-to-b from-[#fffac7] via-[#ffd700] to-[#b8860b]"
                : "text-gray-400"
            )}
          >
            {testimonial.by}
          </h4>

          <p className={cn("text-sm", isCenter ? "text-white-400" : "text-gray-400")}>
            {testimonial.role}
          </p>
        </div>

        <p
          className={cn(
            "text-base leading-relaxed px-2",
            isCenter ? "text-gray-200" : "text-gray-400"
          )}
        >
          "{testimonial.testimonial}"
        </p>
      </div>
    </div>
  );
};

// -------------------- MAIN --------------------
const StaggerTestimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [cardSize, setCardSize] = useState(400);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  useEffect(() => {
    const total = testimonials.length;
    const visibleCards = 5;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * (total - 1)}`,
      pin: true,
      scrub: 1,
      snap: 1 / (total - 1),
      onUpdate: (self) => {
        const index = Math.round(self.progress * (total - 1));
        const centerIndex = Math.floor(visibleCards / 2);
        const shift = index - centerIndex;
        handleMove(shift);
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];

    if (steps > 0) {
      for (let i = 0; i < steps; i++) {
        const item = newList.shift();
        if (item) newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = 0; i > steps; i--) {
        const item = newList.pop();
        if (item) newList.unshift({ ...item, tempId: Math.random() });
      }
    }

    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      setCardSize(width < 640 ? 300 : width < 1024 ? 350 : 400);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full overflow-hidden py-8"
      style={{
        background: "linear-gradient(to bottom, #000000 0%, #0d0d0d 15%, #00000000 30%)"
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#fffac7] via-[#ffd700] to-[#b8860b] mb-3">
            Our Products
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Discover our premium range of 3D visualization solutions.
          </p>
        </div>

        <div className="relative h-[500px] w-full mt-18 mb-15">
          {testimonialsList.map((testimonial, index) => {
            const centerIndex = Math.floor(testimonialsList.length / 2);
            const position = index - centerIndex;

            return (
              <TestimonialCard
                key={testimonial.tempId}
                testimonial={testimonial}
                handleMove={handleMove}
                position={position}
                cardSize={cardSize}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { StaggerTestimonials };
