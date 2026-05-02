import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { useSiteData } from "../contexts/SiteDataContext";
import { MoveHorizontal } from "lucide-react";

export function AnatomyOfPerfection() {
  const { data } = useSiteData();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(50);

  // We use springs for a smoother, heavier feel
  const springX = useSpring(50, { stiffness: 100, damping: 20 });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate relative position within container
    const relativeX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setMouseX((relativeX / rect.width) * 100);
  };

  useEffect(() => {
    springX.set(mouseX);
  }, [mouseX, springX]);

  const clipPathBase = useTransform(springX, (val) => `inset(0 ${100 - val}% 0 0)`);
  // The scanner line position
  const lineLeft = useTransform(springX, (val) => `${val}%`);

  return (
    <section className="bg-[#F5F1EB] text-forest py-32 px-8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/3">
          <h2 className="font-display text-5xl uppercase font-bold text-terracotta mb-6">
            The Anatomy <br />
            <span className="text-forest">Of Perfection</span>
          </h2>
          <p className="font-serif italic text-xl text-forest/80 mb-8 border-l-2 border-terracotta pl-4">
            "It looks beautiful, but will it survive Indian cooking?"
          </p>
          <p className="text-forest/70 mb-8 leading-relaxed font-sans font-medium">
            We don't just build for photos; we build for heavy-duty daily use. Slide the bar across the module to rip away the premium finish and expose the high-grade marine ply and heavy-duty steel channels that form the backbone of our kitchens.
          </p>
          <div className="flex gap-4 items-center uppercase tracking-widest text-xs font-display font-semibold text-terracotta">
            <span className="w-8 h-px bg-terracotta inline-block"></span>
            Explore the Core
          </div>
        </div>

        {/* Comparison Interactive Area */}
        <div 
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerMove}
          style={{ touchAction: 'none' }}
          className="w-full lg:w-2/3 aspect-[4/3] md:aspect-[16/9] relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/5 select-none"
        >
          {/* Base Layer: Inner Core (X-Ray view) */}
          <img 
            src={data.anatomy.inner || undefined} 
            alt="Internal Engineering" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none grayscale opacity-90 contrast-125"
            draggable="false"
          />
          
          {/* Top Layer: Premium Outer Layout */}
          <motion.div 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ clipPath: clipPathBase }}
          >
            <img 
              src={data.anatomy.outer || undefined} 
              alt="Premium Laminate" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              draggable="false"
            />
          </motion.div>

          {/* Slider Bar */}
          <motion.div 
            className="absolute top-0 bottom-0 w-[4px] bg-terracotta z-20 pointer-events-none shadow-[0_0_15px_rgba(215,90,74,0.6)]"
            style={{ left: lineLeft }}
          >
            {/* Physical Handle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-terracotta text-terracotta w-12 h-12 rounded-full flex items-center justify-center shadow-xl">
              <MoveHorizontal size={24} />
            </div>
          </motion.div>
          
        </div>

      </div>

      {/* Decorative large background text */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/4 opacity-5 pointer-events-none z-0">
        <h1 className="font-display text-[20vw] leading-none whitespace-nowrap uppercase font-bold text-forest">
          Engineered
        </h1>
      </div>
    </section>
  );
}
