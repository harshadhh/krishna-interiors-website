import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useSiteData } from "../contexts/SiteDataContext";

export function SketchReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data } = useSiteData();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Calculate clip path percentage based on scroll
  const clipPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[200vh] bg-ivory"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        <div className="absolute top-16 z-20 text-center pointer-events-none px-4">
          <h2 className="font-display text-4xl md:text-6xl text-forest uppercase font-bold tracking-tight mb-4">
            From Blueprint
            <br />
            <span className="text-terracotta">To Reality</span>
          </h2>
          <p className="font-serif italic text-forest/70 max-w-lg mx-auto">
            Scroll to see the transformation unfold line by line.
          </p>
        </div>

        <div className="relative w-full max-w-6xl aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden shadow-2xl mt-24">
          
          {/* Base: Sketch Image */}
          <img 
            src={data.sketchReveal.sketch || undefined} 
            alt="Blueprint" 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 contrast-150 mix-blend-multiply"
          />

          {/* Reveal: High-Res Reality Image */}
          <motion.div 
            className="absolute inset-0 w-full h-full z-10"
            style={{
              clipPath: useTransform(clipPercentage, (val) => `inset(0 ${100 - val}% 0 0)`),
            }}
          >
            <img 
              src={data.sketchReveal.reality || undefined} 
              alt="Reality" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* The scanning line */}
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-brass shadow-[0_0_20px_rgba(212,175,55,0.8)] pointer-events-none"></div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
