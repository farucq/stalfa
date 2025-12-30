import * as React from "react"
import Image from "next/image"
import { motion, PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"

export interface Testimonial {
  id: number | string
  name: string
  avatar: string
  description: string
}

interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[]
  showArrows?: boolean
  showDots?: boolean
  externalIndex?: number
  disableInteractions?: boolean
}

const TestimonialCarousel = React.forwardRef<
  HTMLDivElement,
  TestimonialCarouselProps
>(
  (
    { className, testimonials, showArrows = true, showDots = true, externalIndex, disableInteractions = false, ...props },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const activeIndex = externalIndex ?? currentIndex
    const [exitX, setExitX] = React.useState<number>(0)

    const handleDragEnd = (
      _: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
    ) => {
      if (disableInteractions || externalIndex !== undefined) return
      if (Math.abs(info.offset.x) > 100) {
        setExitX(info.offset.x)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % testimonials.length)
          setExitX(0)
        }, 200)
      }
    }

    const nextTestimonial = () => {
      if (externalIndex !== undefined) return
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
      if (externalIndex !== undefined) return
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "h-72 w-full flex items-center justify-center pt-20",
          className
        )}
        {...props}
      >
        <div className="relative w-150 h-90">
          {testimonials.map((testimonial, index) => {
            const isCurrentCard = index === activeIndex
            const isPrevCard =
              index === (activeIndex - 1 + testimonials.length) % testimonials.length
            const isNextCard =
              index === (activeIndex + 1) % testimonials.length

            if (!isCurrentCard && !isPrevCard && !isNextCard) return null

            return (
              <motion.div
                key={testimonial.id}
                className={cn(
                  "absolute w-full h-full rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing",
                  "bg-gradient-to-br from-[#0b0b0b] to-[#121212] dark:from-[#0b0b0b] dark:to-[#121212]",
                  "border border-[#FFD700]/20 shadow-[0_0_20px_rgba(255,215,0,0.08)]",
                )}
                style={{
                  zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                }}
                drag={isCurrentCard && !disableInteractions && externalIndex === undefined ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={isCurrentCard && !disableInteractions && externalIndex === undefined ? handleDragEnd : undefined}
                initial={{
                  scale: 0.95,
                  opacity: 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4,
                }}
                animate={{
                  scale: isCurrentCard ? 1 : 0.95,
                  opacity: isCurrentCard ? 1 : isPrevCard ? 0.6 : 0.3,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -2 : -4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {showArrows && isCurrentCard && !disableInteractions && externalIndex === undefined && (
                  <div className="absolute inset-x-0 top-2 z-20 flex justify-between px-4">
                    <button
                      onClick={prevTestimonial}
                      onPointerDownCapture={(e) => e.stopPropagation()}
                      type="button"
                      className="text-2xl select-none cursor-pointer text-gray-300 hover:text-gray-400 dark:text-muted-foreground dark:hover:text-primary"
                      aria-label="Previous testimonial"
                    >
                      &larr;
                    </button>
                    <button
                      onClick={nextTestimonial}
                      onPointerDownCapture={(e) => e.stopPropagation()}
                      type="button"
                      className="text-2xl select-none cursor-pointer text-gray-300 hover:text-gray-400 dark:text-muted-foreground dark:hover:text-primary"
                      aria-label="Next testimonial"
                    >
                      &rarr;
                    </button>
                  </div>
                )}

                <div className="relative flex h-full w-full items-center justify-center">
                  <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#FFD700]/10 blur-3xl pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                  <div className="relative z-10 p-8 md:p-10 flex flex-col items-center gap-5 text-center">
                    <div className="mx-auto grid place-items-center">
                      <div className="relative">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-full object-cover ring-2 ring-[#FFD700]/60 shadow-[0_0_30px_rgba(255,215,0,0.15)]"
                        />
                      </div>
                    </div>
                    <h3 className="text-transparent bg-clip-text bg-gradient-to-b from-[#fffac7] via-[#ffd700] to-[#b8860b] text-2xl font-bold tracking-wide">
                      {testimonial.name}
                    </h3>
                    <p className="max-w-xl text-base md:text-lg leading-relaxed text-neutral-200/90">
                      {testimonial.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
          {showDots && !disableInteractions && externalIndex === undefined && (
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => externalIndex === undefined && setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors focus:outline-none",
                    index === activeIndex
                      ? "bg-[#FFD700] dark:bg-[#FFD700]"
                      : "bg-gray-300 dark:bg-muted-foreground/30 hover:bg-[#FFD750] dark:hover:bg-[#FFD750]/80",
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
)
TestimonialCarousel.displayName = "TestimonialCarousel"

export { TestimonialCarousel }