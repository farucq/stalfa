"use client"

import * as React from "react"
import { HTMLMotionProps, MotionConfig, motion } from "framer-motion"
import { cn } from "@/lib/utils"

/* -----------------------------------------------------------
   SHARED LOGIC (HoverSlider + TextStagger + Images)
----------------------------------------------------------- */

interface TextStaggerHoverProps {
  text: string
  index: number
  className?: string
}

interface HoverSliderImageProps extends Omit<HTMLMotionProps<"img">, "src"> {
  index: number
  imageUrl: string
}

interface HoverSliderContextValue {
  activeSlide: number
  changeSlide: (index: number) => void
}

function splitText(text: string) {
  const words = text.split(" ").map((word) => word.concat(" "))
  const characters = words.map((word) => word.split("")).flat(1)
  return { characters }
}

const HoverSliderContext = React.createContext<HoverSliderContextValue | undefined>(undefined)

function useHoverSliderContext() {
  const ctx = React.useContext(HoverSliderContext)
  if (!ctx) throw new Error("useHoverSliderContext must be used inside provider")
  return ctx
}

export const HoverSlider = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ children, className, ...props }, ref) => {
    const [activeSlide, setActiveSlide] = React.useState(0)
    const changeSlide = (i: number) => setActiveSlide(i)

    return (
      <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
        <section ref={ref} className={cn("relative", className)} {...props}>
          {children}
        </section>
      </HoverSliderContext.Provider>
    )
  }
)

HoverSlider.displayName = "HoverSlider"

export const TextStaggerHover = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & TextStaggerHoverProps
>(({ text, index, className, ...props }, ref) => {
  const { activeSlide, changeSlide } = useHoverSliderContext()
  const { characters } = splitText(text)
  const isActive = activeSlide === index

  return (
    <span
      ref={ref}
      onMouseEnter={() => changeSlide(index)}
      className={cn("relative inline-block overflow-hidden", className)}
      {...props}
    >
      {characters.map((char, i) => (
        <span key={i} className="relative inline-block overflow-hidden">
          <MotionConfig
            transition={{
              delay: i * 0.025,
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.span
              className="inline-block opacity-20"
              initial={{ y: "0%" }}
              animate={isActive ? { y: "-110%" } : { y: "0%" }}
            >
              {char}
              {char === " " && i < characters.length - 1 && <>&nbsp;</>}
            </motion.span>

            <motion.span
              className="absolute left-0 top-0 inline-block opacity-100"
              initial={{ y: "110%" }}
              animate={isActive ? { y: "0%" } : { y: "110%" }}
            >
              {char}
            </motion.span>
          </MotionConfig>
        </span>
      ))}
    </span>
  )
})

TextStaggerHover.displayName = "TextStaggerHover"

const clipPathVariants = {
  visible: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
  hidden: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
}

export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative w-full h-64 md:h-96 overflow-hidden rounded-xl", className)}
    {...props}
  />
))

HoverSliderImageWrap.displayName = "HoverSliderImageWrap"

export const HoverSliderImage = React.forwardRef<HTMLImageElement, HoverSliderImageProps>(
  ({ index, imageUrl, className, ...props }, ref) => {
    const { activeSlide } = useHoverSliderContext()
    return (
      <motion.img
        ref={ref}
        src={imageUrl}
        variants={clipPathVariants}
        initial="hidden"
        animate={activeSlide === index ? "visible" : "hidden"}
        transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
        className={cn("absolute inset-0 w-full h-full object-cover", className)}
        {...props}
      />
    )
  }
)

HoverSliderImage.displayName = "HoverSliderImage"

/* -----------------------------------------------------------
   SERVICES SECTION (merged)
----------------------------------------------------------- */

const SLIDES = [
  {
    id: "s1",
    title: "frontend dev",
    imageUrl:
      "https://images.unsplash.com/photo-1654618977232-a6c6dea9d1e8?q=80&w=2486&auto=format",
  },
  {
    id: "s2",
    title: "backend dev",
    imageUrl:
      "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?q=80&w=2487&auto=format",
  },
  {
    id: "s3",
    title: "UI UX design",
    imageUrl:
      "https://images.unsplash.com/photo-1688733720228-4f7a18681c4f?q=80&w=2487&auto=format",
  },
  {
    id: "s4",
    title: "video editing",
    imageUrl:
      "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?q=80&w=2487&auto=format",
  },
  {
    id: "s5",
    title: "SEO optimization",
    imageUrl:
      "https://images.unsplash.com/photo-1726066012698-bb7a3abce786?q=80&w=2487&auto=format",
  },
]

export default function ServicesSection() {
  return (
    <section className="py-20 w-full" style={{
  background:
    "linear-gradient(to bottom, #000000 0%, #0d0d0d 15%, #00000000 100%)"
}}>
      <HoverSlider className="min-h-[60vh] w-full place-content-center px-6 md:px-12">
        <h2 className="text-center mb-12 text-5xl font-bold bg-clip-text text-transparent 
          bg-gradient-to-b from-[#fffac7] via-[#ffd700] to-[#b8860b]">
          Our Services
        </h2>

        <div className="flex flex-wrap items-center justify-evenly gap-6 md:gap-12">
          <div className="flex flex-col space-y-4">
            {SLIDES.map((slide, index) => (
              <TextStaggerHover
                key={slide.id}
                index={index}
                text={slide.title}
                className="text-3xl md:text-4xl font-bold uppercase cursor-pointer hover:text-[#FFD700]"
              />
            ))}
          </div>

          <HoverSliderImageWrap className="w-full max-w-2xl">
            {SLIDES.map((slide, index) => (
              <HoverSliderImage key={slide.id} index={index} imageUrl={slide.imageUrl} alt={slide.title} />
            ))}
          </HoverSliderImageWrap>
        </div>
      </HoverSlider>
    </section>
  )
}