'use client'

import { ThreeBackground, SplineSceneBasic } from '@/components/ui/spline-scene-basic';
import { ChooseUs } from '@/components/ChooseUs';
import AboutUs from '@/components/AboutUs';
import ServicesSection from '@/components/ServicesSection';
import { StaggerTestimonials } from '@/components/OurProducts';





export default function Home() {
  return (
    <div className="min-h-screen text-white relative">
      {/* Background layers */}
      <div className="fixed inset-0 z-0">
        <ThreeBackground />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <main className="relative z-10">
        <div className="min-h-screen flex items-center justify-center">
               <SplineSceneBasic />
        </div>
        <div className="relative z-10">
          <AboutUs />
        </div>
        <div className="relative z-10">
          <ChooseUs />
        </div>
        
        <div className="relative z-10">
          <ServicesSection />
        </div>
        <div className="container mx-auto px-4 py-16">
            {/* <TimeLine_01 /> */}
          </div>
          <div className="relative z-10">
            <StaggerTestimonials />
          </div>
      </main>
    </div>
  );
}
